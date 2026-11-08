## Preview

```bash
./build.sh preview
# or
./deploy.sh preview
```

Builds `core/`, then serves http://127.0.0.1:3847.

# 部署 Restore Picture

网站在 `core/`。发布入口是仓库根目录的 `./deploy.sh`。产品说明和本地 `pnpm dev` 在 [README.md](README.md)。

本文包含：命令、干跑和 `--yes`、两份环境变量、宝塔面板 nginx、GitHub 推送、Vercel（Root Directory = `core`）、以及不用宝塔时的 nginx。

没有 iOS 安装包，也没有支付。`NEXT_PUBLIC_DOWNLOAD_URL` 为空时，下载按钮停在 `/download`。

## 命令

在仓库根目录执行。远程动作（同步、推送、上线）不加 `--yes` 就只打印计划。

```bash
./deploy.sh                 # 打印用法，什么都不做
./deploy.sh build           # 在 core/ 里安装依赖并 next build（优先 pnpm，否则 corepack，再否则 npm）
./deploy.sh pack            # 打 dist/restore-picture-site.tar.gz，给宝塔文件管理器手工上传
./deploy.sh baota           # 只打印 rsync 计划
./deploy.sh baota --yes     # 真正同步并在服务器上构建
./deploy.sh github          # 只打印将要 push 的地址（令牌会打码）
./deploy.sh github --yes    # git push，禁止 --force
./deploy.sh vercel          # 只打印将要执行的 Vercel 命令
./deploy.sh vercel --yes    # 从 core/ 执行 vercel deploy --prod
./deploy.sh all --yes       # 先 build，再 baota、github、vercel
```

`--yes` 可以写成 `-y`。`DEPLOY_CONFIRM=1` 与 `--yes` 相同。`--dry-run` 强制只打印计划；如果 `--yes` 和 `--dry-run` 一起写，**后写的那个生效**。`--dry-run` 不会被 `DEPLOY_CONFIRM=1` 盖掉。

`build` 和 `pack` 只动本机，不需要 `--yes`。

`./deploy.sh build` 选择包管理器的顺序：

1. `PATH` 里有 `pnpm` 就用它。存在 `pnpm-lock.yaml` 时执行 `pnpm install --frozen-lockfile`。
2. 否则试 `corepack pnpm`。不行再 `corepack enable`，启用成功后再用 `pnpm`。
3. 否则用 `npm`。有 `package-lock.json` 时 `npm ci`；没有就 `npm install`。仓库目前只提交 `core/pnpm-lock.yaml`，所以回落到 npm 时走 `npm install`，不会删掉 pnpm 锁文件。
4. `node`、`npm`、`pnpm`、`corepack` 都不可用时，脚本退出并说明要装 Node.js 20+。

pnpm 10 及以后默认不跑依赖的安装脚本。`sharp`（`next/og` 会用到）必须被允许构建。`core/.npmrc` 里同时有 `onlyBuiltDependencies[]=sharp` 和 `dangerouslyAllowAllBuilds=true`。不要把它们写进 `package.json` 的 `pnpm` 字段，pnpm 12 会忽略那里的配置。

`./deploy.sh` 的第一次 `pnpm install` 就会带 `--config.dangerouslyAllowAllBuilds=true`。只有这次仍然报 `ERR_PNPM_IGNORED_BUILDS` 时，才再跑 `pnpm approve-builds --all -y` 并重装。没有 pnpm 时仍走 npm 回落，不走这条 pnpm 补救。

开始构建前会打印一行 `Using package manager: ...`。

命令只能是 `./deploy.sh`。`./deploy` 不能做成包装脚本：这个名字已经被 `deploy/` 目录占用（里面是 nginx）。执行 `./deploy` 或 `./deploy build` 会得到 `Permission denied`。

缺变量时脚本直接退出，并写出变量名，例如 `Missing BT_HOST`。它不会猜 git remote，也不会使用当前仓库的 `origin`。

## 两份环境变量

| 文件 | 复制成 | 给谁用 |
| --- | --- | --- |
| [core/.env.example](core/.env.example) | `core/.env.local` 或 `core/.env.production` | 站点：域名、Search Console、统计、下载链接 |
| [.env.example](.env.example) | 仓库根目录的 `.env` | `./deploy.sh`：宝塔、GitHub、Vercel |

`./deploy.sh` 会读取根目录 `.env`，以及 `core/.env`、`core/.env.local`、`core/.env.production`。已经在 shell 里 export 的变量优先，文件不会覆盖它们。

