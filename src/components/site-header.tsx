import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { signOut } from "@/app/(auth)/actions";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-4">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {user ? (
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">
                {t("logout")}
              </Button>
            </form>
          ) : (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/login">{t("login")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
