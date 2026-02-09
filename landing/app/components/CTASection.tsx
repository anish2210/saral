'use client';

import { motion } from 'framer-motion';
import Button from './Button';
import { CheckIcon } from './Icons';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173';

export default function CTASection() {
  return (
    <section id="get-started" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-violet-500/10" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-sm"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-clash-display)' }}
          >
            Ready to Transform Your
            <span className="block text-primary-500">Fee Tracking?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Join hundreds of tutors who have already saved countless hours with Saral.
            Start your free trial today - no credit card required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Button variant="primary" size="lg" href={`${appUrl}/sign-up`}>
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" href="#pricing">
              View Pricing
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <CheckIcon className="text-emerald-500" size={18} />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-emerald-500" size={18} />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-emerald-500" size={18} />
              <span>Setup in 2 minutes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
