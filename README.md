# 个人主页

「赛博修仙」的程序员个人主页：简约清新的竹青配色，无框架、无构建步骤、无外部 CDN 依赖，深浅色主题、响应式布局、滚动入场动画都内置。全站文案已按人设填好。

站点文件在 `public/`，推送到 `main` 后由 GitHub Actions 自动发布到 GitHub Pages。

远端仓库名：`xzhomepage`　本地目录：`D:\work\personal-homepage`（两者不必一致）

预计访问地址：<https://ganuidjskd11-afk.github.io/xzhomepage/>

## 本地预览

直接双击 `public/index.html` 即可，或在本目录起个静态服务：

```bash
python -m http.server 8000 --directory public
```

然后打开 <http://localhost:8000>。

## 部署步骤（只需做一次）

1. 在 GitHub 新建仓库 `xzhomepage`，设为 **Public**，**不要**勾选 Add README / .gitignore / license，保持空仓库。
   预填参数的链接：<https://github.com/new?name=xzhomepage&description=Personal%20homepage&visibility=public>
2. 创建完成后打开 <https://github.com/ganuidjskd11-afk/xzhomepage/settings/pages>，
   也就是仓库 **Settings → 左侧 Code and automation / 代码和自动化 → Pages / 页面**。
   在 **Build and deployment / 生成和部署** 里，把 **Source / 源** 那个**下拉框点开**；
   里面有 `Deploy from a branch` 和 `GitHub Actions` 两项，选 **GitHub Actions**，页面会自动保存。

   - 仓库还没创建时这个设置页根本不存在，这是「找不到 GitHub Actions 选项」最常见的原因。
   - 下拉框默认显示 `Deploy from a branch`，不点开看起来就像只有一个选项。
   - 如果刚建的空仓库暂时没显示 Source 下拉，先做第 3 步 push 一次，再回来刷新。
   - 这一步只能在网页做：工作流里的 `GITHUB_TOKEN` 是仓库管理权限，`configure-pages` 无法代替它创建 Pages 站点。
3. 本地推送（仓库已 `git init`、已设好 `origin`、已有首次提交）：

   ```bash
   cd D:/work/personal-homepage
   git push -u origin main
   ```

   创建仓库后 GitHub 会显示一段 Quick setup 命令，**不要照抄**（那是给空仓库初始化 README 用的），只跑上面这一行。
4. 打开 <https://github.com/ganuidjskd11-afk/xzhomepage/actions>，等 `Deploy to GitHub Pages` 跑完（通常不到一分钟）。
   如果第一次运行时 Pages 还没启用导致失败，点 **Re-run all jobs** 重跑一次即可。

之后每次 `git push` 到 `main` 都会自动重新部署；也可以在 Actions 页手动 `Run workflow`。

## SSH 密钥

本机 `~/.ssh/config` 没有 `github.com` 的 Host 段，默认密钥认证会失败；已验证 `~/.ssh/github_ganui` 对应账号 `ganuidjskd11-afk`。本仓库已写入仓库级配置：

```bash
git config --local core.sshCommand "ssh -i C:/Users/WIT_User/.ssh/github_ganui -o IdentitiesOnly=yes"
```

因此直接 `git push` 就能认证。换一台机器 clone 后，把密钥路径改成那台机器的实际路径再执行一次即可；也可以在 `~/.ssh/config` 里加一个 `Host github.com` 段统一处理。

## 自动部署原理

`.github/workflows/deploy.yml`：

| 步骤 | 作用 |
| :--- | :--- |
| `actions/checkout@v4` | 拉代码 |
| `actions/configure-pages@v5` | 读取 Pages 站点配置（站点需已在网页启用） |
| `actions/upload-pages-artifact@v3` | 把 `public/` 打包成站点产物 |
| `actions/deploy-pages@v4` | 发布，输出 `page_url` |

用的是官方 artifacts 部署通道，不走 Jekyll 构建，所以不需要 `_config.yml`。`.nojekyll` 作为保险保留在 `public/`。

## 只剩这一处需要你替换

页面全部文案已按「赛博修仙」的程序员人设填好，唯一需要你提供的是**邮箱地址**：

- 在 `public/index.html` 里搜索 `hello@example.com`，共 2 处（首屏社交区、联系区按钮），换成你的真实邮箱。
- Telegram 暂用 `https://t.me/xiaozhuzhuxz`（沿用旧站），不需要就删掉那个 `<li>` 或改链接。
- 三张作品卡片的链接目前都指向 GitHub 主页，有具体仓库时把 `href` 换成仓库地址。

想微调版式或配色，改 `public/assets/css/style.css` 顶部的 `--primary`（竹青）与 `--accent`（暖金）两个变量即可；深浅色两套变量分别写在 `:root` 和 `[data-theme="dark"]` 里。

## 下载按钮

首屏「点击下载」指向天翼云盘分享：<https://cloud.189.cn/web/share?code=vYfE3e3IB3Q3>，访问码 `1le0`。
链接在 `public/index.html` 的 `.btn-download`；访问码同时写在 `.code-copy` 的 `data-code` 和按钮文字里（两处要一致），点一下可复制，逻辑在 `public/assets/js/main.js`。换分享地址或访问码时改这几处即可。

## 自定义域名（可选）

在仓库 **Settings -> Pages -> Custom domain** 填入域名，并按提示配置 DNS；同时在 `public/` 放一个纯文本的 `CNAME` 文件，内容只写域名一行。GitHub 会自动签发免费 HTTPS 证书。

## 目录结构

```
D:/work/personal-homepage/        # 本地目录；远端仓库名为 xzhomepage
├── .github/workflows/deploy.yml   # 自动部署
├── public/                       # 实际发布的站点根目录
│   ├── index.html
│   ├── .nojekyll
│   └── assets/
│       ├── css/style.css
│       ├── js/main.js
│       └── img/favicon.svg
├── .gitattributes
├── .gitignore
└── README.md
```

## 注意

- 站点资源全部用相对路径，因此部署在 `/xzhomepage/` 子路径下也不会失效。
- 站点 URL 由**远端仓库名**决定，改仓库名就要同步改 Pages 里显示的访问地址。
- GitHub Pages 免费计划只支持从公开仓库发布；站点上限 1 GB，带宽软限制 100 GB/月。
- 纯静态托管，没有后端、数据库或服务端接口。
