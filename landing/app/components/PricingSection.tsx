'use client';

import { motion } from 'framer-motion';
import Button from './Button';
import { CheckIcon } from './Icons';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 students',
      'Payment tracking',
      'Mobile app access',
      'Email support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹199',
    period: 'per month',
    description: 'For serious tutors',
    features: [
      'Up to 30 students',
      'Payment tracking',
      'Shareable payment links',
      'Monthly reminders',
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹399',
    period: 'per month',
    description: 'For tuition centers',
    features: [
      'Unlimited students',
      'Everything in Pro',
      'Multi-tutor access',
      'Custom branding',
      'WhatsApp integration',
      '24/7 phone support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-slate-900/50 relative overflow-hidden">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Start free, upgrade when you are ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border ${
                plan.popular ? 'border-primary-500' : 'border-slate-700/50'
              } rounded-2xl p-8 hover:border-primary-500/50 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-slate-950 px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                </div>
                <p className="text-slate-500 text-sm">{plan.period}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon className="text-primary-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                size="lg"
                href="#get-started"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-slate-500 mt-12"
        >
          All plans include 14-day free trial - No credit card required
        </motion.p>
      </div>
    </section>
  );
}
