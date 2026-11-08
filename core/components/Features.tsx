"use client";
import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function Features() {
  const { t } = useI18n();
  const items = [
    { t: t("features.f1.t"), d: t("features.f1.d") },
    { t: t("features.f2.t"), d: t("features.f2.d") },
    { t: t("features.f3.t"), d: t("features.f3.d") },
    { t: t("features.f4.t"), d: t("features.f4.d") },
  ];
  return (
    <section id="features" className="w-full bg-[#0A0A0A] py-16 md:py-24">
      <div className={`mx-auto max-w-[1440px] ${pageX}`}>
        <SectionHeader kicker={t("features.kicker")} title={t("features.title")} subtitle={t("features.sub")} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.t} className="border border-[#2D2D2D] bg-[#111] p-6">
              <h3 className="font-grotesk text-[18px] font-bold text-[#C8C4B8]">{item.t}</h3>
              <p className="mt-3 font-grotesk text-[14px] leading-[1.7] text-[#B5B5B0]">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
