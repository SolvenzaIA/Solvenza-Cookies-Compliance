// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { CookieStore } from "../../src/storage/cookie-store.js";

describe("CookieStore Subdomain / Wildcard Support", () => {
  it("should format cookie string with Domain attribute when domain is supplied", () => {
    let lastSetCookie = "";
    Object.defineProperty(document, "cookie", {
      get: () => lastSetCookie,
      set: (val) => {
        lastSetCookie = val;
      },
      configurable: true,
    });

    CookieStore.set("site_consent", "test_payload", {
      path: "/",
      domain: ".ejemplo.com",
    });

    expect(lastSetCookie).toContain("Domain=.ejemplo.com");
    expect(lastSetCookie).toContain("Path=/");
  });
});