不要提交 `.env`、`.env.local`、`.env.production`。`GITHUB_TOKEN`、`GH_TOKEN`、`VERCEL_TOKEN` 只放在环境或未跟踪的 `.env` 里。示例文件里的令牌行是注释。

`NEXT_PUBLIC_*` 在构建时写进静态页面。改完要重新 `./deploy.sh build`，或让宝塔 / Vercel 再构建一次。

### 站点变量（core/.env.example）

| 变量 | 必填 | 说明 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 正式环境要填 | 源地址，无结尾斜杠，如 `https://example.com`。不填则 canonical 和 sitemap 使用 `http://localhost:3847`。 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | 做 Search Console 时 | 只要 HTML 标记的 content。贴整段 `<meta ... content="...">` 也可以，会取出 content。空的或不安全的值会被忽略，页面上不会出现验证标签。 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 否 | 只能是 `G-` 开头的 GA4 编号。否则不加载 gtag。 |
| `NEXT_PUBLIC_DOWNLOAD_URL` | 否 | `https://` 地址或站内路径。空则去 `/download`。 |
| `NEXT_PUBLIC_GITHUB_URL` | 否 | 页脚源码链接。空则 `/download#source`。 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 否 | 看起来像邮箱才会变成 `mailto:`。 |

Search Console 顺序：用正式域名添加资源 → 选 HTML 标记 → 把 content 写入 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → 重新构建部署 → 点验证 → 提交 `https://你的域名/sitemap.xml`。

`/robots.txt`、`/sitemap.xml` 来自 `core/app/robots.ts` 和 `core/app/sitemap.ts`。

### 部署变量（根目录 .env.example）

| 变量 | 用于 | 必填 |
| --- | --- | --- |
| `BT_HOST` | 宝塔 | `baota` 要填，主机名或 IP |
| `BT_USER` | 宝塔 | 否，默认 `root` |
| `BT_PATH` | 宝塔 | 要填。服务器上的绝对路径，不能是 `/`。只允许字母、数字、`/`、`.`、`_`、`-`。示例 `/www/wwwroot/restore-picture` |
| `BT_PORT` | 宝塔 | 否，默认 `22` |
| `BT_SSH_KEY` | 宝塔 | 否。不填则用 `~/.ssh/id_ed25519`，再试 `id_rsa`。文件必须存在 |
| `BT_RSYNC_DELETE` | 宝塔 | 否。设为 `1` 且加上 `--yes` 时，服务器上 `BT_PATH` 里多出来的文件会被删掉 |
| `BT_RESTART_CMD` | 宝塔 | 否。远程构建成功后在服务器上执行，例如 `pm2 reload restore-picture` |
| `GITHUB_REPOSITORY` | GitHub | `owner/name`。与 `GITHUB_REMOTE_URL` 二选一 |
| `GITHUB_REMOTE_URL` | GitHub | `https://github.com/owner/name.git` 或 `git@github.com:owner/name.git` |
| `GITHUB_BRANCH` | GitHub | 否，默认 `main` |
| `GITHUB_TOKEN` 或 `GH_TOKEN` | GitHub | https 远程要填。`git@github.com:` 不要填。不要写进 git |
| `VERCEL_TOKEN` | Vercel | `vercel` 要填。在 Vercel → Account → Tokens 创建 |
| `VERCEL_ORG_ID` | Vercel | `vercel` 要填。项目设置里的 Team / Org id，不是团队显示名 |
| `VERCEL_PROJECT_ID` | Vercel | `vercel` 要填。项目 id，不是项目名 |
| `VERCEL_SCOPE` | Vercel | 否。传给 `vercel --scope` 的团队 slug |

`GITHUB_FORCE=1` 也会被拒绝。脚本不做 force-push。

## 干跑和 --yes

| 命令 | 不加 `--yes` | 加上 `--yes` |
| --- | --- | --- |
| `build` | 直接在本机构建 | 同左，这个命令没有远程副作用 |
| `pack` | 直接打本地 tar 包 | 同左 |
| `baota` | 检查变量和密钥文件，打印目标主机，不连接 | `ssh` + `rsync`，然后在服务器上按同样的顺序选择 pnpm / corepack / npm 并构建 |
| `github` | 打印打码后的 push 地址 | 工作区必须干净，然后 `git push HEAD:<branch>` |
| `vercel` | 打印项目 id，不调用 CLI | 写入 `core/.vercel/project.json` 并 `vercel deploy --prod` |
| `all` | 会先真正 build，其余三个仍是干跑；缺变量则在对应步骤失败 | 四个都执行 |

