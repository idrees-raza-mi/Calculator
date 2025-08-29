'use client';

import { useState, useEffect } from 'react';
import { Ruler, Copy, Share2, RotateCcw } from 'lucide-react';
import { lengthConversions, saveCalculation, getCalculations } from '@/utils/calculations';

const units = [
  { value: 'meters', label: 'Meters (m)', symbol: 'm' },
  { value: 'feet', label: 'Feet (ft)', symbol: 'ft' },
  { value: 'inches', label: 'Inches (in)', symbol: 'in' },
  { value: 'kilometers', label: 'Kilometers (km)', symbol: 'km' },
  { value: 'miles', label: 'Miles (mi)', symbol: 'mi' },
  { value: 'yards', label: 'Yards (yd)', symbol: 'yd' },
];

export default function LengthConverter() {
  const [meters, setMeters] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [activeInput, setActiveInput] = useState<'meters' | 'feet' | 'inches' | 'kilometers'>('meters');
  const [recentCalculations, setRecentCalculations] = useState<any[]>([]);

  useEffect(() => {
    setRecentCalculations(getCalculations('length'));
  }, []);

  const handleInputChange = (value: string, type: 'meters' | 'feet' | 'inches' | 'kilometers') => {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setMeters('');
      setFeet('');
      setInches('');
      setKilometers('');
      return;
    }

    setActiveInput(type);

    switch (type) {
      case 'meters':
        setMeters(value);
        setFeet(lengthConversions.meters.feet(numValue).toFixed(2));
        setInches(lengthConversions.meters.inches(numValue).toFixed(2));
        setKilometers(lengthConversions.meters.kilometers(numValue).toFixed(4));
        break;
      case 'feet':
        setFeet(value);
        setMeters(lengthConversions.feet.meters(numValue).toFixed(2));
        setInches(lengthConversions.feet.inches(numValue).toFixed(2));
        setKilometers(lengthConversions.feet.kilometers(numValue).toFixed(4));
        break;
      case 'inches':
        setInches(value);
        setMeters(lengthConversions.inches.meters(numValue).toFixed(2));
        setFeet(lengthConversions.inches.feet(numValue).toFixed(2));
        setKilometers(lengthConversions.inches.kilometers(numValue).toFixed(4));
        break;
      case 'kilometers':
        setKilometers(value);
        setMeters(lengthConversions.kilometers.meters(numValue).toFixed(2));
        setFeet(lengthConversions.kilometers.feet(numValue).toFixed(2));
        setInches(lengthConversions.kilometers.inches(numValue).toFixed(2));
        break;
    }

    // Save calculation
    const calculation = {
      input: { value: numValue, unit: type },
      output: {
        meters: type === 'meters' ? numValue : parseFloat(lengthConversions[type].meters(numValue).toFixed(2)),
        feet: type === 'feet' ? numValue : parseFloat(lengthConversions[type].feet(numValue).toFixed(2)),
        inches: type === 'inches' ? numValue : parseFloat(lengthConversions[type].inches(numValue).toFixed(2)),
        kilometers: type === 'kilometers' ? numValue : parseFloat(lengthConversions[type].kilometers(numValue).toFixed(4)),
      }
    };
    saveCalculation('length', calculation);
    setRecentCalculations(getCalculations('length'));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = async () => {
    const text = `Length Conversion: ${meters}m = ${feet}ft = ${inches}in = ${kilometers}km`;
    if (navigator.share) {
      await navigator.share({
        title: 'Length Conversion - CalcPro',
        text,
        url: window.location.href,
      });
    } else {
      await handleCopy(text);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Ruler className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Length Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Convert between meters, feet, inches, and kilometers
          </p>
        </div>

        {/* Converter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Meters */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Meters (m)
              </label>
              <input
                type="number"
                value={meters}
                onChange={(e) => handleInputChange(e.target.value, 'meters')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'meters'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="1"
              />
            </div>

            {/* Feet */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Feet (ft)
              </label>
              <input
                type="number"
                value={feet}
                onChange={(e) => handleInputChange(e.target.value, 'feet')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'feet'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="3.28"
              />
            </div>

            {/* Inches */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Inches (in)
              </label>
              <input
                type="number"
                value={inches}
                onChange={(e) => handleInputChange(e.target.value, 'inches')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'inches'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="39.37"
              />
            </div>

            {/* Kilometers */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Kilometers (km)
              </label>
              <input
                type="number"
                value={kilometers}
                onChange={(e) => handleInputChange(e.target.value, 'kilometers')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'kilometers'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="0.001"
              />
            </div>
          </div>

          {/* Action buttons */}
          {meters && feet && inches && kilometers && (
            <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleCopy(`${meters}m = ${feet}ft = ${inches}in = ${kilometers}km`)}
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
              <RotateCcw className="h-5 w-5 mr-2" />
              Recent Calculations
            </h2>
            <div className="space-y-3">
              {recentCalculations.map((calc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {calc.input.value} {calc.input.unit}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    = {calc.output.meters}m = {calc.output.feet}ft = {calc.output.inches}in = {calc.output.kilometers}km
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
