import type {
  ConsentConfig,
  TranslationConfig,
} from "../core/types.js";

export const BUILTIN_TRANSLATIONS: Record<string, TranslationConfig> = {
  es: {
    ui: {
      banner: {
        title: "Tu privacidad, bajo tu control",
        description:
          "Usamos tecnologías necesarias para el funcionamiento del sitio. Con tu permiso, también podemos utilizar analítica y marketing.",
        accept: "Aceptar todas",
        reject: "Rechazar todas",
        configure: "Configurar",
        cookiesPolicy: "Política de cookies",
        privacyPolicy: "Política de privacidad",
        ariaLabel: "Gestión de consentimiento de privacidad",
      },
      preferences: {
        title: "Preferencias de privacidad",
        subtitle:
          "Gestiona tus permisos de almacenamiento por finalidad (LSSI art. 22.2 & RGPD).",
        save: "Guardar selección",
        acceptAll: "Permitir todas",
        rejectAll: "Rechazar opcionales",
        closeLabel: "Cerrar ventana",
        requiredBadge: "Requerida",
        optionalBadge: "Opcional",
        servicesLabel: "Servicios incluidos",
        viewServices: "Ver servicios",
        hideServices: "Ocultar servicios",
        thirdParty: "Terceros",
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Configuración y revocación de cookies",
        tooltip: "Configurar o declinar cookies",
      },
    },
    categories: {
      necessary: {
        label: "Cookies Técnicas y Necesarias",
        description:
          "Imprescindibles para que el sitio web funcione y no pueden ser desactivadas.",
      },
      analytics: {
        label: "Medición y Rendimiento",
        description:
          "Nos permiten analizar las visitas y fuentes de tráfico para optimizar el sitio.",
      },
      marketing: {
        label: "Publicidad Personalizada",
        description:
          "Utilizadas para mostrar anuncios relevantes según tus intereses y navegación.",
      },
      preferences: {
        label: "Preferencias y Personalización",
        description:
          "Permiten recordar información que cambia el aspecto o comportamiento del sitio.",
      },
    },
  },
  en: {
    ui: {
      banner: {
        title: "Your privacy, under your control",
        description:
          "We use essential technologies for our website to function. With your consent, we may also use analytics and marketing technologies.",
        accept: "Accept all",
        reject: "Reject all",
        configure: "Customize",
        cookiesPolicy: "Cookie policy",
        privacyPolicy: "Privacy policy",
        ariaLabel: "Privacy consent management",
      },
      preferences: {
        title: "Privacy Preferences",
        subtitle:
          "Manage your storage permissions by purpose (GDPR & ePrivacy compliant).",
        save: "Save preferences",
        acceptAll: "Allow all",
        rejectAll: "Reject optional",
        closeLabel: "Close dialog",
        requiredBadge: "Required",
        optionalBadge: "Optional",
        servicesLabel: "Included services",
        viewServices: "View services",
        hideServices: "Hide services",
        thirdParty: "Third-party",
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Cookie preferences and revocation",
        tooltip: "Customize or decline cookies",
      },
    },
    categories: {
      necessary: {
        label: "Strictly Necessary Cookies",
        description:
          "Essential for the website to function properly and cannot be deactivated.",
      },
      analytics: {
        label: "Performance & Analytics",
        description:
          "Help us understand visitor behavior and traffic sources to optimize performance.",
      },
      marketing: {
        label: "Targeted Advertising",
        description:
          "Used to deliver relevant ads and track campaign effectiveness across websites.",
      },
      preferences: {
        label: "Preferences & Personalization",
        description:
          "Enable the website to remember user choices like language and layout settings.",
      },
    },
  },
  ca: {
    ui: {
      banner: {
        title: "La teva privacitat, sota el teu control",
        description:
          "Utilitzem tecnologies necessàries per al funcionament del lloc. Amb el teu permís, també podem utilitzar analítica i màrqueting.",
        accept: "Acceptar-les totes",
        reject: "Rebutjar-les totes",
        configure: "Configurar",
        cookiesPolicy: "Política de cookies",
        privacyPolicy: "Política de privacitat",
        ariaLabel: "Gestió de consentiment de privacitat",
      },
      preferences: {
        title: "Preferències de privacitat",
        subtitle:
          "Gestiona els teus permisos d'emmagatzematge per finalitat (LSSI art. 22.2 & RGPD).",
        save: "Desar selecció",
        acceptAll: "Permetre-les totes",
        rejectAll: "Rebutjar opcionals",
        closeLabel: "Tancar finestra",
        requiredBadge: "Requerida",
        optionalBadge: "Opcional",
        servicesLabel: "Serveis inclosos",
        viewServices: "Veure serveis",
        hideServices: "Amagar serveis",
        thirdParty: "Tercers",
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Configuració i revocació de cookies",
        tooltip: "Configurar o declinar cookies",
      },
    },
    categories: {
      necessary: {
        label: "Cookies Tècniques i Necessàries",
        description:
          "Imprescindibles perquè el lloc web funcioni correctament i no es poden desactivar.",
      },
      analytics: {
        label: "Mesurament i Rendiment",
        description:
          "Ens permeten analitzar les visites i fonts de trànsit per optimitzar el lloc.",
      },
      marketing: {
        label: "Publicidad Personalitzada",
        description:
          "Utilitzades per mostrar anuncis rellevants segons els teus interessos i navegació.",
      },
      preferences: {
        label: "Preferències i Personalització",
        description:
          "Permeten recordar informació que canvia l'aspecte o comportament del lloc.",
      },
    },
  },
  eu: {
    ui: {
      banner: {
        title: "Zure pribatutasuna, zure kontrolpean",
        description:
          "Webguneak funtzionatzeko beharrezkoak diren teknologiak erabiltzen ditugu. Zure baimenarekin, analitika eta marketina ere erabil ditzakegu.",
        accept: "Onartu guztiak",
        reject: "Baztertu guztiak",
        configure: "Konfiguratu",
        cookiesPolicy: "Cookie politika",
        privacyPolicy: "Pribatutasun politika",
        ariaLabel: "Pribatutasun-baimenen kudeaketa",
      },
      preferences: {
        title: "Pribatutasun-hobespenak",
        subtitle:
          "Kudeatu zure biltegiratze-baimenak helburuaren arabera (RGPD).",
        save: "Gorde hautapena",
        acceptAll: "Onartu guztiak",
        rejectAll: "Baztertu aukerakoak",
        closeLabel: "Itxi leihoa",
        requiredBadge: "Beharrezkoa",
        optionalBadge: "Aukerakoa",
        servicesLabel: "Barne dauden zerbitzuak",
        viewServices: "Ikusi zerbitzuak",
        hideServices: "Ezkutatu zerbitzuak",
        thirdParty: "Hirugarrenak",
      },
      floatingBadge: {
        label: "Cookieak",
        ariaLabel: "Cookien ezarpenak eta ezeztapena",
        tooltip: "Konfiguratu edo baztertu cookieak",
      },
    },
  },
  gl: {
    ui: {
      banner: {
        title: "A túa privacidade, baixo o teu control",
        description:
          "Empregamos tecnoloxías necesarias para o funcionamento do sitio. Co teu permiso, tamén podemos utilizar analítica e márketing.",
        accept: "Aceptar todas",
        reject: "Rexeitar todas",
        configure: "Configurar",
        cookiesPolicy: "Política de cookies",
        privacyPolicy: "Política de privacidade",
        ariaLabel: "Xestión de consentimento de privacidade",
      },
      preferences: {
        title: "Preferencias de privacidade",
        subtitle:
          "Xestiona os teus permisos de almacenamento por finalidade (LSSI art. 22.2 & RGPD).",
        save: "Gardar selección",
        acceptAll: "Permitir todas",
        rejectAll: "Rexeitar opcionais",
        closeLabel: "Pechar xanela",
        requiredBadge: "Requirida",
        optionalBadge: "Opcional",
        servicesLabel: "Servizos incluídos",
        viewServices: "Ver servizos",
        hideServices: "Ocultar servizos",
        thirdParty: "Terceiros",
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Configuración e revocación de cookies",
        tooltip: "Configurar ou declinar cookies",
      },
    },
  },
};

