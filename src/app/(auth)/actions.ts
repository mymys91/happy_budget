"use server";

import { redirect } from "next/navigation";
import type { AuthError } from "@supabase/supabase-js";

import { getSiteUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

/**
 * Result returned to the login / sign-up forms.
 * `error` and `notice` are translation keys under "auth.errors" / "auth.notices",
 * so the form can show them in the user's language.
 */
export type AuthFormState = {
  error?: AuthErrorKey;
  notice?: "checkEmail";
};

export type AuthErrorKey =
  | "missingFields"
  | "passwordTooShort"
  | "invalidCredentials"
  | "emailNotConfirmed"
  | "userExists"
  | "weakPassword"
  | "tooManyRequests"
  | "generic";

const MIN_PASSWORD_LENGTH = 8;

export async function signIn(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = readField(formData, "email");
  const password = readField(formData, "password");
  if (!email || !password) return { error: "missingFields" };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: toErrorKey(error) };

  redirect("/dashboard");
}

export async function signUp(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const displayName = readField(formData, "displayName");
  const email = readField(formData, "email");
  const password = readField(formData, "password");
  if (!displayName || !email || !password) return { error: "missingFields" };
  if (password.length < MIN_PASSWORD_LENGTH) return { error: "passwordTooShort" };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback`,
      data: { display_name: displayName },
    },
  });
  if (error) return { error: toErrorKey(error) };

  // When email confirmation is on (the default), there is no session until the user clicks the link.
  if (!data.session) return { notice: "checkEmail" };

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function toErrorKey(error: AuthError): AuthErrorKey {
  switch (error.code) {
    case "invalid_credentials":
      return "invalidCredentials";
    case "email_not_confirmed":
      return "emailNotConfirmed";
    case "user_already_exists":
    case "email_exists":
      return "userExists";
    case "weak_password":
      return "weakPassword";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "tooManyRequests";
    default:
      console.error("[auth] unexpected Supabase error", error.code, error.message);
      return "generic";
  }
}
