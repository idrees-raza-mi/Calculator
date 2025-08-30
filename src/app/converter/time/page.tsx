'use client';

import { useState, useEffect } from 'react';
import { Clock, Copy, Share2, RotateCcw } from 'lucide-react';
import { timeConversions, saveCalculation, getCalculations, CalculationHistory } from '@/utils/calculations';

// Type definitions for conversion functions
type ConversionFunction = (value: number) => number;
type ConversionUnit = Record<string, ConversionFunction>;

const units = [
  { value: 'seconds', label: 'Seconds (s)', symbol: 's' },
  { value: 'minutes', label: 'Minutes (min)', symbol: 'min' },
  { value: 'hours', label: 'Hours (h)', symbol: 'h' },
  { value: 'days', label: 'Days (d)', symbol: 'd' },
  { value: 'weeks', label: 'Weeks (wk)', symbol: 'wk' },
];

export default function TimeConverter() {
  const [fromUnit, setFromUnit] = useState('hours');
  const [toUnit, setToUnit] = useState('minutes');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [recentCalculations, setRecentCalculations] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    setRecentCalculations(getCalculations('time'));
  }, []);

  const convert = (value: string, from: string, to: string) => {
    if (!value || isNaN(Number(value))) {
      setToValue('');
      return;
    }

    const numValue = parseFloat(value);
    
    if (from === to) {
      setToValue(value);
      return;
    }

    let result: number;
    
    // Try direct conversion first
    const fromConversions = timeConversions[from as keyof typeof timeConversions] as ConversionUnit;
    if (fromConversions && to in fromConversions) {
      result = fromConversions[to](numValue);
    } else {
      // If direct conversion doesn't exist, convert through seconds
      const fromConversions = timeConversions[from as keyof typeof timeConversions] as ConversionUnit;
      const toSeconds = fromConversions?.seconds?.(numValue);
      if (toSeconds && timeConversions.seconds[to as keyof typeof timeConversions.seconds]) {
        result = (timeConversions.seconds as ConversionUnit)[to](toSeconds);
      } else {
        setToValue('');
        return;
      }
    }

    setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    convert(fromValue, unit, toUnit);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    convert(fromValue, fromUnit, unit);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const copyResult = () => {
    if (toValue) {
      navigator.clipboard.writeText(`${fromValue} ${units.find(u => u.value === fromUnit)?.symbol} = ${toValue} ${units.find(u => u.value === toUnit)?.symbol}`);
    }
  };

  const shareResult = () => {
    if (toValue && navigator.share) {
      navigator.share({
        title: 'Time Conversion',
        text: `${fromValue} ${units.find(u => u.value === fromUnit)?.symbol} = ${toValue} ${units.find(u => u.value === toUnit)?.symbol}`,
        url: window.location.href,
      });
    }
  };

  const saveCurrentCalculation = () => {
    if (fromValue && toValue) {
      const calculation = {
        fromValue: parseFloat(fromValue),
        fromUnit,
        toValue: parseFloat(toValue),
        toUnit,
        fromSymbol: units.find(u => u.value === fromUnit)?.symbol,
        toSymbol: units.find(u => u.value === toUnit)?.symbol,
      };
      saveCalculation('time', calculation);
      setRecentCalculations(getCalculations('time'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Clock className="h-12 w-12 text-teal-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Time Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert between different time units with precision
          </p>
        </div>

        {/* Converter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <div className="space-y-4">
                <select
                  value={fromUnit}
                  onChange={(e) => handleFromUnitChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  placeholder="Enter value"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <div className="space-y-4">
                <select
                  value={toUnit}
                  onChange={(e) => handleToUnitChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={toValue}
                  readOnly
                  placeholder="Result"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSwap}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Swap</span>
            </button>
            <button
              onClick={copyResult}
              disabled={!toValue}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={shareResult}
              disabled={!toValue}
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              onClick={saveCurrentCalculation}
              disabled={!toValue}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Recent Calculations */}
        {recentCalculations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Calculations
            </h2>
            <div className="space-y-3">
              {recentCalculations.map((calc, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {calc.fromValue} {calc.fromSymbol} = {calc.toValue} {calc.toSymbol}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(calc.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
