'use client';

import { motion } from 'framer-motion';
import { BoltIcon, SmartphoneIcon, ShieldIcon, LinkIcon, ChartIcon, ClockIcon } from './Icons';

const features = [
  {
    icon: BoltIcon,
    title: 'Lightning Fast Tracking',
    description: 'Mark payments as paid or pending with a single tap. No typing, no hassle.',
    color: 'text-primary-500',
  },
  {
    icon: SmartphoneIcon,
    title: 'Mobile-First Design',
    description: 'Built for your phone. Update student records anywhere, anytime.',
    color: 'text-blue-500',
  },
  {
    icon: ShieldIcon,
    title: 'Secure & Private',
    description: 'Your student data stays yours. Bank-level encryption keeps everything safe.',
    color: 'text-emerald-500',
  },
  {
    icon: LinkIcon,
    title: 'Share Payment Links',
    description: 'Send unique links to students so they can check their payment status.',
    color: 'text-violet-500',
  },
  {
    icon: ChartIcon,
    title: 'Clear Overview',
    description: 'See who paid and who is pending at a glance. No more guesswork.',
    color: 'text-orange-500',
  },
  {
    icon: ClockIcon,
    title: 'Monthly Reminders',
    description: 'Automated tracking helps you remember fee collection dates effortlessly.',
    color: 'text-pink-500',
  },
];

export default function SolutionSection() {
  return (
    <section id="features" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

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
            Meet <span className="text-primary-500">Saral</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The fee tracking platform that actually works the way you do. Simple, fast, and built for mobile.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className={`mb-4 ${feature.color}`}>
                  <IconComponent size={48} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
