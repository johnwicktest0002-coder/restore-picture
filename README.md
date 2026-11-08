## Preview

```bash
./build.sh preview
# or
./deploy.sh preview
```

Builds `core/`, then serves http://127.0.0.1:3847.

# Restore Picture

Personal utility site for finding hidden, buried, and hard-to-locate photos on **your own iPhone**, and for searching images you already saved from **WeChat, QQ, and WhatsApp**.

面向 iPhone 的个人照片工具站。页面帮助你在自己的手机上定位隐藏相册、最近删除，以及已经保存在本地的微信、QQ、WhatsApp 图片。界面是中文。标题、描述和 Open Graph 是英文，方便 Google 与分享卡片。

这个仓库是营销网站，不是 iOS 安装包，也没有支付。下载按钮在你设置真实地址之前会停在占位页。站点不承诺找回已被系统永久删除的文件，也不绕过面容 ID 或密码。

Suggested GitHub topics: `iphone` `photo-recovery` `hidden-photos` `recently-deleted` `wechat` `qq` `whatsapp` `nextjs` `tailwindcss` `landing-page`


## 软件功能（详细）

Restore Picture 是面向 **你自己的 iPhone** 的个人照片查找工具配套站点。目标不是「黑科技恢复」，而是在你已经能访问的本机内容里，把难找的照片更快找回来。

### 核心能力

1. **隐藏相册入口**  
   在你本人用面容 ID / 密码解锁系统「隐藏」相册之后，把入口和浏览路径做得更好找，减少在系统相册里来回翻的时间。

2. **最近删除**  
   把「最近删除」放进同一套查找流程，方便在系统仍保留文件的窗口期内定位误删内容。**不承诺**系统已永久清除后的找回。

3. **社交应用已存图检索（微信 / QQ / WhatsApp）**  
   只覆盖 **已经保存到本机相册 / 本地** 的图片，可按来源、时间线、关键词收窄。  
   - 不上传你的照片到本站服务器  
   - 不去微信 / QQ / WhatsApp 的服务器拉聊天原图  
   - 不进对方服务器，来源标签只用于本机分类

4. **时间线收窄**  
   按日期区间收紧结果，适合「大概记得哪个月存过」的场景。

5. **权限边界写清楚**  
   站点与产品文案明确：不能绕过面容 ID / 锁屏；不能保证永久删除后的恢复；不提供越狱方案。

### 本仓库是什么 / 不是什么

| 是 | 不是 |
| --- | --- |
| 产品介绍与下载引导网站（Next.js） | iOS `.ipa` 安装包本体 |
| 中英文界面与演示视频 / 演示帧 | 云端存你的相册 |
| 本地构建与宝塔 / Vercel / GitHub 发布脚本 | 支付或账号系统 |

站点上的界面示意来自产品演示视频截帧，标注为演示用途，不代表最终 App Store 截图。

### 使用前提（请先读）

- 隐藏相册仍须你在 iOS 里亲自解锁。  
- 永久删除、未下载的云端原图、未保存到本地的聊天图，都 **超出** 本工具范围。  
- 下载按钮在配置真实 `NEXT_PUBLIC_DOWNLOAD_URL` 之前会指向站内占位页。

## 作者与联系方式

品牌：**软脚虾趴趴走**（Softlegged Shrimp）

