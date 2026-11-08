import type { Metadata } from "next";

function readSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "http://localhost:3847";
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "http://localhost:3847";
    return url.origin;
  } catch {
    return "http://localhost:3847";
  }
}

function readHref(raw: string | undefined, fallback: string) {
  const value = raw?.trim();
  if (!value) return fallback;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return value;
  } catch {
    /* ignore malformed env values */
  }
  return fallback;
}

function readVerification(raw: string | undefined) {
  if (!raw) return undefined;
  let value = raw.trim();
  const fromTag = value.match(/content\s*=\s*["']([^"']+)["']/i);
  if (fromTag) value = fromTag[1].trim();
  if (!value || value.length > 128 || /[<>"'`\s]/.test(value)) return undefined;
  return value;
}

function readGaId(raw: string | undefined) {
  const value = raw?.trim();
  if (value && /^G-[A-Z0-9]+$/.test(value)) return value;
  return undefined;
}

function readEmail(raw: string | undefined) {
  const value = raw?.trim();
  if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;
  return undefined;
}

export const siteName = "Restore Picture";

export const siteUrl = readSiteUrl();

export const siteTitle = "Restore Picture — Find Hidden iPhone Photos";

export const siteDescription =
  "Find hidden and recently deleted photos on your own iPhone. Search images you saved from WeChat, QQ, and WhatsApp. On-device utility. No guarantee for permanently deleted files.";

export const siteKeywords = [
  "Restore Picture",
  "iPhone hidden photos",
  "recently deleted photos",
  "WeChat image search",
  "QQ photos",
  "WhatsApp images",
  "iPhone 隐藏照片",
  "隐藏相册",
  "最近删除",
  "微信图片搜索",
  "QQ 图片",
  "WhatsApp 图片",
  "找回照片",
];

export const downloadHref = readHref(process.env.NEXT_PUBLIC_DOWNLOAD_URL, "/download");

export const githubHref = readHref(process.env.NEXT_PUBLIC_GITHUB_URL, "/download#source");

export const contactEmail = readEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

export const googleSiteVerification = readVerification(
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
);

export const gaMeasurementId = readGaId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

export function linkProps(href: string): {
  href: string;
  target?: "_blank";
  rel?: string;
} {
  if (href.startsWith("mailto:")) return { href };
  if (/^https?:\/\//i.test(href)) {
    return { href, target: "_blank", rel: "noopener noreferrer" };
  }
  return { href };
}

export function pageMeta(title: string, description: string, path: string): Metadata {
  const full = `${title} · ${siteName}`;
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
    },
    twitter: {
      title: full,
      description,
    },
  };
}
