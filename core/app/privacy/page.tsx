import type { Metadata } from "next";
import Subpage, { Subblock } from "@/components/Subpage";
import { contactEmail, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Privacy",
  "Privacy notes for the Restore Picture marketing site. The site does not accept photo uploads. Analytics loads only when a measurement ID is configured.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <Subpage
      kicker="[隐私] // 网站"
      title="这个页面不收照片。"
      lede="下面是营销站的说明，不是律师审过的终稿。上线前按你的实际托管方式改一版。它不覆盖尚未发布的 iPhone 客户端。"
    >
      <Subblock title="网站收到什么">
        <p>页面没有上传入口。不要把相机胶卷、隐藏相册或聊天记录发给这个网站。我们也不打算用表单收集这些内容。</p>
      </Subblock>
      <Subblock title="访问日志">
        <p>
          用 nginx 或 Vercel 托管时，平台会按它们自己的策略记录访问日志，通常包括 IP、浏览器和路径。那是访问记录，不是照片。需要的话在平台里缩短保留时间。
        </p>
      </Subblock>
      <Subblock title="统计">
        <p>
          只有设置了 <code className="text-[#C8C4B8]">NEXT_PUBLIC_GA_MEASUREMENT_ID</code>{" "}
          才会加载 Google Analytics。没设置，页面不请求统计脚本。测量 ID 必须是 G- 开头的 Analytics 4 编号，其它字符串会被忽略。Google 如何处理这些数据，以 Google 的条款为准。
        </p>
      </Subblock>
      <Subblock title="Search Console">
        <p>
          <code className="text-[#C8C4B8]">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</code>{" "}
          只用来输出一个验证 meta 标签，方便你证明自己拥有这个站点。验证码会出现在 HTML 里，这是它的用途。
        </p>
      </Subblock>
      <Subblock title="联系">
        {contactEmail ? (
          <p>
            公开邮箱是{" "}
            <a className="text-[#C8C4B8]" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            。邮件由你的邮箱服务商处理。
          </p>
        ) : (
          <p>当前没有配置公开邮箱，网站不会把你的地址存进名单，因为根本没有名单。</p>
        )}
      </Subblock>
    </Subpage>
  );
}
