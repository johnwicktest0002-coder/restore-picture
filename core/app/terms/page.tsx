import type { Metadata } from "next";
import Subpage, { Subblock } from "@/components/Subpage";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Terms",
  "Terms for the Restore Picture website. The site describes a personal utility and does not promise recovery of permanently deleted photos.",
  "/terms",
);

export default function TermsPage() {
  return (
    <Subpage
      kicker="[条款] // 网站"
      title="这是产品介绍，不是恢复合同。"
      lede="使用这个网站，表示你理解页面在说明一个个人工具的目标，而不是向你出售一次保证成功的找回。"
    >
      <Subblock title="网站本身">
        <p>文案描述的是工具准备做的事。下载按钮在换成真实地址之前是占位。仓库里没有安装包。</p>
      </Subblock>
      <Subblock title="不构成承诺">
        <p>
          不保证能找回任何一张具体的照片。系统已经永久删除的、你没有本地副本的、锁在别人账号里的内容，都不在能力范围内。首页上的价格不是要约，也不能下单。
        </p>
      </Subblock>
      <Subblock title="只用于你自己的设备">
        <p>请只在你拥有或有权使用的 iPhone 上使用这类工具。不要用它尝试打开别人的隐藏相册、锁屏或聊天。</p>
      </Subblock>
      <Subblock title="名称">
        <p>
          Apple、iPhone、iOS、微信、WeChat、QQ、WhatsApp 是各自权利人的商标。本站提到它们，只是为了说明用户可能保存过图片的地方，没有合作、赞助或背书。
        </p>
      </Subblock>
      <Subblock title="责任">
        <p>
          网站按现状提供。因依赖页面文案而采取的行动，在法律允许的范围内由你自己判断。这段话代替不了你所在地需要的正式条款，发布前请自行确认。
        </p>
      </Subblock>
    </Subpage>
  );
}
