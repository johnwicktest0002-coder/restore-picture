"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "zh" | "en";

type Dict = Record<string, string>;

const zh: Dict = {
  "nav.features": "功能",
  "nav.how": "怎么用",
  "nav.comparison": "对比",
  "nav.scenarios": "场景",
  "nav.faq": "问答",
  "nav.pricing": "价格",
  "nav.download": "获取",
  "nav.menu": "菜单",
  "nav.close": "关闭",
  "nav.lang": "语言",
  "nav.brand": "软脚虾趴趴走",
  "nav.brandEn": "Softlegged Shrimp",

  "hero.badge": "[新] // 让藏起来的照片重新可见",
  "hero.line1": "找回藏起来的",
  "hero.line2": "iPhone 照片。",
  "hero.line3": "社交图片也好找。",
  "hero.sub": "在你自己的 iPhone 上，定位隐藏相册、最近删除，以及已从微信、QQ、WhatsApp 保存下来的图片——把难找的照片，放回你找得到的地方。",
  "hero.ctaPrimary": "开始找回",
  "hero.ctaSecondary": "看看怎么用",
  "hero.note": "不绕过 Face ID，不恢复永久删除，不访问他人服务器。",

  "logos.title": "覆盖常见来源",
  "logos.item1": "隐藏相册",
  "logos.item2": "最近删除",
  "logos.item3": "微信已存图",
  "logos.item4": "QQ / WhatsApp",

  "features.kicker": "功能",
  "features.title": "把检索路径说清楚",
  "features.sub": "围绕「你已经有权查看」的内容设计，而不是夸大恢复能力。",
  "features.f1.t": "隐藏相册入口",
  "features.f1.d": "引导你打开已解锁的隐藏相册，快速扫到藏起来的照片。",
  "features.f2.t": "最近删除窗口",
  "features.f2.d": "在系统仍保留文件的时间窗口里，集中查看可恢复项。",
  "features.f3.t": "社交软件已存图",
  "features.f3.d": "面向微信、QQ、WhatsApp 等已保存到相册的图片，让检索更省事。",
  "features.f4.t": "本地优先",
  "features.f4.d": "处理发生在你的设备权限范围内，不宣称拉取聊天服务器原图。",

  "how.kicker": "怎么用",
  "how.title": "三步找到照片",
  "how.s1.t": "选择来源",
  "how.s1.d": "隐藏相册、最近删除，或社交软件已保存图片。",
  "how.s2.t": "筛选与预览",
  "how.s2.d": "按时间、对话来源或关键词缩小范围。",
  "how.s3.t": "保存回相册",
  "how.s3.d": "把找到的内容放回你常用的相册位置。",

  "stats.s1": "常见来源",
  "stats.s1v": "4+",
  "stats.s2": "面向机主本人",
  "stats.s2v": "100%",
  "stats.s3": "夸大承诺",
  "stats.s3v": "0",

  "testimonials.kicker": "反馈",
  "testimonials.title": "真实使用场景",
  "testimonials.t1.q": "终于在隐藏相册里找到那组旅行照。",
  "testimonials.t1.a": "机主用户",
  "testimonials.t2.q": "微信里存过的截图，比翻聊天记录快多了。",
  "testimonials.t2.a": "效率向用户",
  "testimonials.t3.q": "说明写得很清楚，不会误导成万能恢复。",
  "testimonials.t3.a": "谨慎型用户",

  "bento.kicker": "能力拼图",
  "bento.title": "检索，而不是神话",
  "bento.b1.t": "权限内可见",
  "bento.b1.d": "只覆盖你解锁后能看到的内容。",
  "bento.b2.t": "来源标签",
  "bento.b2.d": "微信 / QQ / WhatsApp 等来源一眼可辨。",
  "bento.b3.t": "时间线",
  "bento.b3.d": "按日期收束，少翻无效结果。",
  "bento.b4.t": "诚实边界",
  "bento.b4.d": "永久删除、云端未下载内容不在承诺范围。",

  "comparison.kicker": "对比",
  "comparison.title": "比起自己硬翻",
  "comparison.h.manual": "手动翻找",
  "comparison.h.app": "Restore Picture",
  "comparison.r1": "隐藏相册入口",
  "comparison.r2": "最近删除集中看",
  "comparison.r3": "社交已存图检索",
  "comparison.r4": "夸大永久恢复",
  "comparison.yes": "有",
  "comparison.no": "无",
  "comparison.pain": "费时",
  "comparison.good": "更快",

  "showcase.step1": "来源",
  "showcase.step2": "预览",
  "showcase.step3": "找回",
  "mock.badge": "演示帧",
  "mock.found": "找到",
  "mock.hidden.label": "隐藏相册",
  "mock.hidden.caption": "本人解锁后 · 来自产品演示",
  "mock.wechat.label": "微信 · 已保存",
  "mock.wechat.caption": "只含已存到本地的图",
  "mock.timeline.label": "按时间",
  "mock.timeline.caption": "按时间收窄 · 来自产品演示",
  "mock.chats.label": "QQ / WhatsApp",
  "mock.chats.caption": "来源分开，不进对方服务器",
  "showcase.kicker": "界面",
  "showcase.title": "示意：来源 → 预览 → 找回",
  "showcase.cap": "截帧来自产品演示视频，用于示意流程，不代表最终商店截图。",

  "faq.kicker": "问答",
  "faq.title": "先看清楚边界",
  "faq.q1": "能绕过 Face ID 吗？",
  "faq.a1": "不能。隐藏相册仍需你在系统里解锁。",
  "faq.q2": "能恢复永久删除的照片吗？",
  "faq.a2": "不能承诺。仅在「最近删除」等系统仍保留文件时有效。",
  "faq.q3": "能从微信服务器拉聊天原图吗？",
  "faq.a3": "不宣称这一点。面向已保存到本机相册的图片检索。",
  "faq.q4": "支持哪些社交软件？",
  "faq.a4": "微信、QQ、WhatsApp 等已保存图片场景；以本机可见内容为准。",
  "faq.q5": "联系方式？",
  "faq.a5": "微信 kuju9981，Telegram @john20222222。",

  "pricing.kicker": "价格",
  "pricing.title": "方案",
  "pricing.note": "人工咨询免费；软件与专业服务按需选择。",
  "pricing.free": "人工咨询",
  "pricing.pro": "软件购买",
  "pricing.team": "专业服务",
  "pricing.cta": "联系获取",
  "pricing.f1": "微信 / Telegram 人工答疑",
  "pricing.f2": "软件授权与使用说明",
  "pricing.f3": "一对一协助排查与部署建议",

  "cta.title": "准备好找回照片了吗？",
  "cta.sub": "从你自己的 iPhone 开始，把藏起来的图片找回来。",
  "cta.button": "获取方式",

  "footer.tag": "把难找的照片，放回你找得到的地方。只处理你自己 iPhone 上有权查看的内容。",
  "footer.tagEn": "Find hidden iPhone photos. Search images you saved from WeChat, QQ, and WhatsApp.",
  "footer.product": "产品",
  "footer.docs": "说明",
  "footer.project": "项目",
  "footer.get": "获取方式",
  "footer.privacy": "隐私",
  "footer.terms": "条款",
  "footer.source": "源码",
  "footer.ui": "界面示意",
  "footer.rights": "网站按现状提供。",
  "footer.contact": "联系",
  "footer.vx": "微信",
  "footer.tg": "Telegram",
  "footer.brandLine": "品牌：软脚虾趴趴走 Softlegged Shrimp",
  "footer.siteV": "站点 v1",


  "video.kicker": "视频",
  "video.title": "看看产品怎么用",
  "video.sub": "按当前语言播放对应介绍；另一侧保留另一种语言版本。",
  "video.primaryTitle": "中文产品介绍",
  "video.secondaryTitle": "English product walkthrough",
  "video.primaryLabel": "当前语言 · 中文",
  "video.secondaryLabel": "English version",
  "video.also": "其他语言版本",
  "video.hint": "切换右上角语言后，主视频会自动换成对应语言。",
  "nav.video": "视频",
  "brand.ribbon": "软脚虾趴趴走 · Softlegged Shrimp",
  "brand.mark": "软脚虾趴趴走",
  "skip": "跳到主要内容",
};

