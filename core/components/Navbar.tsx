"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LangSwitch from "@/components/LangSwitch";
import { downloadHref, linkProps } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const linkIds = [
  { key: "nav.features", section: "features" },
  { key: "nav.how", section: "how" },
  { key: "nav.video", section: "video" },
  { key: "nav.comparison", section: "comparison" },
  { key: "nav.scenarios", section: "scenarios" },
  { key: "nav.faq", section: "faq" },
  { key: "nav.pricing", section: "pricing" },
] as const;

function go(section: string) {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.href = `/#${section}`;
}

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const download = linkProps(downloadHref);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    linkIds.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section);
        },
        { rootMargin: "-35% 0px -55% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="fixed inset-x-0 top-0 z-[60]">
      <header
        className={`border-b transition-colors ${
          scrolled ? "border-[#222] bg-[#0A0A0A]/95 backdrop-blur" : "border-transparent bg-[#0A0A0A]"
        }`}
      >
        <div className="mx-auto flex h-[60px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 md:px-10">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-w-0 items-center gap-2"
          >
            <Image src="/hero-mark.jpg" alt="" width={28} height={28} className="h-7 w-7 shrink-0 border border-[#3A3A3A] object-cover" />
            <span className="truncate font-grotesk text-[13px] font-bold tracking-[1px] text-[#C8C4B8] md:text-[14px]">
              {t("nav.brand")}
            </span>
            <span className="hidden font-ibm-mono text-[10px] text-[#888] lg:inline">{t("nav.brandEn")}</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {linkIds.map((link) => (
              <button
                key={link.section}
                type="button"
                onClick={() => go(link.section)}
                className={`px-2 py-1 font-grotesk text-[13px] ${
                  active === link.section ? "text-[#C8C4B8]" : "text-[#B5B5B0] hover:text-[#F5F5F0]"
                }`}
              >
                {t(link.key)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch />
            <a
              {...download}
              className="hidden h-9 items-center bg-[#C8C4B8] px-3 font-grotesk text-[12px] font-bold text-[#0A0A0A] hover:brightness-95 sm:inline-flex"
            >
              {t("nav.download")}
            </a>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-[#2D2D2D] text-[#F5F5F0] lg:hidden"
              aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#222] bg-[#0A0A0A] px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {linkIds.map((link) => (
                <button
                  key={link.section}
                  type="button"
                  className="py-2 text-left font-grotesk text-[15px] text-[#F5F5F0]"
                  onClick={() => {
                    setMenuOpen(false);
                    go(link.section);
                  }}
                >
                  {t(link.key)}
                </button>
              ))}
              <a {...download} className="mt-2 bg-[#C8C4B8] px-3 py-2 text-center font-grotesk text-[13px] font-bold text-[#0A0A0A]">
                {t("nav.download")}
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
