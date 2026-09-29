/**
 * Initialize consent engine in Next.js applications (Pages or App Router).
 * If initialLocale is provided, it synchronizes immediately.
 * Otherwise, it automatically detects the parent locale from <html lang> or route params.
 */
declare function initNextConsent(configUrl?: string, initialLocale?: string): void;

export { initNextConsent };
