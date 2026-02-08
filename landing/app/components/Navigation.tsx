'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from './Button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold text-primary-500"
            style={{ fontFamily: 'var(--font-clash-display)' }}
          >
            Saral
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-primary-500 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-primary-500 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-slate-300 hover:text-primary-500 transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" href="https://app.saral.com/login" className="hidden sm:inline-flex">
              Login
            </Button>
            <Button variant="primary" size="sm" href="#get-started">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
