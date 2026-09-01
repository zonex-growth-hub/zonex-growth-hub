// Declare global tracking functions for TypeScript
export type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: AnalyticsParams) => void;
    gtag?: (command: string, action: string, params?: AnalyticsParams) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Safe trigger for Meta Pixel (fbq)
 */
export function trackMetaEvent(eventName: string, params?: AnalyticsParams) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    }
  } catch (err) {
    console.debug('[Analytics] Meta Pixel track error:', err);
  }
}

/**
 * Safe trigger for Google Analytics (gtag)
 */
export function trackGoogleEvent(action: string, params?: AnalyticsParams) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', action, params);
    }
  } catch (err) {
    console.debug('[Analytics] Google Analytics track error:', err);
  }
}

/**
 * Standardized High-Level Conversion Trackers for ZoneX Growth Agency
 */
export const analytics = {
  // Lead Event (e.g. Audit Claim, Contact Submission)
  trackLead(label: string = 'Apply for Audit', metaData?: AnalyticsParams) {
    trackMetaEvent('Lead', { content_name: label, ...metaData });
    trackGoogleEvent('claim_audit_click', { event_category: 'CTA', event_label: label, ...metaData });
  },

  // ViewContent Event (e.g. Portfolio Exploration, Case Studies)
  trackViewContent(contentName: string = 'Portfolio Showcase', metaData?: AnalyticsParams) {
    trackMetaEvent('ViewContent', { content_name: contentName, ...metaData });
    trackGoogleEvent('portfolio_click', { event_category: 'Engagement', event_label: contentName, ...metaData });
  },

  // InitiateCheckout Event (e.g. ROI Calculator, Strategy Booking)
  trackInitiateCheckout(service: string = 'ROI Calculator', metaData?: AnalyticsParams) {
    trackMetaEvent('InitiateCheckout', { content_name: service, ...metaData });
    trackGoogleEvent('roi_calculator_click', { event_category: 'Conversion', event_label: service, ...metaData });
  },

  // Contact Event (e.g. Form Submission, WhatsApp / Call Click)
  trackContact(channel: string = 'Contact Form', metaData?: AnalyticsParams) {
    trackMetaEvent('Contact', { content_name: channel, ...metaData });
    trackGoogleEvent('contact_submit', { event_category: 'Lead', event_label: channel, ...metaData });
  },

  // Custom Event
  trackCustom(eventName: string, params?: AnalyticsParams) {
    trackMetaEvent(eventName, params);
    trackGoogleEvent(eventName, params);
  },
};
