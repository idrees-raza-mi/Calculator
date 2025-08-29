'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Copy, Share2, Clock, RefreshCw } from 'lucide-react';
import { saveCalculation, getCalculations } from '@/utils/calculations';

interface ExchangeRate {
  [key: string]: number;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [recentCalculations, setRecentCalculations] = useState<any[]>([]);

  useEffect(() => {
    setRecentCalculations(getCalculations('currency'));
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // Using a free exchange rate API (you can replace with your preferred API)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Fallback rates for demo purposes
      setExchangeRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.5,
        CAD: 1.25,
        AUD: 1.35,
        CHF: 0.92,
        CNY: 6.45,
        INR: 74.5,
        PKR: 165.5,
        BRL: 5.25,
        MXN: 20.5,
      });
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    const amountValue = parseFloat(amount);
    
    if (isNaN(amountValue) || amountValue <= 0) {
      setResult(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(amountValue);
      return;
    }

    // Convert to USD first, then to target currency
    const usdAmount = amountValue / exchangeRates[fromCurrency];
    const convertedAmount = usdAmount * exchangeRates[toCurrency];
    
    setResult(convertedAmount);

    // Save calculation
    const calculation = {
      amount: amountValue,
      fromCurrency,
      toCurrency,
      result: convertedAmount,
      rate: exchangeRates[toCurrency] / exchangeRates[fromCurrency],
    };
    saveCalculation('currency', calculation);
    setRecentCalculations(getCalculations('currency'));
  };

  useEffect(() => {
    if (amount && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = async () => {
    const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || fromCurrency;
    const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || toCurrency;
    const text = `${amount} ${fromCurrency} = ${result?.toFixed(2)} ${toCurrency}`;
    
    if (navigator.share) {
      await navigator.share({
        title: 'Currency Conversion - CalcPro',
        text,
        url: window.location.href,
      });
    } else {
      await handleCopy(text);
    }
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <DollarSign className="h-12 w-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Currency Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Convert currencies with live exchange rates
          </p>
        </div>

        {/* Exchange Rate Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Exchange rates
              </span>
              {loading && (
                <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
              )}
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchExchangeRates}
                disabled={loading}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Converter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="100"
              />
            </div>

            {/* From Currency */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* To Currency */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Conversion Result
                </h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {getCurrencySymbol(toCurrency)}{result.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                </div>
                {fromCurrency !== toCurrency && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          {result !== null && (
            <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleCopy(`${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`)}
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
                    {calc.amount} {calc.fromCurrency}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    = {calc.result.toFixed(2)} {calc.toCurrency}
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
