'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: 'Do I need any technical knowledge to use Saral?',
    answer: 'Not at all! Saral is designed to be as simple as WhatsApp. If you can use your smartphone, you can use Saral.',
  },
  {
    question: 'Does Saral process payments?',
    answer: 'No. Saral only helps you track payment status. You collect fees the way you always have - cash, UPI, bank transfer. Saral just helps you remember who paid.',
  },
  {
    question: 'Can students see each other\'s information?',
    answer: 'No. Each student gets a unique private link that shows only their payment status. Complete privacy guaranteed.',
  },
  {
    question: 'What if I have more than 30 students?',
    answer: 'Our Premium plan supports unlimited students and is perfect for tuition centers or tutors with large batches.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! Cancel anytime with no questions asked. Your data remains accessible even after cancellation.',
  },
  {
    question: 'Is my data safe and secure?',
    answer: 'Absolutely. We use bank-level encryption and store data on secure servers. Your student information is never shared with anyone.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes. If you are not satisfied within the first 14 days, we will refund your money, no questions asked.',
  },
  {
    question: 'Can I use Saral on multiple devices?',
    answer: 'Yes! Use Saral on your phone, tablet, and computer. Your data syncs automatically across all devices.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
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
            Common Questions
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to know about Saral.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl p-6 text-left hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white flex-1">
                    {faq.question}
                  </h3>
                  <span
                    className={`text-primary-500 text-2xl transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-400 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8"
        >
          <p className="text-lg text-slate-300 mb-4">Still have questions?</p>
          <p className="text-slate-400 mb-6">
            We are here to help! Reach out to our support team anytime.
          </p>
          <a
            href="mailto:support@saral.space"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 transition-all duration-200 min-h-[48px]"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