export class I18nEngine {
  private locale: string = "es";

  constructor(defaultLocale: string = "es") {
    this.locale = defaultLocale;
  }

  setLocale(locale: string): void {
    this.locale = locale.toLowerCase();
  }

  getLocale(): string {
    return this.locale;
  }

  detectBrowserLocale(supportedLocales?: string[]): string {
    if (typeof navigator !== "undefined" && navigator.language) {
      const detected = navigator.language.split("-")[0].toLowerCase();
      if (supportedLocales && supportedLocales.length > 0) {
        const normalized = supportedLocales.map((l) => l.toLowerCase());
        if (normalized.includes(detected)) {
          return detected;
        }
        return normalized[0];
      }
      return detected;
    }
    return "es";
  }

  isLocaleSupported(locale: string, config?: ConsentConfig): boolean {
    const clean = locale.toLowerCase();
    if (config?.locale?.supported && config.locale.supported.length > 0) {
      return config.locale.supported.map((s) => s.toLowerCase()).includes(clean);
    }
    if (config?.translations && config.translations[clean]) {
      return true;
    }
    if (BUILTIN_TRANSLATIONS[clean]) {
      return true;
    }
    return clean === (config?.locale?.default || "es").toLowerCase();
  }

  detectParentLocale(config?: ConsentConfig): string {
    const supported = config?.locale?.supported;
    const defaultLocale = (config?.locale?.default || "es").toLowerCase();

    // 1. Sync with parent application's <html lang="..."> tag (unless explicitly disabled)
    if (config?.locale?.syncHtmlLang !== false && typeof document !== "undefined" && document.documentElement) {
      const htmlLang = document.documentElement.lang;
      if (htmlLang && htmlLang.trim().length > 0) {
        const clean = htmlLang.split("-")[0].toLowerCase().trim();
        if (this.isLocaleSupported(clean, config)) {
          return clean;
        }
      }
    }

    // 2. Sync with parent application's URL path (/en/...) or query (?lang=en, ?locale=en)
    if (config?.locale?.syncUrl !== false && typeof window !== "undefined" && window.location) {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      if (pathSegments.length > 0) {
        const potentialLang = pathSegments[0].toLowerCase();
        if (this.isLocaleSupported(potentialLang, config)) {
          return potentialLang;
        }
      }
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const queryLang = (urlParams.get("lang") || urlParams.get("locale"))?.toLowerCase();
        if (queryLang && this.isLocaleSupported(queryLang, config)) {
          return queryLang;
        }
      } catch {}
    }

