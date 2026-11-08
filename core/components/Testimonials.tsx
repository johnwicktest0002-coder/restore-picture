"use client";
import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function Testimonials() {
  const { t } = useI18n();
  const items = [
    { q: t("testimonials.t1.q"), a: t("testimonials.t1.a") },
    { q: t("testimonials.t2.q"), a: t("testimonials.t2.a") },
    { q: t("testimonials.t3.q"), a: t("testimonials.t3.a") },
  ];
  return (
    <section className="w-full bg-[#050505] py-16 md:py-24">
      <div className={`mx-auto max-w-[1440px] ${pageX}`}>
        <SectionHeader kicker={t("testimonials.kicker")} title={t("testimonials.title")} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <blockquote key={item.q} className="border border-[#2D2D2D] bg-[#0A0A0A] p-6">
              <p className="font-grotesk text-[15px] leading-[1.7] text-[#F5F5F0]">“{item.q}”</p>
              <footer className="mt-4 font-ibm-mono text-[11px] text-[#888]">— {item.a}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
