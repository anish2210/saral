'use client';

import { motion } from 'framer-motion';
import Button from './Button';
import PaymentCard from './PaymentCard';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 gradient-mesh noise-overlay">
      {/* Diagonal accent element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-500/5 to-transparent transform skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-semibold inline-block mb-6">
              Made for Indian Tutors
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-clash-display)' }}
          >
            Stop Chasing
            <span className="block text-primary-500">Fee Payments</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 text-balance"
          >
            Track student payments in seconds, not hours. Saral is the simple, mobile-first fee tracking platform designed for tutors like you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button variant="primary" size="lg" href={`${appUrl}/sign-up`}>
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" href="#how-it-works">
              See How It Works
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-slate-500 mt-6"
          >
            No credit card required • Setup in under 2 minutes
          </motion.p>
        </motion.div>

        {/* Right - Payment Cards Demo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
            <PaymentCard studentName="Rahul Kumar" amount="₹5,000" status="paid" delay={0.3} />
            <PaymentCard studentName="Priya Sharma" amount="₹4,500" status="pending" delay={0.4} />
            <PaymentCard studentName="Arjun Patel" amount="₹6,000" status="paid" delay={0.5} />
            <PaymentCard studentName="Sneha Singh" amount="₹5,500" status="pending" delay={0.6} />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -top-6 -right-6 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-xl rotate-12 hidden sm:block"
          >
            <p className="text-sm font-bold">Track with a tap!</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
