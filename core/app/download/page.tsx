import type { Metadata } from "next";
import Subpage, { Subblock } from "@/components/Subpage";
import { contactEmail, githubHref, linkProps, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Download placeholder",
  "Restore Picture does not ship an iOS binary in this repository. Download buttons stay on this placeholder until a real URL is configured.",
  "/download",
);

export default function DownloadPage() {
  const source = linkProps(githubHref);

  return (
    <Subpage
      kicker="[下载] // 占位"
      title="安装包不在这个仓库里。"
      lede="网站可以部署。iPhone 客户端没有放进来。在你设置真实地址之前，导航和页尾的获取按钮都会回到这一页。"
    >
      <Subblock title="现在不能做什么">
        <ul className="list-disc space-y-2 pl-5">
          <li>没有可以公开的 App Store 或 TestFlight 链接。</li>
          <li>没有 ipa，也没有配置描述文件。</li>
          <li>不会向你索要 Apple ID、锁屏密码或聊天账号。</li>
        </ul>
      </Subblock>

      <Subblock title="站长要接上真实下载时">
        <p>
          构建前设置 <code className="text-[#C8C4B8]">NEXT_PUBLIC_DOWNLOAD_URL</code>
          。可以是 https 地址，或站内路径。改环境变量后需要重新构建，
          <code className="text-[#C8C4B8]">NEXT_PUBLIC_</code> 会在构建时写进页面。
        </p>
      </Subblock>

      <Subblock title="产品准备做的">
        <ul className="list-disc space-y-2 pl-5">
          <li>在你本人解锁之后，把隐藏相册和最近删除放在更好找的位置。</li>
          <li>给已经保存在这台手机上的微信、QQ、WhatsApp 图片带来源、时间和关键词。</li>
          <li>对已经不在系统里的照片，明确说找不到。</li>
        </ul>
      </Subblock>

      <div id="limits">
        <Subblock title="明确不做的">
          <ul className="list-disc space-y-2 pl-5">
            <li>不绕过面容 ID、密码或锁屏。</li>
            <li>不越狱，不读取别人的手机或别人的聊天。</li>
            <li>不从微信、QQ、WhatsApp 的服务器拉取你没有保存下来的图。</li>
            <li>不保证恢复已被永久删除的文件。</li>
            <li>不提供付费的人工找回，这个网站也不能下单。</li>
          </ul>
        </Subblock>
      </div>

      <div id="pricing">
        <Subblock title="价格">
          <p>首页上的金额是占位，不是在售价格，也不能付款。正式价格若存在，只以真实获取页面为准。</p>
        </Subblock>
      </div>

      <div id="source">
        <Subblock title="源码">
          <p>
            这个仓库是网站。客户端如果在别的地址，把链接写进{" "}
            <code className="text-[#C8C4B8]">NEXT_PUBLIC_GITHUB_URL</code>。当前源码入口：{" "}
            <a {...source} className="text-[#C8C4B8]">
              {githubHref}
            </a>
            。
          </p>
        </Subblock>
      </div>

      <div id="contact">
        <Subblock title="联系">
          {contactEmail ? (
            <p>
              <a href={`mailto:${contactEmail}`} className="text-[#C8C4B8]">
                {contactEmail}
              </a>
            </p>
          ) : (
            <p>
              还没有公开邮箱。设置 <code className="text-[#C8C4B8]">NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
              之后，问答区和页脚会出现这封邮件的链接。在那之前，用你自己的代码仓库 Issue。
            </p>
          )}
        </Subblock>
      </div>
    </Subpage>
  );
}
