'use client';

import { motion } from 'framer-motion';

const footerLinks = {
  Product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'FAQ', href: '#faq' },
  ],
  Company: [
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' },
    { name: 'Careers', href: '#careers' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'Refund Policy', href: '#refunds' },
  ],
  Support: [
    { name: 'Help Center', href: '#help' },
    { name: 'Documentation', href: '#docs' },
    { name: 'System Status', href: '#status' },
    { name: 'Contact Support', href: 'mailto:support@saral.app' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 border-t border-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3
                className="text-2xl font-bold text-primary-500 mb-3"
                style={{ fontFamily: 'var(--font-clash-display)' }}
              >
                Saral
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Fee tracking made simple for tutors across India.
              </p>
              <div className="flex gap-4">
                <a
                  href="#twitter"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-xl">𝕏</span>
                </a>
                <a
                  href="#linkedin"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-xl">in</span>
                </a>
                <a
                  href="#instagram"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary-500 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Saral. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Made with ❤️ for Indian Tutors
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