干跑失败是故意的：缺 `BT_HOST`、`VERCEL_TOKEN` 或 GitHub 地址时立刻退出，避免你以为已经发出去了。

`baota` 的干跑**不会**登录服务器。它只确认本机密钥文件在不在。

## 宝塔

面板需要 Node.js 20 或更新（软件商店 → Node.js 版本管理器）。站点进程监听 `127.0.0.1:3847`。

### 用脚本同步

根目录 `.env` 示例：

```bash
BT_HOST=203.0.113.10
BT_USER=root
BT_PATH=/www/wwwroot/restore-picture
BT_PORT=22
BT_SSH_KEY=~/.ssh/id_ed25519
```

先看计划，再执行：

```bash
./deploy.sh baota
./deploy.sh baota --yes
```

`--yes` 时脚本会：

1. 用 `ssh -o BatchMode=yes` 连接。没有密钥、或密钥要密码时会失败，不会停下来问你。
2. `mkdir -p` 那个 `BT_PATH`。
3. `rsync core/`。排除 `node_modules`、`.next`、`.git`、`.env`、`.env.local`、`.env.*.local`、`.vercel`。
4. 把 `deploy/baota/remote-build.sh` 和 nginx 片段拷上去。服务器上的片段名叫 `baota-nginx.conf`。
5. 把当前环境里的 `NEXT_PUBLIC_*` 传给远程构建（不打印值）。服务器上的 `remote-build.sh` 用同一套规则选择 pnpm、corepack 或 npm，然后构建。远程脚本会打印 `Using package manager:`。
6. 若设置了 `BT_RESTART_CMD` 就运行它。否则只打印启动命令。

`.env.local` **不会**上传。要让线上构建看到域名和 Search Console 代码，在跑 `./deploy.sh baota --yes` 之前 export 这些 `NEXT_PUBLIC_*`，或把它们放进会随 `core/` 同步的 `core/.env.production`（此文件已被 git 忽略）。

`BT_RSYNC_DELETE=1` 并且 `--yes` 时，远端多出来的文件会被删除。默认关闭。

服务器上启动（脚本没替你常驻进程）：

```bash
cd /www/wwwroot/restore-picture
pnpm start -- -H 127.0.0.1 -p 3847
```

需要开机自启时，用宝塔的进程守护或 pm2，并把命令写进 `BT_RESTART_CMD`。这个字符串会在服务器上原样执行，只在你确认 `--yes` 之后。

### 不用 SSH，改用手上传

```bash
./deploy.sh pack
```

得到 `dist/restore-picture-site.tar.gz`（已在 `.gitignore`）。在宝塔文件里上传到网站目录并解压，然后：

```bash
bash deploy/baota/remote-build.sh /www/wwwroot/restore-picture
```

### 面板里的 nginx

配置在 [deploy/baota/nginx.conf](deploy/baota/nginx.conf)。同步之后在服务器上是 `BT_PATH/baota-nginx.conf`。

宝塔路径：网站 → 你的站点 → 设置 → 配置文件。

面板通常已经生成了 `listen 80` / `443` 的 `server`。不要再套一层 `server`，否则会抢端口。把文件里的两个 `location`（`/_next/static/` 和 `/`）放进已有的 `server`，删掉面板自带的 PHP 段和 `try_files ... /index.html`。这不是静态站，也不是 SPA。

也可以用面板「反向代理」，目标 URL 填 `http://127.0.0.1:3847`，再补上 `/_next/static/` 的长缓存。

SSL 用宝塔自己的证书开关。证书路径类似 `/www/server/panel/vhost/cert/你的域名/`。不要把私钥提交进仓库。HSTS 只在 HTTPS 已经生效之后打开。

普通 VPS（不是宝塔）用 [deploy/nginx.conf](deploy/nginx.conf)，放到 `/etc/nginx/conf.d/`，不要拿它替换主配置 `nginx.conf`。

## GitHub

脚本不读取 `origin`，所以不会把代码推到这个克隆本来指向的远程。必须设置 `GITHUB_REPOSITORY` 或 `GITHUB_REMOTE_URL`。

HTTPS，需要令牌：

