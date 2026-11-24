"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { signIn, signUp, type AuthFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const t = useTranslations("auth");
  const action = mode === "login" ? signIn : signUp;
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(action, {});

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t(`${mode}.title`)}</CardTitle>
        <CardDescription>{t(`${mode}.subtitle`)}</CardDescription>
      </CardHeader>

      <CardContent>
        {state.notice ? (
          <p className="rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground" role="status">
            {t(`notices.${state.notice}`)}
          </p>
        ) : (
          <form action={formAction} className="flex flex-col gap-4">
            {mode === "signup" && (
              <Field id="displayName" label={t("fields.displayName")} autoComplete="nickname" />
            )}
            <Field id="email" type="email" label={t("fields.email")} autoComplete="email" />
            <Field
              id="password"
              type="password"
              label={t("fields.password")}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              hint={mode === "signup" ? t("fields.passwordHint") : undefined}
            />

            {state.error && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {t(`errors.${state.error}`)}
              </p>
            )}

            <Button type="submit" size="lg" disabled={isPending} className="mt-2">
              {isPending ? t("pending") : t(`${mode}.submit`)}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="justify-center gap-1 text-sm text-muted-foreground">
        {t(`${mode}.switchPrompt`)}
        <Link href={mode === "login" ? "/signup" : "/login"} className="font-semibold text-primary hover:underline">
          {t(`${mode}.switchLink`)}
        </Link>
      </CardFooter>
    </Card>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} autoComplete={autoComplete} required />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
