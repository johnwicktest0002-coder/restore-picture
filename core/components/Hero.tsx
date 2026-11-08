"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GlitchText from "@/components/GlitchText";
import PhotoMock from "@/components/PhotoMock";
import { downloadHref, linkProps } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const download = linkProps(downloadHref);

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-[#0A0A0A] px-6 py-16 md:px-[120px] md:py-[100px]">
      <div className="mb-6 flex items-center justify-center gap-3 border border-[#3A3A3A] bg-[#141414] px-3 py-2 md:px-4">
        <Image src="/hero-mark.jpg" alt="软脚虾趴趴走" width={40} height={40} className="h-10 w-10 border border-[#3A3A3A] object-cover" priority />
        <span className="font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#C8C4B8] md:text-[11px]">
          {t("brand.mark")}
        </span>
      </div>

      <div className="mb-6 flex items-center justify-center gap-[8px] h-[32px] px-[12px] md:px-[16px] bg-[#1A1A1A] border-2 border-[#C8C4B8]">
        <div className="h-[8px] w-[8px] shrink-0 bg-[#C8C4B8]" />
        <span className="whitespace-nowrap font-ibm-mono text-[9px] font-bold tracking-[1px] text-[#C8C4B8] md:text-[11px] md:tracking-[2px]">
          {t("hero.badge")}
        </span>
      </div>

      <h1 className="w-full max-w-[1100px] text-center font-grotesk text-[clamp(32px,10vw,84px)] font-bold leading-none tracking-[-1px] text-[#F5F5F0]">
        {mounted ? <GlitchText text={t("hero.line1")} speed={45} delay={100} /> : t("hero.line1")}
        <br />
        <span className="text-[#C8C4B8]">
          {mounted ? <GlitchText text={t("hero.line2")} speed={45} delay={400} /> : t("hero.line2")}
        </span>
        <br />
        {mounted ? <GlitchText text={t("hero.line3")} speed={45} delay={700} /> : t("hero.line3")}
      </h1>

      <p className="mt-8 w-full max-w-[800px] text-center font-ibm-mono text-[13px] leading-[1.7] tracking-[0.5px] text-[#888] md:text-[15px]">
        {t("hero.sub")}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a {...download} className="bg-[#C8C4B8] px-6 py-3 font-grotesk text-[14px] font-bold text-[#0A0A0A] hover:brightness-95">
          {t("hero.ctaPrimary")}
        </a>
        <button
          type="button"
          onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
          className="border-2 border-[#2D2D2D] bg-[#111] px-6 py-3 font-grotesk text-[14px] font-bold text-[#F5F5F0] hover:border-[#C8C4B8]"
        >
          {t("hero.ctaSecondary")}
        </button>
      </div>

      <p className="mt-4 max-w-[720px] text-center font-ibm-mono text-[11px] text-[#666]">{t("hero.note")}</p>

      <div className="mt-14 w-full max-w-[900px]">
        <PhotoMock variant="hidden" />
      </div>
    </section>
  );
}
