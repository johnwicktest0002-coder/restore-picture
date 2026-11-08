"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { contactEmail, githubHref, linkProps, siteName } from "@/lib/site";
import { pageX } from "@/lib/ui";
import { useI18n } from "@/lib/i18n";

const VX = "kuju9981";
const TG = "john20222222";
const TG_URL = `https://t.me/${TG}`;

function FooterAnchor({ href, children }: { href: string; children: ReactNode }) {
  const className = "font-grotesk text-[14px] text-[#A3A39C] hover:text-[#F5F5F0]";
  if (/^https?:\/\//i.test(href) || href.startsWith("mailto:")) {
    const props = linkProps(href);
    return (
      <a {...props} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const columns = [
    {
      heading: t("footer.product"),
      links: [
        { label: t("nav.features"), href: "/#features" },
        { label: t("nav.how"), href: "/#how" },
        { label: t("nav.comparison"), href: "/#comparison" },
        { label: t("nav.pricing"), href: "/#pricing" },
      ],
    },
    {
      heading: t("footer.docs"),
      links: [
        { label: t("footer.get"), href: "/download" },
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
      ],
    },
    {
      heading: t("footer.project"),
      links: [
        { label: t("nav.faq"), href: "/#faq" },
        { label: t("footer.ui"), href: "/#showcase" },
        { label: t("footer.source"), href: githubHref },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#050505]">
      <div className="border-b-2 border-[#C8C4B8] bg-[#121200]">
        <div className={`mx-auto flex w-full max-w-[1440px] flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between ${pageX}`}>
          <div className="flex items-center gap-3">
            <Image src="/hero-mark.jpg" alt="软脚虾趴趴走" width={48} height={48} className="h-12 w-12 border border-[#3A3A3A] object-cover" />
            <div>
              <p className="font-grotesk text-[18px] font-bold tracking-[1px] text-[#C8C4B8] md:text-[22px]">
                软脚虾趴趴走
              </p>
              <p className="font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#F5F5F0]">
                Softlegged Shrimp
              </p>
            </div>
          </div>
          <p className="font-ibm-mono text-[12px] text-[#C8C8C2]">{t("footer.brandLine")}</p>
        </div>
      </div>

      <div className={`mx-auto flex w-full max-w-[1440px] flex-col gap-12 py-14 md:flex-row md:gap-20 md:py-16 ${pageX}`}>
        <div className="flex max-w-[360px] flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 bg-[#1A1A1A]" aria-hidden="true" />
            <span className="font-grotesk text-[16px] font-bold tracking-[2px] text-[#C8C4B8]">
              {siteName.toUpperCase()}
            </span>
          </div>
          <p className="font-grotesk text-[14px] leading-[1.7] text-[#B5B5B0]">{t("footer.tag")}</p>
          <p className="font-ibm-mono text-[12px] leading-[1.7] text-[#777]">{t("footer.tagEn")}</p>

          <div className="mt-2 border-2 border-[#C8C4B8] bg-[#111] p-4">
            <p className="mb-3 font-grotesk text-[12px] font-bold tracking-[2px] text-[#C8C4B8]">
              {t("footer.contact")}
            </p>
            <p className="font-ibm-mono text-[14px] font-bold text-[#F5F5F0]">
              {t("footer.vx")}: <span className="text-[#C8C4B8]">kuju9981</span>
            </p>
            <p className="mt-2 font-ibm-mono text-[14px] font-bold text-[#F5F5F0]">
              {t("footer.tg")}:{" "}
              <a {...linkProps(TG_URL)} className="text-[#C8C4B8] underline-offset-2 hover:underline">
                @{TG}
              </a>
            </p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-4">
              <p className="font-grotesk text-[12px] font-bold tracking-[2px] text-[#F5F5F0]">{column.heading}</p>
              {column.links.map((link) => (
                <FooterAnchor key={link.label} href={link.href}>
                  {link.label}
                </FooterAnchor>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#1D1D1D]">
        <div className={`mx-auto flex w-full max-w-[1440px] flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between ${pageX}`}>
          <p className="font-ibm-mono text-[12px] text-[#777]">
            © 2026 {siteName} · 软脚虾趴趴走. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="font-ibm-mono text-[12px] font-bold text-[#C8C4B8]">
              vx: {VX}
            </span>
            <a {...linkProps(TG_URL)} className="font-ibm-mono text-[12px] font-bold text-[#C8C4B8] hover:underline">
              tg: @{TG}
            </a>
            <Link href="/privacy" className="font-ibm-mono text-[12px] text-[#777] hover:text-[#F5F5F0]">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="font-ibm-mono text-[12px] text-[#777] hover:text-[#F5F5F0]">
              {t("footer.terms")}
            </Link>
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className="font-ibm-mono text-[12px] text-[#777] hover:text-[#F5F5F0]">
                {contactEmail}
              </a>
            )}
            <span className="font-ibm-mono text-[12px] font-bold text-[#C8C4B8]">{t("footer.siteV")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