| 渠道 | 联系方式 |
| --- | --- |
| 微信 WeChat | `kuju9981` |
| Telegram | [@john20222222](https://t.me/john20222222) |

有合作、部署或产品问题，优先通过上面两个渠道联系。公开邮箱可通过站点环境变量 `NEXT_PUBLIC_CONTACT_EMAIL` 配置后显示在页脚。

## 打开仓库后先看这两份

| 你要做的事 | 读这里 |
| --- | --- |
| 产品是什么、本地怎么跑 | 本文件 |
| `./deploy.sh`、宝塔、GitHub、Vercel、nginx | [DEPLOY.md](DEPLOY.md) |
| 网站文案用的环境变量 | [core/.env.example](core/.env.example) |
| 部署目标用的环境变量 | [.env.example](.env.example) |

两份 `.env.example` 互相指向对方。复制后再改，不要把填好的 `.env` 提交进 git。

## 仓库里有什么

```text
README.md                 产品说明和本地运行（本文件）
DEPLOY.md                 ./deploy.sh 的完整用法
.env.example              宝塔 / GitHub / Vercel
deploy.sh                 构建和发布的唯一入口
deploy/nginx.conf         普通 VPS 的 nginx
deploy/baota/nginx.conf   宝塔站点配置
deploy/baota/remote-build.sh
core/                     Next.js 站点
  app/  components/  lib/  public/
  package.json  vercel.json
  .env.example            站点变量，含 Google Search Console
LICENSE
```

`core/` 才是网站。仓库根目录只有文档和发布工具。

## 页面在说什么

- 你本人解锁之后，把隐藏相册和最近删除放在更好找的位置。
- 已经保存到本地的微信、QQ、WhatsApp 图片，可以按来源、时间和关键词收窄。
- 索引用在本机。这个网站没有上传照片的入口。
- 系统已经永久删掉的，页面会说找不到。没有找回率保证，没有越狱，也不会去对方的服务器取图。

## 本地运行

需要 Node.js 20 或更新版本。依赖锁在 `core/pnpm-lock.yaml`，用 [pnpm](https://pnpm.io)。

```bash
cd core
pnpm install
cp .env.example .env.local
pnpm dev --port 3847
```

浏览器打开 [http://127.0.0.1:3847](http://127.0.0.1:3847)。`core/.env.example` 里每一项的含义见下一节。本地开发可以先不改，canonical 会落到 `http://localhost:3847`。

生产构建从仓库根目录执行：

```bash
./deploy.sh build
cd core && pnpm start -- -H 127.0.0.1 -p 3847
```

`./deploy.sh build` 会在 `core/` 里安装依赖并执行生产构建。本机有 `pnpm` 就用 `pnpm`（有 `pnpm-lock.yaml` 时 `--frozen-lockfile`）。没有的话试 `corepack pnpm`，再没有就用 `npm`：有 `package-lock.json` 时 `npm ci`，没有就 `npm install`（`pnpm-lock.yaml` 仍留在仓库里）。脚本会打印实际用的是哪一个。构建不连服务器，也不需要 `--yes`。

命令只能是 `./deploy.sh`。不要运行 `./deploy`：根目录的 `deploy` 已经是 nginx 配置目录，不能再放一个同名脚本，直接执行会 `Permission denied`。

## 环境变量

站点变量是 `NEXT_PUBLIC_*`，在**构建时**写进页面。改完必须重新构建。模板在 [core/.env.example](core/.env.example)，复制为 `core/.env.local`（本地）或 `core/.env.production`（要同步到服务器时）。

| 变量 | 何时要填 | 填什么 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 正式上线前 | 站点源地址，不要结尾斜杠，例如 `https://example.com`。canonical、sitemap、robots、JSON-LD 都用它。不填则用 `http://localhost:3847`。 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | 做 Search Console 时 | HTML 标记的 **content** 值，不要整段 `<meta>`。若贴了整段标签，脚本会抽出 `content`。空值或不安全的值会被忽略。 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 可选 | GA4 编号，形如 `G-XXXXXXXX`。空着则不加载 gtag。别的格式会被丢掉。 |
| `NEXT_PUBLIC_DOWNLOAD_URL` | 有真实下载地址时 | `https://...` 或站内路径。空着则按钮去 `/download` 占位页。仓库里没有安装包。 |
| `NEXT_PUBLIC_GITHUB_URL` | 可选 | 页脚「源码」链接。空着则指向 `/download#source`。 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 可选 | 公开邮箱，问答区和页脚会变成 `mailto:`。 |

Search Console：

1. 用 `NEXT_PUBLIC_SITE_URL` 添加资源。
2. 验证方式选 HTML 标记。
3. 只把 `content` 填进 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`。
4. 重新构建并部署，再点验证。
5. 提交 `https://你的域名/sitemap.xml`。

`/robots.txt` 和 `/sitemap.xml` 由 `core/app/robots.ts`、`core/app/sitemap.ts` 生成。根布局输出 Open Graph、Twitter、canonical、robots 和 JSON-LD（`WebSite` 与 `SoftwareApplication`）。结构化数据里不把占位价格写成可购买报价。

部署用的主机、令牌、项目 ID 不在上面这张表里。它们在根目录 [.env.example](.env.example)，用法在 [DEPLOY.md](DEPLOY.md)。不要把 `GITHUB_TOKEN`、`GH_TOKEN`、`VERCEL_TOKEN` 写进任何会提交的文件。

## 部署

发布只跑 `./deploy.sh`。连到宝塔、GitHub、Vercel 的步骤默认只打印计划。加上 `--yes` 才会真的同步、推送或部署。

```bash
./deploy.sh build
./deploy.sh baota
./deploy.sh baota --yes
./deploy.sh github --yes
./deploy.sh vercel --yes
./deploy.sh all --yes
```

逐步说明、面板里的 nginx、干跑和 `--yes` 的差别、每条环境变量，都写在 [DEPLOY.md](DEPLOY.md)。Vercel 项目的 Root Directory 必须是 `core`。

## 截图

页面上的界面是标了「示意图」的内联图形，不是产品截图，也没有使用任何人的照片。

以后有真截图时放到下面这些路径。站点现在还不引用它们，文件不存在也不会 404。

| 建议路径 | 内容 |
| --- | --- |
| `core/public/screenshots/hero.png` | 首页扫描界面，用来换掉 SVG 时 |
| `core/public/screenshots/hidden-album.png` | 本人解锁后的隐藏相册 |
| `core/public/screenshots/chat-search.png` | 已保存的微信 / QQ 图片 |
| `core/public/screenshots/timeline.png` | 按日期筛选 |
| `core/public/screenshots/whatsapp.png` | 已保存的 WhatsApp 图片 |

`alt` 写清画面是什么。不要提交应用商店徽章或伪造的评价截图。

## 技术栈

Next.js 15、React 19、Tailwind CSS 4、TypeScript、App Router。没有数据库，也没有账号系统。

## 终端还停在旧目录时

如果项目目录被换掉时，终端还开在里面（常见于解压覆盖，旧目录被改名为 `*_backup_*`），先重新进入当前仓库再执行脚本：

```bash
cd /path/to/restore_picture_web_self
./deploy.sh build
```

否则 `BASH_SOURCE` 可能仍指向备份目录，构建的是旧副本。脚本若发现路径里带 `_backup_`，或旁边没有 `core/package.json`，会把解析到的目录打印出来。

## 许可

[MIT](LICENSE)。Apple、iPhone、微信、WeChat、QQ、WhatsApp 是各自权利人的名称，这里只用来说明用户可能保存过图片的地方。
