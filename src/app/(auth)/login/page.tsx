import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AuthForm } from "../auth-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.login");
  return { title: t("title") };
}

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
