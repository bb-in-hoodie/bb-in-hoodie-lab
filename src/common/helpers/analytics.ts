type Gtag = (...args: unknown[]) => void;

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") {
    return;
  }
  gtag("event", eventName, params);
}
