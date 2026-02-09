type GTMEvent = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataLayer = any[];

declare global {
  interface Window {
    dataLayer: DataLayer;
  }
}

function getDataLayer(): DataLayer {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function pushEvent(data: GTMEvent) {
  getDataLayer().push(data);
}

export function trackSignupStarted(method: string) {
  pushEvent({
    event: 'signup_started',
    method,
    app_section: 'client',
  });
}

export function trackSignupCompleted(method: string) {
  pushEvent({
    event: 'signup_completed',
    method,
    app_section: 'client',
  });
}

export function trackLoginSuccess(method: string) {
  pushEvent({
    event: 'login_success',
    method,
    app_section: 'client',
  });
}

export function trackActivationComplete() {
  pushEvent({
    event: 'activation_complete',
    app_section: 'client',
  });
}

export function trackDashboardView() {
  pushEvent({
    event: 'dashboard_view',
    app_section: 'client',
  });
}

export function updateConsent(granted: boolean) {
  getDataLayer().push(
    'consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    }
  );
}
