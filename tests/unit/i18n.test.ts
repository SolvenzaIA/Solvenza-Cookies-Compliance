import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { I18nEngine, BUILTIN_TRANSLATIONS } from "../../src/i18n/engine.js";
import { ConsentEngine } from "../../src/core/consent-engine.js";
import { ConsentConfigBuilder } from "../../src/core/builder/config-builder.js";
import type { ConsentConfig } from "../../src/core/types.js";

class MockElement {
  tagName: string;
  private _className: string = "";
  get className(): string {
    return this._className;
  }
  set className(val: string) {
    this._className = val;
    this.classList._classes = new Set(val.split(" ").filter(Boolean));
  }
  lang: string = "";
  innerHTML: string = "";
  attributes: Record<string, string> = {};
  children: MockElement[] = [];
  parentNode: MockElement | null = null;
  classList = {
    _classes: new Set<string>(),
    add: (...cls: string[]) => {
      cls.forEach((c) => this.classList._classes.add(c));
      this._className = Array.from(this.classList._classes).join(" ");
    },
    remove: (...cls: string[]) => {
      cls.forEach((c) => this.classList._classes.delete(c));
      this._className = Array.from(this.classList._classes).join(" ");
    },
    contains: (cls: string) => this.classList._classes.has(cls),
  };
  private listeners: Record<string, ((e: any) => void)[]> = {};

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(name: string, val: string) {
    this.attributes[name] = val;
  }

  getAttribute(name: string) {
    return this.attributes[name] || null;
  }

  appendChild(child: MockElement) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  removeChild(child: MockElement) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentNode = null;
    }
    return child;
  }

  addEventListener(event: string, fn: (e: any) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }

  click() {
    let defaultPrevented = false;
    const evt = {
      type: "click",
      target: this,
      preventDefault: () => {
        defaultPrevented = true;
      },
    };
    (this.listeners["click"] || []).forEach((fn) => fn(evt));
  }

  querySelector(selector: string): MockElement | null {
    if (selector.startsWith("#")) {
      const id = selector.slice(1);
      if (this.attributes["id"] === id || this.innerHTML.includes(`id="${id}"`)) {
        return this;
      }
    }
    for (const child of this.children) {
      if (selector.startsWith(".") && child.classList.contains(selector.slice(1))) {
        return child;
      }
      if (selector.startsWith("#") && child.attributes["id"] === selector.slice(1)) {
        return child;
      }
      const found = child.querySelector(selector);
      if (found) return found;
    }
    return null;
  }

  querySelectorAll(): MockElement[] {
    return [];
  }
}

