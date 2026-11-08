"use client";

import { useI18n, type Locale } from "@/lib/i18n";

export default function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const btn = (code: Locale, label: string) => (
    <button
      type="button"
      onClick={() => setLocale(code)}
      aria-pressed={locale === code}
      className={`h-8 min-w-10 px-2 font-ibm-mono text-[11px] font-bold tracking-[1px] ${
        locale === code
          ? "bg-[#C8C4B8] text-[#0A0A0A]"
          : "bg-[#1A1A1A] text-[#C8C8C2] hover:text-[#C8C4B8]"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-1 border border-[#2D2D2D]" role="group" aria-label={t("nav.lang")}>
      {!compact && (
        <span className="hidden px-2 font-ibm-mono text-[10px] text-[#777] md:inline">{t("nav.lang")}</span>
      )}
      {btn("zh", "中文")}
      {btn("en", "EN")}
    </div>
  );
}
