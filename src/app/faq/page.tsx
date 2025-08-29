'use client';

import Link from 'next/link';
import { HelpCircle, Calculator, Thermometer, Ruler, Weight, DollarSign, Heart, Zap, Shield, Smartphone } from 'lucide-react';

const faqs = [
  {
    question: "What is CalcPro?",
    answer: "CalcPro is a comprehensive calculator and conversion website that provides professional tools for temperature, length, weight, currency conversions, and BMI calculations. It's designed to be fast, accurate, and user-friendly.",
    icon: Calculator,
  },
  {
    question: "How accurate are the currency exchange rates?",
    answer: "We use live exchange rate APIs to provide real-time currency conversion rates. The rates are updated regularly and sourced from reliable financial data providers. However, rates may vary slightly between different sources and may not reflect exact bank rates.",
    icon: DollarSign,
  },
  {
    question: "What temperature units are supported?",
    answer: "Our temperature converter supports Celsius (°C), Fahrenheit (°F), and Kelvin (K). You can convert between any of these units with high precision.",
    icon: Thermometer,
  },
  {
    question: "Which length units can I convert?",
    answer: "The length converter supports meters (m), feet (ft), inches (in), and kilometers (km). All conversions are performed with accurate conversion factors.",
    icon: Ruler,
  },
  {
    question: "What weight units are available?",
    answer: "Our weight converter supports kilograms (kg), pounds (lbs), and ounces (oz). Conversions are based on standard international conversion factors.",
    icon: Weight,
  },
  {
    question: "How is BMI calculated?",
    answer: "BMI (Body Mass Index) is calculated using the formula: weight (kg) / height (m)². Our calculator automatically converts between different units (kg/lbs for weight, cm/ft/in for height) before performing the calculation.",
    icon: Heart,
  },
  {
    question: "Is my data stored or shared?",
    answer: "No, we prioritize your privacy. All calculations are performed locally in your browser, and your data never leaves your device. We only store your recent calculations locally for your convenience.",
    icon: Shield,
  },
  {
    question: "Can I use CalcPro on mobile devices?",
    answer: "Yes! CalcPro is fully responsive and optimized for all devices including smartphones, tablets, and desktop computers. The interface adapts automatically to provide the best experience on any screen size.",
    icon: Smartphone,
  },
  {
    question: "How often are exchange rates updated?",
    answer: "Currency exchange rates are fetched in real-time when you use the currency converter. You can also manually refresh the rates using the refresh button to get the latest data.",
    icon: Zap,
  },
  {
    question: "Are the calculations accurate?",
    answer: "Yes, all our calculations use standard conversion factors and formulas. The temperature conversions use the official formulas, BMI calculations follow WHO guidelines, and currency rates come from reliable financial APIs.",
    icon: Calculator,
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about CalcPro and our calculators
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <faq.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-blue-100 mb-6">
            If you couldn&apos;t find the answer you&apos;re looking for, feel free to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@calcpro.com"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </a>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Features Summary */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Fast & Accurate
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Instant calculations with precise results using standard formulas and live data.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Privacy First
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your data stays on your device. No personal information is collected or stored.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Mobile Optimized
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Perfect experience on all devices, from phones to desktops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
