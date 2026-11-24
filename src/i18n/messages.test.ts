import { describe, expect, it } from "vitest";

import en from "../../messages/en.json";
import vi from "../../messages/vi.json";
import { defaultLocale, isLocale, resolveLocale } from "./config";

/** Lists every nested key, e.g. "auth.login.title". */
function flattenKeys(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object" ? flattenKeys(value, path) : [path];
  });
}

describe("translations", () => {
  it("English and Vietnamese have exactly the same keys", () => {
    expect(flattenKeys(vi).sort()).toEqual(flattenKeys(en).sort());
  });

  it("has no empty texts", () => {
    for (const messages of [en, vi]) {
      const empty = flattenKeys(messages).filter((key) => {
        const value = key.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown>)[part], messages);
        return typeof value !== "string" || value.trim() === "";
      });
      expect(empty).toEqual([]);
    }
  });
});

describe("locale config", () => {
  it("accepts supported locales", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("falls back to the default for unknown values", () => {
    expect(resolveLocale("fr")).toBe(defaultLocale);
    expect(resolveLocale(undefined)).toBe(defaultLocale);
  });
});