describe("I18nEngine Unit Tests", () => {
  let engine: I18nEngine;

  const baseConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "1.0.0",
    policy: {
      cookiesUrl: "/cookies-es",
      privacyUrl: "/privacidad-es",
    },
    categories: {
      necessary: {
        required: true,
        label: "Necesarias Base",
        description: "Descripción base necesarias",
      },
      analytics: {
        required: false,
        label: "Analítica Base",
        description: "Descripción base analítica",
      },
    },
    ui: {
      banner: {
        title: "Título Base",
        accept: "Aceptar Base",
      },
      preferences: {
        title: "Preferencias Base",
      },
      floatingBadge: {
        enabled: true,
        label: "Cookies",
      },
    },
    translations: {
      en: {
        policy: {
          cookiesUrl: "/cookies-en",
        },
        ui: {
          banner: {
            title: "Custom English Title",
          },
          floatingBadge: {
            label: "Privacy Choices",
          },
        },
        categories: {
          analytics: {
            label: "Custom Analytics Label",
          },
        },
      },
      fr: {
        ui: {
          banner: {
            title: "Titre en Français",
            accept: "J'accepte",
          },
        },
      },
    },
  };

  beforeEach(() => {
    engine = new I18nEngine("es");
  });

  it("should have built-in dictionaries for es, en, ca, eu, gl", () => {
    expect(BUILTIN_TRANSLATIONS.es).toBeDefined();
    expect(BUILTIN_TRANSLATIONS.en).toBeDefined();
    expect(BUILTIN_TRANSLATIONS.ca).toBeDefined();
    expect(BUILTIN_TRANSLATIONS.eu).toBeDefined();
    expect(BUILTIN_TRANSLATIONS.gl).toBeDefined();
  });

  it("should resolve base config when locale is default (es)", () => {
    const resolved = engine.resolveConfig(baseConfig, "es");
    expect(resolved.ui?.banner?.title).toBe("Título Base");
    expect(resolved.policy?.cookiesUrl).toBe("/cookies-es");
  });

  it("should overlay user custom translations over built-in translations for en", () => {
    const resolved = engine.resolveConfig(baseConfig, "en");

    // Custom overrides
    expect(resolved.ui?.banner?.title).toBe("Custom English Title");
    expect(resolved.policy?.cookiesUrl).toBe("/cookies-en");
    expect(resolved.ui?.floatingBadge).toBeDefined();
    if (typeof resolved.ui?.floatingBadge === "object") {
      expect(resolved.ui.floatingBadge.label).toBe("Privacy Choices");
    }
    expect(resolved.categories.analytics.label).toBe("Custom Analytics Label");

    // Built-in English fallback for fields not explicitly defined in custom translation
    expect(resolved.ui?.banner?.reject).toBe(BUILTIN_TRANSLATIONS.en.ui?.banner?.reject);
    expect(resolved.ui?.preferences?.save).toBe(BUILTIN_TRANSLATIONS.en.ui?.preferences?.save);

    // Fallback to base config for missing policy links
    expect(resolved.policy?.privacyUrl).toBe("/privacidad-es");
  });

  it("should resolve custom locale without built-in dictionary (fr)", () => {
    const resolved = engine.resolveConfig(baseConfig, "fr");
    expect(resolved.ui?.banner?.title).toBe("Titre en Français");
    expect(resolved.ui?.banner?.accept).toBe("J'accepte");
    // Fallback to base config
    expect(resolved.categories.necessary.label).toBe("Necesarias Base");
  });

  it("should detect browser locale correctly", () => {
    const nav = (globalThis as any).navigator || {};
    if (!(globalThis as any).navigator) {
      try {
        Object.defineProperty(globalThis, "navigator", {
          value: nav,
          configurable: true,
          writable: true,
        });
      } catch {
        (globalThis as any).navigator = nav;
      }
    }

    const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis.navigator, "language");

    try {
      Object.defineProperty(globalThis.navigator, "language", {
        value: "en-US",
        configurable: true,
        writable: true,
      });
    } catch {
      (globalThis.navigator as any).language = "en-US";
    }
    expect(engine.detectBrowserLocale(["es", "en"])).toBe("en");

    try {
      Object.defineProperty(globalThis.navigator, "language", {
        value: "de-DE",
        configurable: true,
        writable: true,
      });
    } catch {
      (globalThis.navigator as any).language = "de-DE";
    }
    // Not in supported list -> falls back to first supported
    expect(engine.detectBrowserLocale(["es", "en"])).toBe("es");

    if (originalDescriptor) {
      try {
        Object.defineProperty(globalThis.navigator, "language", originalDescriptor);
      } catch {}
    }
  });
});

class MockMutationObserver {
  static instances: MockMutationObserver[] = [];
  cb: (mutations: any[]) => void;
  constructor(cb: (mutations: any[]) => void) {
    this.cb = cb;
    MockMutationObserver.instances.push(this);
  }
  observe() {}
  disconnect() {
    MockMutationObserver.instances = MockMutationObserver.instances.filter((i) => i !== this);
  }
  trigger(mutations: any[]) {
    this.cb(mutations);
  }
}

