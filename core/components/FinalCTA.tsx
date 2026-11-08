"use client";
import { downloadHref, linkProps } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function FinalCTA() {
  const { t } = useI18n();
  const download = linkProps(downloadHref);
  return (
    <section className="w-full bg-[#161616] py-16 md:py-20">
      <div className={`mx-auto flex max-w-[1440px] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between ${pageX}`}>
        <div>
          <p className="font-ibm-mono text-[12px] font-bold tracking-[2px] text-[#8A8680]">软脚虾趴趴走 · Softlegged Shrimp</p>
          <h2 className="mt-2 font-grotesk text-[clamp(28px,5vw,48px)] font-bold text-[#E8E4DC]">{t("cta.title")}</h2>
          <p className="mt-3 max-w-[640px] font-grotesk text-[15px] text-[#A8A49A]">{t("cta.sub")}</p>
        </div>
        <a {...download} className="bg-[#0A0A0A] px-6 py-4 font-grotesk text-[14px] font-bold text-[#C8C4B8]">
          {t("cta.button")}
        </a>
      </div>
    </section>
  );
}
