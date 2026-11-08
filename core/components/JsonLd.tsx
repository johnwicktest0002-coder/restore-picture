import { siteDescription, siteName, siteUrl } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        inLanguage: ["zh-CN", "en"],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: siteName,
        url: siteUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "iOS",
        description:
          "Personal utility for locating hidden, recently deleted, and hard-to-find photos on the owner's own iPhone, and for searching images already saved from WeChat, QQ, and WhatsApp. 在自己的 iPhone 上定位隐藏相册、最近删除和难找的照片，并检索已保存在本地的微信、QQ、WhatsApp 图片。不承诺找回已被系统永久删除的文件。",
        featureList: [
          "List the Hidden album after the device owner authenticates",
          "Show whether Recently Deleted items are still present",
          "Filter photos already saved from WeChat, QQ, and WhatsApp",
          "On-device index. This website does not accept photo uploads",
        ],
        softwareRequirements:
          "The owner's own iPhone. The Hidden album still requires Face ID or the device passcode. Files the system has permanently deleted are out of scope. Pricing on the website is a placeholder and purchase is not open.",
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
