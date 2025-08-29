import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MenuProvider } from "@/contexts/MenuContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CalcPro - Professional Calculators & Converters",
  description: "Convert units, calculate BMI, and handle currency conversions with precision and ease. Professional calculators for all your needs.",
  keywords: "calculator, converter, temperature, length, weight, currency, BMI, unit conversion",
  authors: [{ name: "CalcPro Team" }],
  creator: "CalcPro",
  publisher: "CalcPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://calcpro.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CalcPro - Professional Calculators & Converters",
    description: "Convert units, calculate BMI, and handle currency conversions with precision and ease.",
    url: 'https://calcpro.vercel.app',
    siteName: 'CalcPro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CalcPro - Professional Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CalcPro - Professional Calculators & Converters",
    description: "Convert units, calculate BMI, and handle currency conversions with precision and ease.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <MenuProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Header />
              <main>{children}</main>
            </div>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
