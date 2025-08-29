'use client';

import { useState, useEffect } from 'react';
import { Thermometer, Copy, Share2, Clock } from 'lucide-react';
import { temperatureConversions, saveCalculation, getCalculations } from '@/utils/calculations';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');
  const [activeInput, setActiveInput] = useState<'celsius' | 'fahrenheit' | 'kelvin'>('celsius');
  const [recentCalculations, setRecentCalculations] = useState<any[]>([]);

  useEffect(() => {
    setRecentCalculations(getCalculations('temperature'));
  }, []);

  const handleInputChange = (value: string, type: 'celsius' | 'fahrenheit' | 'kelvin') => {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setCelsius('');
      setFahrenheit('');
      setKelvin('');
      return;
    }

    setActiveInput(type);

    switch (type) {
      case 'celsius':
        setCelsius(value);
        setFahrenheit(temperatureConversions.celsius.fahrenheit(numValue).toFixed(2));
        setKelvin(temperatureConversions.celsius.kelvin(numValue).toFixed(2));
        break;
      case 'fahrenheit':
        setFahrenheit(value);
        setCelsius(temperatureConversions.fahrenheit.celsius(numValue).toFixed(2));
        setKelvin(temperatureConversions.fahrenheit.kelvin(numValue).toFixed(2));
        break;
      case 'kelvin':
        setKelvin(value);
        setCelsius(temperatureConversions.kelvin.celsius(numValue).toFixed(2));
        setFahrenheit(temperatureConversions.kelvin.fahrenheit(numValue).toFixed(2));
        break;
    }

    // Save calculation
    const calculation = {
      input: { value: numValue, unit: type },
      output: {
        celsius: type === 'celsius' ? numValue : parseFloat(temperatureConversions[type].celsius(numValue).toFixed(2)),
        fahrenheit: type === 'fahrenheit' ? numValue : parseFloat(temperatureConversions[type].fahrenheit(numValue).toFixed(2)),
        kelvin: type === 'kelvin' ? numValue : parseFloat(temperatureConversions[type].kelvin(numValue).toFixed(2)),
      }
    };
    saveCalculation('temperature', calculation);
    setRecentCalculations(getCalculations('temperature'));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = async () => {
    const text = `Temperature Conversion: ${celsius}°C = ${fahrenheit}°F = ${kelvin}K`;
    if (navigator.share) {
      await navigator.share({
        title: 'Temperature Conversion - CalcPro',
        text,
        url: window.location.href,
      });
    } else {
      await handleCopy(text);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Thermometer className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Temperature Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Convert between Celsius, Fahrenheit, and Kelvin with precision
          </p>
        </div>

        {/* Converter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Celsius */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Celsius (°C)
              </label>
              <input
                type="number"
                value={celsius}
                onChange={(e) => handleInputChange(e.target.value, 'celsius')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'celsius'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="0"
              />
            </div>

            {/* Fahrenheit */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fahrenheit (°F)
              </label>
              <input
                type="number"
                value={fahrenheit}
                onChange={(e) => handleInputChange(e.target.value, 'fahrenheit')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'fahrenheit'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="32"
              />
            </div>

            {/* Kelvin */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Kelvin (K)
              </label>
              <input
                type="number"
                value={kelvin}
                onChange={(e) => handleInputChange(e.target.value, 'kelvin')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'kelvin'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="273.15"
              />
            </div>
          </div>

          {/* Action buttons */}
          {celsius && fahrenheit && kelvin && (
            <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleCopy(`${celsius}°C = ${fahrenheit}°F = ${kelvin}K`)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Result</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          )}
        </div>

        {/* Recent Calculations */}
        {recentCalculations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Calculations
            </h2>
            <div className="space-y-3">
              {recentCalculations.map((calc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {calc.input.value} {calc.input.unit === 'celsius' ? '°C' : calc.input.unit === 'fahrenheit' ? '°F' : 'K'}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    = {calc.output.celsius}°C = {calc.output.fahrenheit}°F = {calc.output.kelvin}K
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
