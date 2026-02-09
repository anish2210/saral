'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateConsent } from '../lib/gtm';

const CONSENT_KEY = 'saral_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    updateConsent(true);
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    updateConsent(false);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
        >
          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-slate-300 flex-1">
              We use cookies to understand how you use our site and improve your experience.
              No personal data is sold.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium text-slate-950 bg-primary-500 hover:bg-primary-400 rounded-lg transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
