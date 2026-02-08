'use client';

import { motion } from 'framer-motion';
import { StarIcon, UserIcon } from './Icons';

const testimonials = [
  {
    name: 'Rajesh Verma',
    role: 'Math Tutor, Delhi',
    initials: 'RV',
    quote: 'I used to spend 30 minutes every week tracking fees in my notebook. Now it takes me 2 minutes on my phone. Saral is a lifesaver!',
    rating: 5,
  },
  {
    name: 'Priya Deshmukh',
    role: 'Science Tutor, Mumbai',
    initials: 'PD',
    quote: 'The shared payment links are genius. Parents can check their child\'s status anytime, so no more awkward phone calls.',
    rating: 5,
  },
  {
    name: 'Amit Kulkarni',
    role: 'English Tutor, Pune',
    initials: 'AK',
    quote: 'Simple, fast, and exactly what I needed. No complicated features I will never use. Just pure tracking magic.',
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

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
            Loved by Tutors
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join hundreds of tutors who have already simplified their fee tracking.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="text-primary-500" size={20} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/20 to-violet-500/20 flex items-center justify-center text-sm font-bold text-primary-400">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          <div>
            <p className="text-4xl font-bold text-primary-500 mb-2">500+</p>
            <p className="text-slate-400">Active Tutors</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary-500 mb-2">10,000+</p>
            <p className="text-slate-400">Students Tracked</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary-500 mb-2">50,000+</p>
            <p className="text-slate-400">Payments Recorded</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary-500 mb-2">99.9%</p>
            <p className="text-slate-400">Uptime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
