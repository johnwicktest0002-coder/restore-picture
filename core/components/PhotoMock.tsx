"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const albumFrames = ["a01", "a02", "a03", "a04", "a05", "a06", "a07", "a08"] as const;

const variants = {
  hidden: {
    labelKey: "mock.hidden.label",
    captionKey: "mock.hidden.caption",
    highlight: 4,
  },
  wechat: {
    labelKey: "mock.wechat.label",
    captionKey: "mock.wechat.caption",
    highlight: 2,
  },
  timeline: {
    labelKey: "mock.timeline.label",
    captionKey: "mock.timeline.caption",
    highlight: 6,
  },
  chats: {
    labelKey: "mock.chats.label",
    captionKey: "mock.chats.caption",
    highlight: 3,
  },
} as const;

export default function PhotoMock({ variant }: { variant: keyof typeof variants }) {
  const { t, locale } = useI18n();
  const data = variants[variant];
  const base = `/demos/${locale === "en" ? "en" : "zh"}/album`;

  return (
    <div
      role="img"
      aria-label={t(data.captionKey)}
      className="relative h-[200px] overflow-hidden border border-[#2D2D2D] bg-[#141414] md:h-[260px]"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center justify-between bg-[#101010]/95 px-3">
        <span className="font-ibm-mono text-[10px] tracking-[1px] text-[#C8C4B8]">{t(data.labelKey)}</span>
        <span className="font-ibm-mono text-[10px] text-[#555]">{t("mock.badge")}</span>
      </div>
      <div className="absolute inset-x-3 top-10 bottom-8 grid grid-cols-4 gap-1.5">
        {albumFrames.map((frame, index) => {
          const found = index === data.highlight;
          return (
            <div
              key={frame}
              className="relative overflow-hidden bg-[#1A1A1A]"
              style={{
                outline: found ? "2px solid #C8C4B8" : "1px solid #222",
              }}
            >
              <Image
                src={`${base}/${frame}.jpg`}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
              {found && (
                <span className="absolute bottom-1 left-1 bg-[#0A0A0A]/80 px-1 font-ibm-mono text-[9px] text-[#C8C4B8]">
                  {t("mock.found")}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-8 items-center bg-[#0A0A0A]/90 px-3">
        <span className="font-ibm-mono text-[10px] text-[#9A9A9A]">{t(data.captionKey)}</span>
      </div>
    </div>
  );
}
