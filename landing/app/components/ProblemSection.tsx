'use client';

import { motion } from 'framer-motion';
import { NotebookIcon, SpreadsheetIcon, MessageIcon, SmartphoneIcon } from './Icons';

const problems = [
  {
    icon: NotebookIcon,
    title: 'Lost in Notebooks',
    description: 'Flipping through pages to find who paid last month wastes precious time.',
  },
  {
    icon: SpreadsheetIcon,
    title: 'Excel Chaos',
    description: 'Scattered spreadsheets on different devices make tracking a nightmare.',
  },
  {
    icon: MessageIcon,
    title: 'Awkward Follow-ups',
    description: 'You forget who paid, leading to uncomfortable conversations with parents.',
  },
  {
    icon: SmartphoneIcon,
    title: 'No Mobile Access',
    description: 'Your tracking system does not work on your phone when you need it most.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 px-4 bg-slate-900/50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
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
            Sound Familiar?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            You are not alone. Thousands of tutors waste hours every month on manual fee tracking.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-red-500/30 transition-colors duration-300"
              >
                <div className="mb-4 text-red-400">
                  <IconComponent size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl font-semibold text-primary-400">
            There has to be a better way...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
