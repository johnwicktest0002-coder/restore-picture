"use client";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function Logos() {
  const { t } = useI18n();
  const items = [t("logos.item1"), t("logos.item2"), t("logos.item3"), t("logos.item4")];
  return (
    <section className="w-full border-y border-[#1D1D1D] bg-[#0A0A0A] py-8">
      <div className={`mx-auto flex max-w-[1440px] flex-col gap-4 ${pageX}`}>
        <p className="font-ibm-mono text-[11px] tracking-[2px] text-[#777]">{t("logos.title")}</p>
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span key={item} className="border border-[#2D2D2D] bg-[#111] px-3 py-2 font-grotesk text-[13px] text-[#C8C8C2]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
