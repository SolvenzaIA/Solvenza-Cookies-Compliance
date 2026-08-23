export class I18nEngine {
  private locale = "es";

  setLocale(locale: string): void {
    this.locale = locale;
  }

  getLocale(): string {
    return this.locale;
  }

  detectBrowserLocale(): string {
    if (typeof navigator !== "undefined" && navigator.language) {
      return navigator.language.split("-")[0].toLowerCase();
    }
    return "es";
  }
}
