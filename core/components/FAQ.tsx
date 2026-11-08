"use client";
import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function FAQ() {
  const { t } = useI18n();
  const items = [
    [t("faq.q1"), t("faq.a1")],
    [t("faq.q2"), t("faq.a2")],
    [t("faq.q3"), t("faq.a3")],
    [t("faq.q4"), t("faq.a4")],
    [t("faq.q5"), t("faq.a5")],
  ];
  return (
    <section id="faq" className="w-full bg-[#050505] py-16 md:py-24">
      <div className={`mx-auto max-w-[900px] ${pageX}`}>
        <SectionHeader kicker={t("faq.kicker")} title={t("faq.title")} />
        <div className="mt-10 flex flex-col gap-3">
          {items.map(([q, a]) => (
            <details key={q} className="border border-[#2D2D2D] bg-[#0A0A0A] p-4 open:border-[#C8C4B8]">
              <summary className="cursor-pointer font-grotesk text-[15px] font-bold text-[#F5F5F0]">{q}</summary>
              <p className="mt-3 font-grotesk text-[14px] leading-[1.7] text-[#B5B5B0]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