    // 3. Auto-detect from browser navigator
    if (config?.locale?.autoDetect) {
      return this.detectBrowserLocale(supported);
    }

    return defaultLocale;
  }

  startParentSync(
    config: ConsentConfig,
    onLocaleChange: (newLocale: string) => void,
  ): () => void {
    const cleanups: (() => void)[] = [];

    // 1. Observe <html lang="..."> attribute changes made by parent framework (Next.js, React, Angular, etc.)
    if (
      config.locale?.syncHtmlLang !== false &&
      typeof document !== "undefined" &&
      typeof MutationObserver !== "undefined" &&
      document.documentElement
    ) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "attributes" && mutation.attributeName === "lang") {
            const rawLang = document.documentElement.lang;
            if (rawLang && rawLang.trim().length > 0) {
              const clean = rawLang.split("-")[0].toLowerCase().trim();
              if (this.isLocaleSupported(clean, config) && clean !== this.locale) {
                onLocaleChange(clean);
              }
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });

      cleanups.push(() => observer.disconnect());
    }

    // 2. Listen to system language changes if autoDetect is enabled
    if (config.locale?.autoDetect && typeof window !== "undefined") {
      const handleLangChange = () => {
        const detected = this.detectBrowserLocale(config.locale?.supported);
        if (detected !== this.locale) {
          onLocaleChange(detected);
        }
      };

      window.addEventListener("languagechange", handleLangChange);
      cleanups.push(() => window.removeEventListener("languagechange", handleLangChange));
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }

  resolveConfig(config: ConsentConfig, targetLocale?: string): ConsentConfig {
    const baseLocale = (config.locale?.default || "es").toLowerCase();
    const locale = (targetLocale || this.locale || baseLocale).toLowerCase();

    // Deep clone base config so we don't mutate original configuration
    const resolved: ConsentConfig = JSON.parse(JSON.stringify(config));

    // 1. Overlay built-in dictionary if available (es, en, ca, eu, gl)
    const builtin = BUILTIN_TRANSLATIONS[locale];
    if (builtin) {
      const isBaseLocale = locale === baseLocale;
      this.applyTranslation(resolved, builtin, !isBaseLocale);
    }

    // 2. Overlay user custom translation from config.translations[locale] if defined (takes precedence)
    const custom = config.translations?.[locale];
    if (custom) {
      this.applyTranslation(resolved, custom, true);
    }

    return resolved;
  }

  private applyTranslation(
    target: ConsentConfig,
    translation: TranslationConfig,
    overwriteExisting: boolean,
  ): void {
    // Policy links
    if (translation.policy) {
      if (!target.policy) target.policy = {};
      if (translation.policy.privacyUrl && (overwriteExisting || !target.policy.privacyUrl)) {
        target.policy.privacyUrl = translation.policy.privacyUrl;
      }
      if (translation.policy.cookiesUrl && (overwriteExisting || !target.policy.cookiesUrl)) {
        target.policy.cookiesUrl = translation.policy.cookiesUrl;
      }
    }

    // UI elements
    if (translation.ui) {
      if (!target.ui) target.ui = {};

      // Banner
      if (translation.ui.banner) {
        if (!target.ui.banner) target.ui.banner = {};
        for (const [key, value] of Object.entries(this.filterDefined(translation.ui.banner))) {
          if (overwriteExisting || !(target.ui.banner as any)[key]) {
            (target.ui.banner as any)[key] = value;
          }
        }
      }

      // Preferences
      if (translation.ui.preferences) {
        if (!target.ui.preferences) target.ui.preferences = {};
        for (const [key, value] of Object.entries(this.filterDefined(translation.ui.preferences))) {
          if (overwriteExisting || !(target.ui.preferences as any)[key]) {
            (target.ui.preferences as any)[key] = value;
          }
        }
      }

      // Floating Badge
      if (translation.ui.floatingBadge) {
        if (typeof target.ui.floatingBadge === "object" && target.ui.floatingBadge !== null) {
          for (const [key, value] of Object.entries(this.filterDefined(translation.ui.floatingBadge))) {
            if (overwriteExisting || !(target.ui.floatingBadge as any)[key]) {
              (target.ui.floatingBadge as any)[key] = value;
            }
          }
        } else if (target.ui.floatingBadge === true) {
          target.ui.floatingBadge = {
            enabled: true,
            position: "bottom-left",
            icon: "cookie",
            ...this.filterDefined(translation.ui.floatingBadge),
          };
        }
      }
    }

    // Categories
    if (translation.categories && target.categories) {
      for (const [catId, catTrans] of Object.entries(translation.categories)) {
        if (target.categories[catId]) {
          if (catTrans.label && (overwriteExisting || !target.categories[catId].label)) {
            target.categories[catId].label = catTrans.label;
          }
          if (catTrans.description && (overwriteExisting || !target.categories[catId].description)) {
            target.categories[catId].description = catTrans.description;
          }
        }
      }
    }

    // Services
    if (translation.services && target.services) {
      for (const [srvId, srvTrans] of Object.entries(translation.services)) {
        if (target.services[srvId]) {
          if (srvTrans.label && (overwriteExisting || !target.services[srvId].label)) {
            target.services[srvId].label = srvTrans.label;
          }
          if (srvTrans.provider && (overwriteExisting || !target.services[srvId].provider)) {
            target.services[srvId].provider = srvTrans.provider;
          }
        }
      }
    }
  }

  private filterDefined<T extends Record<string, any>>(obj: T): Partial<T> {
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        result[key as keyof T] = value;
      }
    }
    return result;
  }
}
