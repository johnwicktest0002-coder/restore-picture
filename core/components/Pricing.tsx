"use client";
import SectionHeader from "@/components/SectionHeader";
import { downloadHref, linkProps } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function Pricing() {
  const { t } = useI18n();
  const download = linkProps(downloadHref);
  const plans = [
    { name: t("pricing.free"), price: "$0", features: [t("pricing.f1")] },
    { name: t("pricing.pro"), price: "$19", features: [t("pricing.f1"), t("pricing.f2")] },
    { name: t("pricing.team"), price: "$39", features: [t("pricing.f1"), t("pricing.f2"), t("pricing.f3")] },
  ];
  return (
    <section id="pricing" className="w-full bg-[#0A0A0A] py-16 md:py-24">
      <div className={`mx-auto max-w-[1440px] ${pageX}`}>
        <SectionHeader kicker={t("pricing.kicker")} title={t("pricing.title")} subtitle={t("pricing.note")} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col border-2 border-[#2D2D2D] bg-[#111] p-6">
              <h3 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">{plan.name}</h3>
              <p className="mt-3 font-ibm-mono text-[28px] font-bold text-[#C8C4B8]">{plan.price}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="font-grotesk text-[14px] text-[#B5B5B0]">• {f}</li>
                ))}
              </ul>
              <a {...download} className="mt-6 bg-[#C8C4B8] px-4 py-3 text-center font-grotesk text-[13px] font-bold text-[#0A0A0A]">
                {t("pricing.cta")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
