'use client';

import { Copy, Share2 } from 'lucide-react';
import { useState } from 'react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  gradient: string;
}

export default function CalculatorCard({ title, description, icon: Icon, href, gradient }: CalculatorCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.origin + href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${title} - CalcPro`,
        text: `Check out this ${title.toLowerCase()} calculator!`,
        url: window.location.origin + href,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-8 text-white shadow-lg transition-transform hover:scale-105`}>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <Icon className="h-8 w-8" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-blue-100 mb-6">{description}</p>
        
        <div className="flex items-center justify-between">
          <a
            href={href}
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors"
          >
            Open Calculator
          </a>
          
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              title="Copy link"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      {copied && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
          Copied!
        </div>
      )}
    </div>
  );
}
