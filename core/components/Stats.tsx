"use client";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function Stats() {
  const { t } = useI18n();
  const items = [
    { v: t("stats.s1v"), l: t("stats.s1") },
    { v: t("stats.s2v"), l: t("stats.s2") },
    { v: t("stats.s3v"), l: t("stats.s3") },
  ];
  return (
    <section className="w-full bg-[#0A0A0A] py-14">
      <div className={`mx-auto grid max-w-[1440px] gap-4 md:grid-cols-3 ${pageX}`}>
        {items.map((item) => (
          <div key={item.l} className="border border-[#2D2D2D] bg-[#111] p-6 text-center">
            <p className="font-grotesk text-[40px] font-bold text-[#C8C4B8]">{item.v}</p>
            <p className="mt-2 font-ibm-mono text-[12px] text-[#888]">{item.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
