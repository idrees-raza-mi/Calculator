// Temperature conversions
export const temperatureConversions = {
  celsius: {
    fahrenheit: (celsius: number) => (celsius * 9/5) + 32,
    kelvin: (celsius: number) => celsius + 273.15,
  },
  fahrenheit: {
    celsius: (fahrenheit: number) => (fahrenheit - 32) * 5/9,
    kelvin: (fahrenheit: number) => (fahrenheit - 32) * 5/9 + 273.15,
  },
  kelvin: {
    celsius: (kelvin: number) => kelvin - 273.15,
    fahrenheit: (kelvin: number) => (kelvin - 273.15) * 9/5 + 32,
  },
};

// Length conversions
export const lengthConversions = {
  meters: {
    feet: (meters: number) => meters * 3.28084,
    inches: (meters: number) => meters * 39.3701,
    kilometers: (meters: number) => meters / 1000,
    miles: (meters: number) => meters / 1609.344,
    yards: (meters: number) => meters * 1.09361,
  },
  feet: {
    meters: (feet: number) => feet / 3.28084,
    inches: (feet: number) => feet * 12,
    kilometers: (feet: number) => feet / 3280.84,
    miles: (feet: number) => feet / 5280,
    yards: (feet: number) => feet / 3,
  },
  inches: {
    meters: (inches: number) => inches / 39.3701,
    feet: (inches: number) => inches / 12,
    kilometers: (inches: number) => inches / 39370.1,
    miles: (inches: number) => inches / 63360,
    yards: (inches: number) => inches / 36,
  },
  kilometers: {
    meters: (kilometers: number) => kilometers * 1000,
    feet: (kilometers: number) => kilometers * 3280.84,
    inches: (kilometers: number) => kilometers * 39370.1,
    miles: (kilometers: number) => kilometers / 1.609344,
    yards: (kilometers: number) => kilometers * 1093.61,
  },
  miles: {
    meters: (miles: number) => miles * 1609.344,
    feet: (miles: number) => miles * 5280,
    inches: (miles: number) => miles * 63360,
    kilometers: (miles: number) => miles * 1.609344,
    yards: (miles: number) => miles * 1760,
  },
  yards: {
    meters: (yards: number) => yards / 1.09361,
    feet: (yards: number) => yards * 3,
    inches: (yards: number) => yards * 36,
    kilometers: (yards: number) => yards / 1093.61,
    miles: (yards: number) => yards / 1760,
  },
};

// Weight conversions
export const weightConversions = {
  kg: {
    pounds: (kg: number) => kg * 2.20462,
    ounces: (kg: number) => kg * 35.274,
    grams: (kg: number) => kg * 1000,
    tons: (kg: number) => kg / 1000,
  },
  pounds: {
    kg: (pounds: number) => pounds / 2.20462,
    ounces: (pounds: number) => pounds * 16,
    grams: (pounds: number) => pounds * 453.592,
    tons: (pounds: number) => pounds / 2000,
  },
  ounces: {
    kg: (ounces: number) => ounces / 35.274,
    pounds: (ounces: number) => ounces / 16,
    grams: (ounces: number) => ounces * 28.3495,
    tons: (ounces: number) => ounces / 32000,
  },
  grams: {
    kg: (grams: number) => grams / 1000,
    pounds: (grams: number) => grams / 453.592,
    ounces: (grams: number) => grams / 28.3495,
    tons: (grams: number) => grams / 1000000,
  },
  tons: {
    kg: (tons: number) => tons * 1000,
    pounds: (tons: number) => tons * 2000,
    ounces: (tons: number) => tons * 32000,
    grams: (tons: number) => tons * 1000000,
  },
};

// Area conversions
export const areaConversions = {
  squareMeters: {
    squareFeet: (sqMeters: number) => sqMeters * 10.7639,
    squareInches: (sqMeters: number) => sqMeters * 1550.003,
    acres: (sqMeters: number) => sqMeters / 4046.86,
    hectares: (sqMeters: number) => sqMeters / 10000,
  },
  squareFeet: {
    squareMeters: (sqFeet: number) => sqFeet / 10.7639,
    squareInches: (sqFeet: number) => sqFeet * 144,
    acres: (sqFeet: number) => sqFeet / 43560,
    hectares: (sqFeet: number) => sqFeet / 107639,
  },
  squareInches: {
    squareMeters: (sqInches: number) => sqInches / 1550.003,
    squareFeet: (sqInches: number) => sqInches / 144,
    acres: (sqInches: number) => sqInches / 6272640,
    hectares: (sqInches: number) => sqInches / 15500030,
  },
  acres: {
    squareMeters: (acres: number) => acres * 4046.86,
    squareFeet: (acres: number) => acres * 43560,
    squareInches: (acres: number) => acres * 6272640,
    hectares: (acres: number) => acres / 2.47105,
  },
  hectares: {
    squareMeters: (hectares: number) => hectares * 10000,
    squareFeet: (hectares: number) => hectares * 107639,
    squareInches: (hectares: number) => hectares * 15500030,
    acres: (hectares: number) => hectares * 2.47105,
  },
};

