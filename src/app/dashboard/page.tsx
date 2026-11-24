import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PiggyBank, TrendingUp, Wallet } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dashboard");
  return { title: t("title") };
}

const SECTIONS = [
  { key: "budget", icon: Wallet, tone: "bg-accent text-accent-foreground" },
  { key: "saving", icon: PiggyBank, tone: "bg-secondary text-secondary-foreground" },
  { key: "invest", icon: TrendingUp, tone: "bg-primary/15 text-primary" },
] as const;

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Row Level Security guarantees this only ever returns the signed-in user's own profile.
  const { data: profile } = await supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle();
  const name = profile?.display_name || user.email;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">{t("greeting", { name: name ?? "" })}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {SECTIONS.map(({ key, icon: Icon, tone }) => (
          <Card key={key}>
            <CardHeader>
              <span className={`mb-2 grid size-12 place-items-center rounded-2xl ${tone}`}>
                <Icon className="size-6" />
              </span>
              <CardTitle>{t(`sections.${key}`)}</CardTitle>
              <CardDescription>{t("comingSoon")}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
