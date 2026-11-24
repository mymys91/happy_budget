import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Free font (SIL Open Font License) designed for Vietnamese, so accents render beautifully.
const appFont = Be_Vietnam_Pro({
  variable: "--font-app",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: { default: "HappyBudget", template: "%s · HappyBudget" },
    description: t("description"),
    applicationName: "HappyBudget",
  };
}

export const viewport: Viewport = {
  themeColor: "#e5679a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${appFont.variable} flex min-h-dvh flex-col font-sans antialiased`}>
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
