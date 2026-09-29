import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { FloatingBadge } from "../../src/ui/floating-badge.js";
import { ConsentEngine } from "../../src/core/consent-engine.js";
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

  private _cachedQueries: Record<string, MockElement> = {};

  querySelector(selector: string): MockElement | null {
    if (this._cachedQueries[selector]) {
      return this._cachedQueries[selector];
    }
    if (selector.startsWith("#")) {
      const id = selector.slice(1);
      if (this.attributes["id"] === id || this.innerHTML.includes(`id="${id}"`)) {
        return this;
      }
    }
    if (selector.startsWith(".")) {
      const cls = selector.slice(1);
      if (this.classList.contains(cls)) {
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
    if (selector.startsWith(".") && this.innerHTML.includes(selector.slice(1))) {
      const child = new MockElement("div");
      child.className = selector.slice(1);
      this.children.push(child);
      child.parentNode = this;
      this._cachedQueries[selector] = child;
      return child;
    }
    if (selector.startsWith("#") && this.innerHTML.includes(selector.slice(1))) {
      const child = new MockElement("div");
      child.setAttribute("id", selector.slice(1));
      this.children.push(child);
      child.parentNode = this;
      this._cachedQueries[selector] = child;
      return child;
    }
    return null;
  }

  querySelectorAll(): MockElement[] {
    return [];
  }
}

describe("FloatingBadge Component", () => {
  let badge: FloatingBadge;
  const originalDoc = (globalThis as any).document;

  beforeEach(() => {
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
    badge = new FloatingBadge();
  });

  afterEach(() => {
    (globalThis as any).document = originalDoc;
  });

  it("should render floating badge in the DOM with default settings", () => {
    let clicked = false;
    const config: ConsentConfig = {
      schemaVersion: 1,
      policyVersion: "2026-08-22",
      categories: {
        necessary: { required: true, label: "Necesarias", description: "Imprescindibles" },
      },
      ui: {
        floatingBadge: true,
      },
    };

    badge.render(config, {
      onClick: () => {
        clicked = true;
      },
    });

    const el = (globalThis as any).document.body.children[0];
    expect(el).toBeDefined();
    expect(el.classList.contains("consent-floating-badge")).toBe(true);
    expect(el.classList.contains("consent-floating-badge--bottom-left")).toBe(true);

    badge.show();
    expect(el.classList.contains("is-visible")).toBe(true);
    expect(badge.getIsVisible()).toBe(true);

    badge.hide();
    expect(el.classList.contains("is-visible")).toBe(false);
    expect(badge.getIsVisible()).toBe(false);

    badge.remove();
    expect((globalThis as any).document.body.children.length).toBe(0);
  });

  it("should support custom position, label, and visibility toggle", () => {
    const config: ConsentConfig = {
      schemaVersion: 1,
      policyVersion: "2026-08-22",
      categories: {
        necessary: { required: true, label: "Necesarias", description: "Imprescindibles" },
      },
      ui: {
        floatingBadge: {
          enabled: true,
          position: "bottom-right",
          label: "Cookies",
          showLabel: true,
          icon: "shield",
        },
      },
    };

    badge.render(config, { onClick: () => {} });
    const el = (globalThis as any).document.body.children[0];
    expect(el.classList.contains("consent-floating-badge--bottom-right")).toBe(true);
    expect(el.innerHTML).toContain("Cookies");
    expect(el.innerHTML).toContain("has-label");
  });
});

describe("ConsentEngine with FloatingBadge Integration", () => {
  let engine: ConsentEngine;
  const originalDoc = (globalThis as any).document;

  const testConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-08-22",
    storage: { type: "memory" },
    categories: {
      necessary: { required: true, label: "Necesarias", description: "Imprescindibles" },
      analytics: { required: false, label: "Analítica", description: "Medición" },
    },
    ui: {
      floatingBadge: {
        enabled: true,
        position: "bottom-left",
        label: "Configurar cookies",
      },
    },
  };

  beforeEach(() => {
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
  });

  it("should show floating badge upon acceptAll() and emit events", async () => {
    let shownEventFired = false;
    let hiddenEventFired = false;

    engine.on("floating-badge:shown", () => {
      shownEventFired = true;
    });
    engine.on("floating-badge:hidden", () => {
      hiddenEventFired = true;
    });

    await engine.init(testConfig);
    expect(shownEventFired).toBe(false);

    // Accept choices -> banner removes and badge shows
    engine.acceptAll();
    expect(shownEventFired).toBe(true);

    // Programmatic hide
    engine.hideFloatingBadge();
    expect(hiddenEventFired).toBe(true);
  });

  it("should hide floating badge on withdraw() when banner is reopened", async () => {
    await engine.init(testConfig);
    engine.acceptAll();

    let hiddenEventFired = false;
    engine.on("floating-badge:hidden", () => {
      hiddenEventFired = true;
    });

    engine.withdraw();
    expect(hiddenEventFired).toBe(true);
  });

  it("should hide floating badge when preferences modal is opened and restore it when closed", async () => {
    await engine.init(testConfig);
    engine.acceptAll(); // badge is now shown

    let hiddenFired = false;
    let shownCount = 0;
    engine.on("floating-badge:hidden", () => {
      hiddenFired = true;
    });
    engine.on("floating-badge:shown", () => {
      shownCount++;
    });

    // Open preferences -> badge hides
    engine.openPreferences();
    expect(hiddenFired).toBe(true);

    // Close preferences -> badge shows again!
    engine.closePreferences();
    expect(shownCount).toBeGreaterThan(0);
  });

  it("should re-show floating badge when modal emits preferences:closed event", async () => {
    await engine.init(testConfig);
    engine.acceptAll();

    let closedEventFired = false;
    engine.on("preferences:closed", () => {
      closedEventFired = true;
    });

    engine.openPreferences();
    engine.closePreferences();

    expect(closedEventFired).toBe(true);
  });

  it("should re-show floating badge when modal close button 'X' is clicked in DOM", async () => {
    await engine.init(testConfig);
    engine.acceptAll();

    engine.openPreferences();

    const backdrop = (globalThis as any).document.body.children.find((c: any) =>
      c.classList.contains("consent-dialog-backdrop"),
    );
    expect(backdrop).toBeDefined();

    let shownEventFired = false;
    engine.on("floating-badge:shown", () => {
      shownEventFired = true;
    });

    const closeBtn = backdrop.querySelector(".consent-dialog-close");
    expect(closeBtn).toBeDefined();
    closeBtn.click();

    expect(shownEventFired).toBe(true);
  });
});
