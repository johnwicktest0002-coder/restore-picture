"use client";
import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

export default function Comparison() {
  const { t } = useI18n();
  const rows = [
    [t("comparison.r1"), t("comparison.pain"), t("comparison.good")],
    [t("comparison.r2"), t("comparison.pain"), t("comparison.yes")],
    [t("comparison.r3"), t("comparison.pain"), t("comparison.yes")],
    [t("comparison.r4"), t("comparison.no"), t("comparison.no")],
  ];
  return (
    <section id="comparison" className="w-full bg-[#050505] py-16 md:py-24">
      <div className={`mx-auto max-w-[1440px] ${pageX}`}>
        <SectionHeader kicker={t("comparison.kicker")} title={t("comparison.title")} />
        <div className="mt-10 overflow-x-auto border border-[#2D2D2D]">
          <table className="w-full min-w-[560px] text-left">
            <thead className="bg-[#111]">
              <tr className="font-ibm-mono text-[12px] text-[#C8C4B8]">
                <th className="p-4"> </th>
                <th className="p-4">{t("comparison.h.manual")}</th>
                <th className="p-4">{t("comparison.h.app")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-t border-[#2D2D2D] font-grotesk text-[14px] text-[#C8C8C2]">
                  <td className="p-4 text-[#F5F5F0]">{row[0]}</td>
                  <td className="p-4">{row[1]}</td>
                  <td className="p-4 text-[#C8C4B8]">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
