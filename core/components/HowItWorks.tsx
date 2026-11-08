"use client";
import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { t: t("how.s1.t"), d: t("how.s1.d") },
    { t: t("how.s2.t"), d: t("how.s2.d") },
    { t: t("how.s3.t"), d: t("how.s3.d") },
  ];
  return (
    <section id="how" className="w-full bg-[#050505] py-16 md:py-24">
      <div className={`mx-auto max-w-[1440px] ${pageX}`}>
        <SectionHeader kicker={t("how.kicker")} title={t("how.title")} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.t} className="border-2 border-[#2D2D2D] bg-[#0A0A0A] p-6">
              <p className="font-ibm-mono text-[12px] font-bold text-[#C8C4B8]">0{i + 1}</p>
              <h3 className="mt-3 font-grotesk text-[18px] font-bold text-[#F5F5F0]">{step.t}</h3>
              <p className="mt-3 font-grotesk text-[14px] leading-[1.7] text-[#B5B5B0]">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