const en: Dict = {
  "nav.features": "Features",
  "nav.how": "How it works",
  "nav.comparison": "Compare",
  "nav.scenarios": "Scenarios",
  "nav.faq": "FAQ",
  "nav.pricing": "Pricing",
  "nav.download": "Get app",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.lang": "Language",
  "nav.brand": "软脚虾趴趴走",
  "nav.brandEn": "Softlegged Shrimp",

  "hero.badge": "[NEW] // Make hidden photos findable again",
  "hero.line1": "Recover hidden",
  "hero.line2": "iPhone photos.",
  "hero.line3": "Social images, easier.",
  "hero.sub": "On your own iPhone, locate the Hidden album, Recently Deleted, and images already saved from WeChat, QQ, and WhatsApp—put hard-to-find photos back where you can see them.",
  "hero.ctaPrimary": "Start recovering",
  "hero.ctaSecondary": "See how it works",
  "hero.note": "No Face ID bypass. No permanent-delete miracles. No access to other people’s servers.",

  "logos.title": "Common sources covered",
  "logos.item1": "Hidden album",
  "logos.item2": "Recently Deleted",
  "logos.item3": "WeChat saves",
  "logos.item4": "QQ / WhatsApp",

  "features.kicker": "Features",
  "features.title": "Clear search paths",
  "features.sub": "Built around content you already have permission to view—not inflated recovery claims.",
  "features.f1.t": "Hidden album entry",
  "features.f1.d": "Open the Hidden album after you unlock it and scan for tucked-away photos.",
  "features.f2.t": "Recently Deleted window",
  "features.f2.d": "Review recoverable items while the system still keeps the files.",
  "features.f3.t": "Saved social images",
  "features.f3.d": "Faster retrieval for images already saved from WeChat, QQ, WhatsApp, and similar apps.",
  "features.f4.t": "On-device first",
  "features.f4.d": "Work stays within your device permissions—no claim of pulling originals from chat servers.",

  "how.kicker": "How it works",
  "how.title": "Find photos in three steps",
  "how.s1.t": "Pick a source",
  "how.s1.d": "Hidden album, Recently Deleted, or saved social images.",
  "how.s2.t": "Filter & preview",
  "how.s2.d": "Narrow by time, chat source, or keywords.",
  "how.s3.t": "Save back",
  "how.s3.d": "Put finds back into albums you actually use.",

  "stats.s1": "Common sources",
  "stats.s1v": "4+",
  "stats.s2": "For the device owner",
  "stats.s2v": "100%",
  "stats.s3": "Overpromises",
  "stats.s3v": "0",

  "testimonials.kicker": "Feedback",
  "testimonials.title": "Real scenarios",
  "testimonials.t1.q": "Finally found that travel set in the Hidden album.",
  "testimonials.t1.a": "Device owner",
  "testimonials.t2.q": "Screenshots saved from WeChat—much faster than digging chats.",
  "testimonials.t2.a": "Power user",
  "testimonials.t3.q": "Copy is honest; it doesn’t pretend to be magic recovery.",
  "testimonials.t3.a": "Cautious user",

  "bento.kicker": "Capability",
  "bento.title": "Search—not mythology",
  "bento.b1.t": "Within permission",
  "bento.b1.d": "Only what you can see after unlock.",
  "bento.b2.t": "Source tags",
  "bento.b2.d": "WeChat / QQ / WhatsApp at a glance.",
  "bento.b3.t": "Timeline",
  "bento.b3.d": "Tighten results by date.",
  "bento.b4.t": "Honest limits",
  "bento.b4.d": "Permanent deletes and undownloaded cloud items are out of scope.",

  "comparison.kicker": "Compare",
  "comparison.title": "Versus digging manually",
  "comparison.h.manual": "Manual hunt",
  "comparison.h.app": "Restore Picture",
  "comparison.r1": "Hidden album entry",
  "comparison.r2": "Recently Deleted in one place",
  "comparison.r3": "Saved social image search",
  "comparison.r4": "Claim permanent recovery",
  "comparison.yes": "Yes",
  "comparison.no": "No",
  "comparison.pain": "Slow",
  "comparison.good": "Faster",

  "showcase.step1": "Source",
  "showcase.step2": "Preview",
  "showcase.step3": "Restore",
  "mock.badge": "Demo frames",
  "mock.found": "Found",
  "mock.hidden.label": "Hidden album",
  "mock.hidden.caption": "After you unlock · from product demo",
  "mock.wechat.label": "WeChat · saved",
  "mock.wechat.caption": "Only images already saved locally",
  "mock.timeline.label": "By date",
  "mock.timeline.caption": "Narrow by time · from product demo",
  "mock.chats.label": "QQ / WhatsApp",
  "mock.chats.caption": "Sources stay separate; nothing leaves your device",
  "showcase.kicker": "UI",
  "showcase.title": "Flow: source → preview → restore",
  "showcase.cap": "Frames from the product demo video—illustrative, not final App Store screenshots.",

  "faq.kicker": "FAQ",
  "faq.title": "Know the boundaries",
  "faq.q1": "Can it bypass Face ID?",
  "faq.a1": "No. The Hidden album still requires you to unlock it in iOS.",
  "faq.q2": "Can it restore permanently deleted photos?",
  "faq.a2": "No promise. Only while Recently Deleted (or similar) still holds files.",
  "faq.q3": "Can it pull originals from WeChat servers?",
  "faq.a3": "We don’t claim that. Focus is images already saved to your library.",
  "faq.q4": "Which social apps?",
  "faq.a4": "WeChat, QQ, WhatsApp and similar saved-image cases on your device.",
  "faq.q5": "How do I contact you?",
  "faq.a5": "WeChat kuju9981 · Telegram @john20222222.",

  "pricing.kicker": "Pricing",
  "pricing.title": "Plans",
  "pricing.note": "Consult for free; buy the app or book pro service as needed.",
  "pricing.free": "Consult",
  "pricing.pro": "App license",
  "pricing.team": "Pro service",
  "pricing.cta": "Contact us",
  "pricing.f1": "WeChat / Telegram human support",
  "pricing.f2": "App license and setup guide",
  "pricing.f3": "1:1 troubleshooting and deploy advice",

  "cta.title": "Ready to find your photos?",
  "cta.sub": "Start on your own iPhone—bring hidden images back into view.",
  "cta.button": "Get the app",

  "footer.tag": "Put hard-to-find photos back where you can see them. Only content you can already view on your iPhone.",
  "footer.tagEn": "Find hidden iPhone photos. Search images you saved from WeChat, QQ, and WhatsApp.",
  "footer.product": "Product",
  "footer.docs": "Docs",
  "footer.project": "Project",
  "footer.get": "Get app",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.source": "Source",
  "footer.ui": "UI preview",
  "footer.rights": "Provided as-is.",
  "footer.contact": "Contact",
  "footer.vx": "WeChat",
  "footer.tg": "Telegram",
  "footer.brandLine": "Brand: 软脚虾趴趴走 Softlegged Shrimp",
  "footer.siteV": "Site v1",


  "video.kicker": "Video",
  "video.title": "See how it works",
  "video.sub": "The main player follows your language; the other language stays available beside it.",
  "video.primaryTitle": "English product walkthrough",
  "video.secondaryTitle": "中文产品介绍",
  "video.primaryLabel": "Current language · English",
  "video.secondaryLabel": "中文版本",
  "video.also": "Other language",
  "video.hint": "Switch language in the top bar and the main video updates to match.",
  "nav.video": "Video",

  "brand.ribbon": "软脚虾趴趴走 · Softlegged Shrimp",
  "brand.mark": "Softlegged Shrimp",
  "skip": "Skip to content",
};

const dicts: Record<Locale, Dict> = { zh, en };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "rp-locale";

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = (navigator.language || "en").toLowerCase();
  return lang.startsWith("zh") ? "zh" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "zh" || saved === "en") setLocaleState(saved);
      else setLocaleState(detectLocale());
    } catch {
      setLocaleState(detectLocale());
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, ready]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const t = useCallback((key: string) => dicts[locale][key] ?? dicts.en[key] ?? key, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
