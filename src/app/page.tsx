'use client';

import { Thermometer, Ruler, Weight, DollarSign, Heart, Calculator, Zap, Shield, Smartphone, Square, Box, Clock, HardDrive } from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';

const calculators = [
  {
    title: 'Temperature',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin with precision.',
    icon: Thermometer,
    href: '/converter/temperature',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    title: 'Length',
    description: 'Convert meters, feet, inches, kilometers, miles, and yards.',
    icon: Ruler,
    href: '/converter/length',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Weight',
    description: 'Convert between kilograms, pounds, ounces, grams, and tons.',
    icon: Weight,
    href: '/converter/weight',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Area',
    description: 'Convert square meters, square feet, acres, and hectares.',
    icon: Square,
    href: '/converter/area',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    title: 'Volume',
    description: 'Convert liters, gallons, cubic meters, and cubic feet.',
    icon: Box,
    href: '/converter/volume',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Speed',
    description: 'Convert km/h, mph, m/s, and knots for velocity calculations.',
    icon: Zap,
    href: '/converter/speed',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Time',
    description: 'Convert seconds, minutes, hours, days, and weeks.',
    icon: Clock,
    href: '/converter/time',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    title: 'Data Storage',
    description: 'Convert bytes, kilobytes, megabytes, gigabytes, and terabytes.',
    icon: HardDrive,
    href: '/converter/data',
    gradient: 'from-gray-500 to-slate-500',
  },
  {
    title: 'Currency',
    description: 'Real-time currency conversion with live exchange rates.',
    icon: DollarSign,
    href: '/converter/currency',
    gradient: 'from-yellow-500 to-amber-500',
  },
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and get health insights.',
    icon: Heart,
    href: '/converter/bmi',
    gradient: 'from-pink-500 to-rose-500',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant calculations with real-time updates and live data.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All calculations happen locally. Your data never leaves your device.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Perfect experience on all devices, from phones to desktops.',
  },
];

export default function Home() {
  const scrollToCalculators = () => {
    const element = document.getElementById('calculators');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Calculator className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional
              <span className="block text-blue-200">Calculators</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Convert units, calculate BMI, and handle currency conversions with precision and ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToCalculators}
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Started
              </button>
              <a
                href="/faq"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CalcPro?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Built with modern technology for the best user experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Calculators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose from our collection of professional calculators and converters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calculators.map((calculator) => (
              <CalculatorCard
                key={calculator.title}
                title={calculator.title}
                description={calculator.description}
                icon={calculator.icon}
                href={calculator.href}
                gradient={calculator.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Calculating?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust CalcPro for their calculations
          </p>
          <button
            onClick={scrollToCalculators}
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Explore Calculators
          </button>
        </div>
      </section>
    </div>
  );
}