// Volume conversions
export const volumeConversions = {
  liters: {
    gallons: (liters: number) => liters / 3.78541,
    cubicMeters: (liters: number) => liters / 1000,
    cubicFeet: (liters: number) => liters / 28.3168,
    milliliters: (liters: number) => liters * 1000,
  },
  gallons: {
    liters: (gallons: number) => gallons * 3.78541,
    cubicMeters: (gallons: number) => gallons / 264.172,
    cubicFeet: (gallons: number) => gallons / 7.48052,
    milliliters: (gallons: number) => gallons * 3785.41,
  },
  cubicMeters: {
    liters: (cubicMeters: number) => cubicMeters * 1000,
    gallons: (cubicMeters: number) => cubicMeters * 264.172,
    cubicFeet: (cubicMeters: number) => cubicMeters * 35.3147,
    milliliters: (cubicMeters: number) => cubicMeters * 1000000,
  },
  cubicFeet: {
    liters: (cubicFeet: number) => cubicFeet * 28.3168,
    gallons: (cubicFeet: number) => cubicFeet * 7.48052,
    cubicMeters: (cubicFeet: number) => cubicFeet / 35.3147,
    milliliters: (cubicFeet: number) => cubicFeet * 28316.8,
  },
  milliliters: {
    liters: (milliliters: number) => milliliters / 1000,
    gallons: (milliliters: number) => milliliters / 3785.41,
    cubicMeters: (milliliters: number) => milliliters / 1000000,
    cubicFeet: (milliliters: number) => milliliters / 28316.8,
  },
};

// Speed conversions
export const speedConversions = {
  kmh: {
    mph: (kmh: number) => kmh / 1.60934,
    ms: (kmh: number) => kmh / 3.6,
    knots: (kmh: number) => kmh / 1.852,
  },
  mph: {
    kmh: (mph: number) => mph * 1.60934,
    ms: (mph: number) => mph / 2.23694,
    knots: (mph: number) => mph / 1.15078,
  },
  ms: {
    kmh: (ms: number) => ms * 3.6,
    mph: (ms: number) => ms * 2.23694,
    knots: (ms: number) => ms * 1.94384,
  },
  knots: {
    kmh: (knots: number) => knots * 1.852,
    mph: (knots: number) => knots * 1.15078,
    ms: (knots: number) => knots / 1.94384,
  },
};

// Data storage conversions
export const dataConversions = {
  bytes: {
    kilobytes: (bytes: number) => bytes / 1024,
    megabytes: (bytes: number) => bytes / (1024 * 1024),
    gigabytes: (bytes: number) => bytes / (1024 * 1024 * 1024),
    terabytes: (bytes: number) => bytes / (1024 * 1024 * 1024 * 1024),
  },
  kilobytes: {
    bytes: (kb: number) => kb * 1024,
    megabytes: (kb: number) => kb / 1024,
    gigabytes: (kb: number) => kb / (1024 * 1024),
    terabytes: (kb: number) => kb / (1024 * 1024 * 1024),
  },
  megabytes: {
    bytes: (mb: number) => mb * 1024 * 1024,
    kilobytes: (mb: number) => mb * 1024,
    gigabytes: (mb: number) => mb / 1024,
    terabytes: (mb: number) => mb / (1024 * 1024),
  },
  gigabytes: {
    bytes: (gb: number) => gb * 1024 * 1024 * 1024,
    kilobytes: (gb: number) => gb * 1024 * 1024,
    megabytes: (gb: number) => gb * 1024,
    terabytes: (gb: number) => gb / 1024,
  },
  terabytes: {
    bytes: (tb: number) => tb * 1024 * 1024 * 1024 * 1024,
    kilobytes: (tb: number) => tb * 1024 * 1024 * 1024,
    megabytes: (tb: number) => tb * 1024 * 1024,
    gigabytes: (tb: number) => tb * 1024,
  },
};

// Time conversions
export const timeConversions = {
  seconds: {
    minutes: (seconds: number) => seconds / 60,
    hours: (seconds: number) => seconds / 3600,
    days: (seconds: number) => seconds / 86400,
    weeks: (seconds: number) => seconds / 604800,
  },
  minutes: {
    seconds: (minutes: number) => minutes * 60,
    hours: (minutes: number) => minutes / 60,
    days: (minutes: number) => minutes / 1440,
    weeks: (minutes: number) => minutes / 10080,
  },
  hours: {
    seconds: (hours: number) => hours * 3600,
    minutes: (hours: number) => hours * 60,
    days: (hours: number) => hours / 24,
    weeks: (hours: number) => hours / 168,
  },
  days: {
    seconds: (days: number) => days * 86400,
    minutes: (days: number) => days * 1440,
    hours: (days: number) => days * 24,
    weeks: (days: number) => days / 7,
  },
  weeks: {
    seconds: (weeks: number) => weeks * 604800,
    minutes: (weeks: number) => weeks * 10080,
    hours: (weeks: number) => weeks * 168,
    days: (weeks: number) => weeks * 7,
  },
};

// BMI calculation
export const calculateBMI = (weight: number, height: number, weightUnit: 'kg' | 'pounds', heightUnit: 'cm' | 'feet' | 'inches'): number => {
  let weightInKg = weight;
  let heightInM = height;

  // Convert weight to kg if needed
  if (weightUnit === 'pounds') {
    weightInKg = weight / 2.20462;
  }

  // Convert height to meters if needed
  if (heightUnit === 'cm') {
    heightInM = height / 100;
  } else if (heightUnit === 'feet') {
    heightInM = height * 0.3048;
  } else if (heightUnit === 'inches') {
    heightInM = height * 0.0254;
  }

  return weightInKg / (heightInM * heightInM);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Interface for calculation history
export interface CalculationHistory {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  fromSymbol?: string;
  toSymbol?: string;
  timestamp: string;
}

// LocalStorage utilities for saving calculations
export const saveCalculation = (type: string, calculation: Omit<CalculationHistory, 'timestamp'>) => {
  const key = `calculations_${type}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  const newCalculation: CalculationHistory = {
    ...calculation,
    timestamp: new Date().toISOString(),
  };
  
  const updated = [newCalculation, ...existing.slice(0, 4)]; // Keep last 5
  localStorage.setItem(key, JSON.stringify(updated));
};

export const getCalculations = (type: string): CalculationHistory[] => {
  const key = `calculations_${type}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};
