import { cookies, headers } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "./i18n";

/**
 * Which language to render this request in.
 *
 * 1. An explicit choice (the `lang` cookie set by the toggle) always wins.
 * 2. Otherwise, a browser that prefers Chinese gets Chinese on first visit.
 * 3. Otherwise English.
 *
 * Server-only: `cookies()`/`headers()` can't run in Client Components.
 */
export async function getLang(): Promise<Lang> {
  const chosen = (await cookies()).get(LANG_COOKIE)?.value;
  if (isLang(chosen)) {
    return chosen;
  }
  return preferredLang((await headers()).get("accept-language"));
}

/** Highest-weighted language in an Accept-Language header that we support. */
function preferredLang(header: string | null): Lang {
  if (!header) {
    return DEFAULT_LANG;
  }
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { primary: tag.toLowerCase().split("-")[0], weight: Number.isNaN(weight) ? 0 : weight };
    })
    .filter((entry) => entry.weight > 0)
    .sort((a, b) => b.weight - a.weight);

  const first = ranked.find((entry) => isLang(entry.primary));
  return first && isLang(first.primary) ? first.primary : DEFAULT_LANG;
}
