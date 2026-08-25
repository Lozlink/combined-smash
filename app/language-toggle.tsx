"use client";

import { useTransition } from "react";
import { htmlLang, langLabel, LANGS, type Lang } from "@/lib/i18n";
import { setLanguage } from "./actions";

/**
 * EN / 中文 switch. Each button is a pressed-state toggle rather than a
 * link, because the language is a cookie preference, not a separate URL.
 */
export function LanguageToggle({
  lang,
  label,
  className = "",
}: {
  lang: Lang;
  label: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={label}
      aria-busy={pending || undefined}
      className={`inline-flex overflow-hidden rounded-sm border border-white/15 transition-opacity ${
        pending ? "opacity-60" : ""
      } ${className}`}
    >
      {LANGS.map((option) => {
        const active = option === lang;
        return (
          <button
            key={option}
            type="button"
            lang={htmlLang[option]}
            aria-pressed={active}
            disabled={pending}
            onClick={() => {
              if (active) return;
              startTransition(async () => {
                await setLanguage(option);
              });
            }}
            className={`px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.12em] transition-colors disabled:cursor-wait ${
              active
                ? "bg-paper text-coveralls-deep"
                : "text-steel-light hover:bg-white/5 hover:text-paper"
            }`}
          >
            {langLabel[option]}
          </button>
        );
      })}
    </div>
  );
}
