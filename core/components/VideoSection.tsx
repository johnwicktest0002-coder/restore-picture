"use client";

import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { pageX } from "@/lib/ui";

const VIDEOS = {
  en: {
    id: "_ZDZkFfq6No",
    url: "https://www.youtube.com/watch?v=_ZDZkFfq6No",
  },
  zh: {
    id: "YBUFx0REw34",
    url: "https://www.youtube.com/watch?v=YBUFx0REw34",
  },
} as const;

export default function VideoSection() {
  const { locale, t } = useI18n();
  const primary = VIDEOS[locale];
  const secondary = locale === "zh" ? VIDEOS.en : VIDEOS.zh;

  return (
    <section id="video" className="w-full bg-[#050505] py-16 md:py-24">
      <div className={`mx-auto max-w-[1440px] ${pageX}`}>
        <SectionHeader kicker={t("video.kicker")} title={t("video.title")} subtitle={t("video.sub")} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden border border-[#2D2D2D] bg-[#0A0A0A]">
            <div className="relative aspect-video w-full">
              <iframe
                key={primary.id}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${primary.id}`}
                title={t("video.primaryTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2D2D2D] px-4 py-3">
              <p className="font-ibm-mono text-[12px] text-[#C8C4B8]">{t("video.primaryLabel")}</p>
              <a
                href={primary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ibm-mono text-[12px] font-bold text-[#E8E4DC] underline-offset-2 hover:underline"
              >
                YouTube ↗
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-[#2D2D2D] bg-[#111] p-5">
            <p className="font-grotesk text-[15px] font-bold text-[#E8E4DC]">{t("video.also")}</p>
            <div className="relative aspect-video w-full overflow-hidden border border-[#2D2D2D]">
              <iframe
                key={secondary.id}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${secondary.id}`}
                title={t("video.secondaryTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <a
              href={secondary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ibm-mono text-[12px] text-[#A8A49A] underline-offset-2 hover:text-[#E8E4DC] hover:underline"
            >
              {t("video.secondaryLabel")} · YouTube ↗
            </a>
            <p className="font-grotesk text-[13px] leading-[1.7] text-[#8A8680]">{t("video.hint")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
