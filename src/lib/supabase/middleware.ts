import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { getSupabaseEnv } from "@/lib/env";

/** Pages that need a signed-in user. */
const PROTECTED_PREFIXES = ["/dashboard"];
/** Pages a signed-in user has no reason to see. */
const AUTH_PAGES = ["/login", "/signup"];

/**
 * Runs on every request: keeps the login session fresh and sends people
 * to the right place depending on whether they are signed in.
 */
export async function updateSession(request: NextRequest) {
  const { url, anonKey } = getSupabaseEnv();
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Do not put code between createServerClient and getUser: it can log users out at random.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
  const isAuthPage = AUTH_PAGES.includes(path);

  if (!user && isProtected) {
    return redirectTo(request, "/login");
  }
  if (user && isAuthPage) {
    return redirectTo(request, "/dashboard");
  }

  return response;
}

function redirectTo(request: NextRequest, pathname: string) {
  const target = request.nextUrl.clone();
  target.pathname = pathname;
  target.search = "";
  return NextResponse.redirect(target);
}
