'use client';

import { useState, useEffect, useCallback } from 'react';
import { Heart, Copy, Share2, Clock, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { calculateBMI, getBMICategory, saveCalculation, getCalculations, CalculationHistory } from '@/utils/calculations';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'pounds'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'feet' | 'inches'>('cm');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [recentCalculations, setRecentCalculations] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    setRecentCalculations(getCalculations('bmi'));
  }, []);

  const calculateBMIScore = useCallback(() => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
      setBmi(null);
      setCategory('');
      return;
    }

    const bmiValue = calculateBMI(weightValue, heightValue, weightUnit, heightUnit);
    const bmiCategory = getBMICategory(bmiValue);

    setBmi(bmiValue);
    setCategory(bmiCategory);

    // Save calculation
    saveCalculation('bmi', {
      fromValue: weightValue,
      fromUnit: weightUnit,
      toValue: bmiValue,
      toUnit: 'BMI',
      fromSymbol: weightUnit === 'kg' ? 'kg' : 'lbs',
      toSymbol: 'BMI',
    });
    setRecentCalculations(getCalculations('bmi'));
  }, [weight, height, weightUnit, heightUnit]);

  useEffect(() => {
    calculateBMIScore();
  }, [weight, height, weightUnit, heightUnit, calculateBMIScore]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-600 dark:text-blue-400';
      case 'Normal weight':
        return 'text-green-600 dark:text-green-400';
      case 'Overweight':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Obese':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Underweight':
        return <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'Normal weight':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'Overweight':
        return <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case 'Obese':
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = async () => {
    const text = `My BMI: ${bmi?.toFixed(1)} (${category}) - Weight: ${weight}${weightUnit === 'kg' ? 'kg' : 'lbs'}, Height: ${height}${heightUnit === 'cm' ? 'cm' : heightUnit === 'feet' ? 'ft' : 'in'}`;
    if (navigator.share) {
      await navigator.share({
        title: 'BMI Calculator - CalcPro',
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
            <Heart className="h-12 w-12 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            BMI Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your Body Mass Index and get health insights
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weight Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Weight
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="70"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'pounds')}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="kg">kg</option>
                  <option value="pounds">lbs</option>
                </select>
              </div>
            </div>

            {/* Height Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Height
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="170"
                />
                <select
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'feet' | 'inches')}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="cm">cm</option>
                  <option value="feet">ft</option>
                  <option value="inches">in</option>
                </select>
              </div>
            </div>
          </div>

          {/* BMI Result */}
          {bmi !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Your BMI Result
                </h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {bmi.toFixed(1)}
                </div>
                <div className={`flex items-center justify-center space-x-2 text-lg font-medium ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {bmi !== null && (
            <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleCopy(`BMI: ${bmi.toFixed(1)} (${category})`)}
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

        {/* BMI Categories Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            BMI Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-600 dark:text-blue-400">Underweight</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">BMI &lt; 18.5</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-600 dark:text-green-400">Normal weight</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">BMI 18.5 - 24.9</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">Overweight</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">BMI 25 - 29.9</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-600 dark:text-red-400">Obese</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">BMI ≥ 30</p>
            </div>
          </div>
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
                    {calc.fromValue} {calc.fromSymbol}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {calc.toValue.toFixed(1)} {calc.toSymbol}
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