```bash
export GITHUB_REPOSITORY=your-org/restore-picture
export GITHUB_TOKEN=...          # 或 GH_TOKEN。不要提交
./deploy.sh github               # 先看打码后的地址
./deploy.sh github --yes         # push HEAD 到 main
```

SSH，不需要令牌：

```bash
export GITHUB_REMOTE_URL=git@github.com:your-org/restore-picture.git
./deploy.sh github --yes
```

`--yes` 时工作区必须干净（`git status` 不能有未提交改动），否则拒绝推送。输出里的 URL 会把令牌换成 `***`。分支默认 `main`，用 `GITHUB_BRANCH` 改。永远不会 `--force`。

仓库描述可以用 README 开头的英文段落。建议 topics：`iphone` `photo-recovery` `hidden-photos` `recently-deleted` `wechat` `qq` `whatsapp` `nextjs` `tailwindcss` `landing-page`。

## Vercel

项目设置里 **Root Directory 填 `core`**。框架选 Next.js。安装命令 `pnpm install`，构建命令 `pnpm build`。不要填静态输出目录。`core/vercel.json` 只关闭了 trailing slash。安全响应头在 `core/next.config.ts`。

把 [core/.env.example](core/.env.example) 里的 `NEXT_PUBLIC_*` 加到 Vercel 的 Production（需要的话也加 Preview）。改环境变量后要重新部署，因为这些值在构建时写死。

### 面板导入

Import Git repository → Root Directory 选 `core` → 填环境变量 → Deploy。这条路不用 `./deploy.sh`。

### 命令行

Org id 和 Project id 在 Vercel 项目设置里，形如 `team_...` 和 `prj_...`，不是显示名称。

```bash
export VERCEL_TOKEN=...
export VERCEL_ORG_ID=team_xxxxxxxx
export VERCEL_PROJECT_ID=prj_xxxxxxxx
./deploy.sh vercel           # 干跑
./deploy.sh vercel --yes
```

`--yes` 会把 `core/.vercel/project.json` 写好（已被 gitignore），再执行 `npx vercel deploy --prod --yes`。令牌不会打印出来。可选 `VERCEL_SCOPE` 传给 `--scope`。

## 不用宝塔的 nginx

```bash
./deploy.sh build
cd core && pnpm start -- -H 127.0.0.1 -p 3847
sudo cp deploy/nginx.conf /etc/nginx/conf.d/restore-picture.conf
sudo nginx -t && sudo systemctl reload nginx
```

`deploy/nginx.conf` 反代到 `127.0.0.1:3847`，打开 gzip，并带上安全响应头。HTTPS 的 `server` 是注释，等证书就绪再打开。不要改成 `try_files $uri /index.html`。

## 一次做完

变量在根目录 `.env` 和 `core/.env.local`（或已 export）都准备好之后：

```bash
./deploy.sh all          # 本机构建；三个远程只打印计划
./deploy.sh all --yes    # 构建、同步宝塔、推 GitHub、部署 Vercel
```

任一步缺变量，整次命令会在那一步停住。先分别跑 `baota`、`github`、`vercel` 的干跑，确认计划再加 `--yes`。

## 排错

`pnpm: command not found`：不用先单独装 pnpm。重新执行 `./deploy.sh build`。脚本会改用 `corepack pnpm` 或 `npm`。若提示找不到 `node`，先安装 Node.js 20 或更新版本，新开一个终端再跑。

`./deploy` 或 `./deploy build` 出现 `Permission denied`：`deploy` 是目录，不是命令，也不能在旁边再放一个叫 `deploy` 的文件。用 `./deploy.sh build`。

`ERR_PNPM_IGNORED_BUILDS`（常见于 pnpm 12 和 `sharp`）：在 `core/` 里执行

```bash
pnpm install --config.dangerouslyAllowAllBuilds=true
```

然后回到仓库根目录再跑 `./deploy.sh build`。`core/.npmrc` 里应有 `onlyBuiltDependencies[]=sharp` 和 `dangerouslyAllowAllBuilds=true`。脚本的第一次安装已经带了同一个 flag；只有这次仍报这个错，才会再跑 `pnpm approve-builds --all -y`。不要把这项写进 `package.json`。

目录被覆盖之后，旧终端还停在里面：先 `cd` 到当前仓库（例如 `cd /path/to/restore_picture_web_self`），再执行脚本。不重新进入的话，`BASH_SOURCE` 可能仍指向名字里带 `_backup_` 的旧目录，构建和同步的都是那份备份。脚本发现这种路径时会警告，并打印它解析到的目录。
