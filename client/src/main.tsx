import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// --- Consent Mode defaults (must fire before GTM) ---
window.dataLayer = window.dataLayer || [];
function gtag(...args: unknown[]) { window.dataLayer.push(args); }
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

// --- Google Tag Manager ---
const GTM_ID = import.meta.env.VITE_GTM_ID;
if (GTM_ID) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
