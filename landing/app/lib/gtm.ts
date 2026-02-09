type GTMEvent = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

type DataLayer = (Record<string, unknown> | string)[];

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

export function trackCTAClick(ctaName: string) {
  pushEvent({
    event: 'cta_click',
    cta_name: ctaName,
    app_section: 'landing',
  });
}

export function trackScrollDepth(percentage: number) {
  pushEvent({
    event: 'scroll_depth',
    depth: percentage,
    app_section: 'landing',
  });
}

export function trackOutboundClick(url: string, label: string) {
  pushEvent({
    event: 'outbound_link_click',
    link_url: url,
    link_label: label,
    app_section: 'landing',
  });
}

export function updateConsent(granted: boolean) {
  getDataLayer().push(
    'consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    }
  );
}
