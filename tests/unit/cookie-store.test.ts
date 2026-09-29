import { describe, it, expect, afterEach } from "vitest";
import { CookieStore } from "../../src/storage/cookie-store.js";

describe("CookieStore Subdomain / Wildcard Support", () => {
  const originalDoc = (globalThis as any).document;

  afterEach(() => {
    (globalThis as any).document = originalDoc;
  });

  it("should format cookie string with Domain attribute when domain is supplied", () => {
    let lastSetCookie = "";
    (globalThis as any).document = {
      get cookie() {
        return lastSetCookie;
      },
      set cookie(val: string) {
        lastSetCookie = val;
      },
    };

    CookieStore.set("site_consent", "test_payload", {
      path: "/",
      domain: ".ejemplo.com",
    });

    expect(lastSetCookie).toContain("Domain=.ejemplo.com");
    expect(lastSetCookie).toContain("Path=/");
  });
});
