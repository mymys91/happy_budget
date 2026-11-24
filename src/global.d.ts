import type en from "../messages/en.json";
import type { Locale } from "@/i18n/config";

// Makes translation keys type-checked: a typo in t("...") becomes a build error.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof en;
  }
}
