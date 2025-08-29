'use client';

import { useState, useEffect } from 'react';
import { Weight, Copy, Share2, RotateCcw } from 'lucide-react';
import { weightConversions, saveCalculation, getCalculations, CalculationHistory } from '@/utils/calculations';

// const units = [
//   { value: 'kg', label: 'Kilograms (kg)', symbol: 'kg' },
//   { value: 'pounds', label: 'Pounds (lbs)', symbol: 'lbs' },
//   { value: 'ounces', label: 'Ounces (oz)', symbol: 'oz' },
//   { value: 'grams', label: 'Grams (g)', symbol: 'g' },
//   { value: 'tons', label: 'Tons (t)', symbol: 't' },
// ];

export default function WeightConverter() {
  const [kg, setKg] = useState('');
  const [pounds, setPounds] = useState('');
  const [ounces, setOunces] = useState('');
  const [activeInput, setActiveInput] = useState<'kg' | 'pounds' | 'ounces'>('kg');
  const [recentCalculations, setRecentCalculations] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    setRecentCalculations(getCalculations('weight'));
  }, []);

  const handleInputChange = (value: string, type: 'kg' | 'pounds' | 'ounces') => {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setKg('');
      setPounds('');
      setOunces('');
      return;
    }

    setActiveInput(type);

    switch (type) {
      case 'kg':
        setKg(value);
        setPounds(weightConversions.kg.pounds(numValue).toFixed(2));
        setOunces(weightConversions.kg.ounces(numValue).toFixed(2));
        break;
      case 'pounds':
        setPounds(value);
        setKg(weightConversions.pounds.kg(numValue).toFixed(2));
        setOunces(weightConversions.pounds.ounces(numValue).toFixed(2));
        break;
      case 'ounces':
        setOunces(value);
        setKg(weightConversions.ounces.kg(numValue).toFixed(2));
        setPounds(weightConversions.ounces.pounds(numValue).toFixed(2));
        break;
    }

    // Save calculation
    const kgValue = type === 'kg' ? numValue : parseFloat(weightConversions[type].kg(numValue).toFixed(2));
    // const poundsValue = type === 'pounds' ? numValue : parseFloat(weightConversions[type].pounds(numValue).toFixed(2));
    // const ouncesValue = type === 'ounces' ? numValue : parseFloat(weightConversions[type].ounces(numValue).toFixed(2));
    
    saveCalculation('weight', {
      fromValue: numValue,
      fromUnit: type,
      toValue: kgValue,
      toUnit: 'kg',
      fromSymbol: type === 'kg' ? 'kg' : type === 'pounds' ? 'lbs' : 'oz',
      toSymbol: 'kg',
    });
    setRecentCalculations(getCalculations('weight'));
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = async () => {
    const text = `Weight Conversion: ${kg}kg = ${pounds}lbs = ${ounces}oz`;
    if (navigator.share) {
      await navigator.share({
        title: 'Weight Conversion - CalcPro',
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
            <Weight className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Weight Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Convert between kilograms, pounds, and ounces
          </p>
        </div>

        {/* Converter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Kilograms */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Kilograms (kg)
              </label>
              <input
                type="number"
                value={kg}
                onChange={(e) => handleInputChange(e.target.value, 'kg')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'kg'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="1"
              />
            </div>

            {/* Pounds */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Pounds (lbs)
              </label>
              <input
                type="number"
                value={pounds}
                onChange={(e) => handleInputChange(e.target.value, 'pounds')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'pounds'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="2.2"
              />
            </div>

            {/* Ounces */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ounces (oz)
              </label>
              <input
                type="number"
                value={ounces}
                onChange={(e) => handleInputChange(e.target.value, 'ounces')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  activeInput === 'ounces'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white`}
                placeholder="35.27"
              />
            </div>
          </div>

          {/* Action buttons */}
          {kg && pounds && ounces && (
            <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleCopy(`${kg}kg = ${pounds}lbs = ${ounces}oz`)}
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
                    {calc.fromValue} {calc.fromSymbol}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    = {calc.toValue} {calc.toSymbol}
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
