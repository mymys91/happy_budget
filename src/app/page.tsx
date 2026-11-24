import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PiggyBank, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  { key: "budget", icon: Wallet, tone: "bg-accent text-accent-foreground" },
  { key: "saving", icon: PiggyBank, tone: "bg-secondary text-secondary-foreground" },
  { key: "invest", icon: TrendingUp, tone: "bg-primary/15 text-primary" },
  { key: "privacy", icon: ShieldCheck, tone: "bg-muted text-foreground" },
] as const;

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 sm:py-20">
      <section className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
          {t("badge")}
        </span>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">{t("title")}</h1>
        <p className="max-w-xl text-lg text-muted-foreground">{t("subtitle")}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/signup">{t("ctaPrimary")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">{t("ctaSecondary")}</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ key, icon: Icon, tone }) => (
          <Card key={key}>
            <CardHeader className="flex-row items-start gap-4">
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                <Icon className="size-6" />
              </span>
              <div className="flex flex-col gap-1">
                <CardTitle>{t(`features.${key}.title`)}</CardTitle>
                <CardDescription>{t(`features.${key}.text`)}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
