"use client";

import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

const steps = [
  { key: "source", labelKey: "showcase.step1", file: "source.jpg" },
  { key: "preview", labelKey: "showcase.step2", file: "preview.jpg" },
  { key: "restore", labelKey: "showcase.step3", file: "restore.jpg" },
] as const;

export default function Showcase() {
  const { t, locale } = useI18n();
  const base = `/demos/${locale === "en" ? "en" : "zh"}/flow`;

  return (
    <section id="showcase" className="w-full bg-[#0A0A0A] py-16 md:py-24">
      <div className={`mx-auto max-w-[1440px] ${pageX}`}>
        <SectionHeader kicker={t("showcase.kicker")} title={t("showcase.title")} subtitle={t("showcase.cap")} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <figure key={step.key} className="overflow-hidden border border-[#2D2D2D] bg-[#141414]">
              <div className="flex h-8 items-center justify-between border-b border-[#2D2D2D] bg-[#101010] px-3">
                <span className="font-ibm-mono text-[10px] tracking-[1px] text-[#C8C4B8]">
                  {String(index + 1).padStart(2, "0")} · {t(step.labelKey)}
                </span>
              </div>
              <div className="relative aspect-video bg-[#0A0A0A]">
                <Image
                  src={`${base}/${step.file}`}
                  alt={t(step.labelKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
