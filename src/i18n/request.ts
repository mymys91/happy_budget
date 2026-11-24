import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { LOCALE_COOKIE, resolveLocale } from "./config";

/**
 * Picks the language for each request from the user's cookie.
 * We keep the language out of the URL on purpose: links stay short and simple.
 */
export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = resolveLocale(store.get(LOCALE_COOKIE)?.value);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: "Asia/Ho_Chi_Minh",
  };
});
