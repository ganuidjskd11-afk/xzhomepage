# 个人主页

一份纯静态的中文个人主页模板：无框架、无构建步骤、无外部 CDN 依赖，深浅色主题、响应式布局、滚动入场动画都内置。

站点文件在 `public/`，推送到 `main` 后由 GitHub Actions 自动发布到 GitHub Pages。

预计访问地址：<https://ganuidjskd11-afk.github.io/personal-homepage/>

## 本地预览

直接双击 `public/index.html` 即可，或在本目录起个静态服务：

```bash
python -m http.server 8000 --directory public
```

然后打开 <http://localhost:8000>。

## 部署步骤（只需做一次）

1. 在 GitHub 新建仓库 `personal-homepage`，设为 **Public**，**不要**勾选 Add README / .gitignore / license，保持空仓库。
   可以直接打开这个预填好参数的链接：<https://github.com/new?name=personal-homepage&description=Personal%20homepage&visibility=public>
2. 仓库 **Settings -> Pages -> Build and deployment -> Source** 选择 **GitHub Actions**。
   （这一步关键：不选的话 workflow 会报 "pages deployment not enabled"。）
3. 本地推送（仓库已 `git init`、已设好 `origin`、已有首次提交）：

   ```bash
   cd D:/work/personal-homepage
   git push -u origin main
   ```

4. 打开仓库的 **Actions** 页，等 `Deploy to GitHub Pages` 跑完（通常不到一分钟），访问上面的地址即可。

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
| `actions/configure-pages@v5` | 启用并配置 Pages |
| `actions/upload-pages-artifact@v3` | 把 `public/` 打包成站点产物 |
| `actions/deploy-pages@v4` | 发布，输出 `page_url` |

用的是官方 artifacts 部署通道，不走 Jekyll 构建，所以不需要 `_config.yml`。`.nojekyll` 作为保险保留在 `public/`。

## 需要替换的内容

`public/index.html` 里凡是有 `<!-- 替换这里：... -->` 注释的地方：

- `<title>` / description / keywords
- 品牌首字母（`.brand-mark`）、姓名、头像里的 `N`
- 首屏状态、身份定位、自我介绍、所在城市
- 三个社交链接（GitHub / 邮箱 / Telegram）
- 关于正文、技能标签、三个统计数字
- 三张项目卡片（复制 `<article class="card">` 可继续加）
- 时间线三条记录
- 联系邮箱、页脚署名

改主题色只需改 `public/assets/css/style.css` 顶部的 `--primary` 和 `--accent` 两个变量。

## 自定义域名（可选）

在仓库 **Settings -> Pages -> Custom domain** 填入域名，并按提示配置 DNS；同时在 `public/` 放一个纯文本的 `CNAME` 文件，内容只写域名一行。GitHub 会自动签发免费 HTTPS 证书。

## 目录结构

```
personal-homepage/
├── .github/workflows/deploy.yml   # 自动部署
├── public/                       # 实际发布的站点根目录
│   ├── index.html
│   ├── .nojekyll
│   └── assets/
│       ├── css/style.css
│       ├── js/main.js
│       └── img/favicon.svg
├── .gitignore
└── README.md
```

## 注意

- 站点资源全部用相对路径，因此部署在 `/personal-homepage/` 子路径下也不会失效。
- GitHub Pages 免费计划只支持从公开仓库发布；站点上限 1 GB，带宽软限制 100 GB/月。
- 纯静态托管，没有后端、数据库或服务端接口。
