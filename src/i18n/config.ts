/** Languages the app supports. Add a code here and a matching file in /messages to add a language. */
export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

/** Cookie that remembers the language the user picked. */
export const LOCALE_COOKIE = "hb_locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}
