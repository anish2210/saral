import { useState, useEffect } from 'react';
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

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-slide-up">
      <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-sm text-gray-600 flex-1">
          We use cookies to understand how you use our app and improve your experience.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
