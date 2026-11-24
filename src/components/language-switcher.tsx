"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { setLocale } from "@/app/actions/locale";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const current = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function choose(locale: string) {
    if (locale === current) return;
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("inline-flex rounded-full border border-border bg-card p-1", isPending && "opacity-60")}
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => choose(locale)}
          aria-pressed={locale === current}
          className={cn(
            "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-colors",
            locale === current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(locale)}
        </button>
      ))}
    </div>
  );
}
