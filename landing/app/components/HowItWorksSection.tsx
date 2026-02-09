'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Sign Up in Seconds',
    description: 'Use Google or email to create your account. No lengthy forms or paperwork.',
    gradient: 'from-primary-500 to-orange-500',
  },
  {
    number: '02',
    title: 'Add Your Students',
    description: 'Enter student names and monthly fees. Takes less than 2 minutes for 20 students.',
    gradient: 'from-blue-500 to-violet-500',
  },
  {
    number: '03',
    title: 'Track Payments',
    description: 'Mark paid or pending with one tap. Share links so students can check their status.',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-slate-900/50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/5 to-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-clash-display)' }}
          >
            How It Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three simple steps to transform your fee tracking experience.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Step Number */}
                <div
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl`}
                >
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-8 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-12 top-24 w-0.5 h-8 bg-gradient-to-b from-slate-700 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-slate-300 mb-6">Ready to simplify your fee tracking?</p>
          <motion.a
            href={`${appUrl}/sign-up`}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-slate-950 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-200 min-h-[56px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Free
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