describe("ConsentEngine i18n Integration", () => {
  let engine: ConsentEngine;
  const originalDoc = (globalThis as any).document;
  const originalMutationObserver = (globalThis as any).MutationObserver;

  const testConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-08-22",
    locale: {
      default: "es",
      syncHtmlLang: true,
      supported: ["es", "en", "ca", "eu", "gl"],
    },
    storage: { type: "memory" },
    categories: {
      necessary: { required: true, label: "Necesarias", description: "Imprescindibles" },
      analytics: { required: false, label: "Analítica", description: "Medición" },
    },
    ui: {
      banner: {
        title: "Control de Cookies",
        accept: "Aceptar",
        reject: "Rechazar",
      },
      floatingBadge: {
        enabled: true,
        label: "Cookies",
      },
    },
    translations: {
      en: {
        ui: {
          banner: {
            title: "Cookie Control",
            accept: "Accept",
          },
          floatingBadge: {
            label: "Cookie Settings",
          },
        },
      },
      ca: {
        ui: {
          banner: {
            title: "Control de Galetes",
            accept: "Acceptar",
          },
        },
      },
    },
  };

  beforeEach(() => {
    MockMutationObserver.instances = [];
    (globalThis as any).MutationObserver = MockMutationObserver;

    const body = new MockElement("BODY");
    const head = new MockElement("HEAD");
    (globalThis as any).document = {
      body,
      head,
      documentElement: body,
      createElement: (tag: string) => new MockElement(tag),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
    engine = new ConsentEngine();
  });

  afterEach(() => {
    (globalThis as any).document = originalDoc;
    (globalThis as any).MutationObserver = originalMutationObserver;
  });

  it("should initialize with default locale and allow switching locale dynamically", async () => {
    await engine.init(testConfig);
    expect(engine.getLocale()).toBe("es");
    expect(engine.getConsent().locale).toBe("es");

    let changedEvent: { locale: string; previousLocale: string } | null = null;
    engine.on("locale:changed", (detail) => {
      changedEvent = detail;
    });

    engine.setLocale("en");

    expect(engine.getLocale()).toBe("en");
    expect(engine.getConsent().locale).toBe("en");
    expect(changedEvent).toEqual({
      locale: "en",
      previousLocale: "es",
    });
  });

  it("should sync locale via syncLocale method", async () => {
    await engine.init(testConfig);
    expect(engine.getLocale()).toBe("es");

    engine.syncLocale("en");
    expect(engine.getLocale()).toBe("en");
    expect(engine.getConsent().locale).toBe("en");
  });

  it("should automatically detect parent <html lang> on init without boilerplate", async () => {
    (globalThis as any).document.documentElement.lang = "en";
    await engine.init(testConfig);
    expect(engine.getLocale()).toBe("en");
    expect(engine.getConsent().locale).toBe("en");
  });

  it("should automatically synchronize when parent app changes <html lang> via MutationObserver", async () => {
    await engine.init(testConfig);
    expect(engine.getLocale()).toBe("es");

    // Parent application (e.g. Next.js, React, or Angular) changes <html lang="ca">
    (globalThis as any).document.documentElement.lang = "ca";

    // MutationObserver detects attribute change
    MockMutationObserver.instances.forEach((obs) => {
      obs.trigger([{ type: "attributes", attributeName: "lang" }]);
    });

    expect(engine.getLocale()).toBe("ca");
    expect(engine.getConsent().locale).toBe("ca");
  });

  it("should re-render banner with new translations when locale changes", async () => {
    await engine.init(testConfig);

    const findBanner = () =>
      (globalThis as any).document.body.children.find((c: any) =>
        c.classList.contains("consent-banner-wrapper"),
      );

    const bannerWrapper = findBanner();
    expect(bannerWrapper).toBeDefined();
    expect(bannerWrapper.innerHTML).toContain("Control de Cookies");

    engine.setLocale("en");

    // Banner was re-rendered with English translation
    const updatedBanner = findBanner();
    expect(updatedBanner).toBeDefined();
    expect(updatedBanner.innerHTML).toContain("Cookie Control");
  });

  it("should support ConsentConfigBuilder translation methods", () => {
    const builder = new ConsentConfigBuilder("2.0.0")
      .setLocale("es", false, ["es", "en"])
      .setTranslations({
        en: {
          ui: {
            banner: { title: "Builder English Title" },
          },
        },
      })
      .addTranslation("ca", {
        ui: {
          banner: { title: "Builder Catalan Title" },
        },
      });

    const config = builder.build();
    expect(config.translations?.en.ui?.banner?.title).toBe("Builder English Title");
    expect(config.translations?.ca.ui?.banner?.title).toBe("Builder Catalan Title");
  });
});

