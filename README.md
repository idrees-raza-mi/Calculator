# CalcPro - Professional Calculator & Converter Website

A modern, responsive calculator and conversion website built with Next.js, TypeScript, and Tailwind CSS. Features include temperature, length, weight, currency conversions, and BMI calculations with a beautiful, mobile-first design.

## 🚀 Features

### Core Functionality
- **Temperature Converter**: Celsius ↔ Fahrenheit ↔ Kelvin
- **Length Converter**: Meters ↔ Feet ↔ Inches ↔ Kilometers
- **Weight Converter**: Kilograms ↔ Pounds ↔ Ounces
- **Currency Converter**: Live exchange rates with 12+ currencies
- **BMI Calculator**: Health insights with category classification

### User Experience
- 🌙 **Dark/Light Mode**: Toggle between themes with persistent preference
- 📱 **Mobile-First Design**: Fully responsive across all devices
- 🍔 **Hamburger Menu**: Collapsible navigation for mobile devices
- 📋 **Copy Results**: One-click copy functionality for all calculations
- 📤 **Share Results**: Native sharing or fallback to copy
- 💾 **Local Storage**: Saves last 5 calculations for each converter
- ⚡ **Real-time Updates**: Instant calculations as you type

### Technical Features
- **SEO Optimized**: Meta tags, Open Graph, sitemap, structured data
- **Performance**: Fast loading with Next.js App Router
- **Accessibility**: ARIA labels and keyboard navigation
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Beautiful gradients and smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd calculator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

### Environment Variables

For production deployment, you may want to add:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── converter/         # Calculator pages
│   │   ├── temperature/
│   │   ├── length/
│   │   ├── weight/
│   │   ├── currency/
│   │   └── bmi/
│   ├── faq/              # FAQ page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── sitemap.ts        # SEO sitemap
│   └── robots.ts         # SEO robots
├── components/           # Reusable components
│   ├── Header.tsx       # Navigation header
│   └── CalculatorCard.tsx # Calculator cards
├── contexts/            # React contexts
│   ├── ThemeContext.tsx # Dark/light mode
│   └── MenuContext.tsx  # Mobile menu state
└── utils/               # Utility functions
    └── calculations.ts  # Conversion logic
```

## 🎨 Customization

### Adding New Calculators

1. **Create conversion functions** in `src/utils/calculations.ts`
2. **Add new page** in `src/app/converter/[calculator-name]/`
3. **Update navigation** in `src/components/Header.tsx`
4. **Add to sitemap** in `src/app/sitemap.ts`

### Styling

The project uses Tailwind CSS with a custom color scheme. You can modify:
- Colors in `tailwind.config.js`
- Global styles in `src/app/globals.css`
- Component-specific styles in individual components

## 🔧 API Integration

### Currency Exchange Rates

The currency converter uses the [Exchange Rate API](https://exchangerate-api.com/). For production use, consider:

1. **Sign up for an API key** at a currency API provider
2. **Update the API endpoint** in `src/app/converter/currency/page.tsx`
3. **Add rate limiting** and error handling

### Alternative APIs

- [Fixer.io](https://fixer.io/)
- [CurrencyLayer](https://currencylayer.com/)
- [Open Exchange Rates](https://openexchangerates.org/)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@calcpro.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/calculator-app/issues)
- 📖 Documentation: [Project Wiki](https://github.com/your-username/calculator-app/wiki)

---

Made with ❤️ by [Your Name]
