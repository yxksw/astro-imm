# Astro iMM Theme Blog

一个使用 Astro 构建的博客，复刻了 Typecho iMM 主题的样式，并集成了 GitHub App 内容管理功能。

## 特性

- 🎨 **复刻 iMM 主题样式** - 完美还原 Typecho iMM 主题的设计
- 🌙 **深色模式支持** - 自动适配系统深色模式
- 📱 **响应式设计** - 适配各种设备屏幕
- 🔍 **站内搜索** - 快速搜索文章内容
- 📅 **文章归档** - 按时间轴查看文章
- 💡 **图片灯箱** - 点击图片查看大图
- ✏️ **在线编辑器** - 通过 GitHub API 管理文章
- 🚀 **多平台部署** - 支持 Vercel、GitHub Pages、Cloudflare Pages

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/your-blog.git
cd your-blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并填写配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# GitHub配置 - 用于内容管理
PUBLIC_GITHUB_OWNER=your-github-username
PUBLIC_GITHUB_REPO=your-blog-content-repo
PUBLIC_GITHUB_BRANCH=main
PUBLIC_GITHUB_APP_ID=your-github-app-id

# GitHub Token - 用于编辑器保存文章（需要repo权限）
GITHUB_TOKEN=ghp_your_personal_access_token

# 网站配置
PUBLIC_SITE_URL=https://your-blog.vercel.app
```

### 4. 本地开发

```bash
npm run dev
```

访问 http://localhost:4321 查看博客。

### 5. 构建

```bash
npm run build
```

构建输出在 `dist` 目录。

## 文章写作

### 方式一：本地 Markdown 文件

在 `src/content/blog/` 目录下创建 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
pubDate: '2024-01-01'
updatedDate: '2024-01-15'
isTop: true
isAdvertise: false
position: '北京'
positionUrl: 'https://maps.google.com/?q=Beijing'
---

文章内容，支持 **Markdown** 语法。
```

### 方式二：在线编辑器

1. 访问 `/admin/editor`
2. 配置 GitHub Token（需要 `repo` 权限）
3. 使用编辑器创建、编辑、删除文章

## 部署

### Vercel

1. 在 [Vercel](https://vercel.com) 导入项目
2. 配置环境变量
3. 自动部署

### GitHub Pages

1. 启用 GitHub Pages（Settings > Pages > Source: GitHub Actions）
2. 推送代码到 main 分支
3. GitHub Actions 自动构建部署

### Cloudflare Pages

1. 在 [Cloudflare Dashboard](https://dash.cloudflare.com) 创建 Pages 项目
2. 连接 Git 仓库
3. 构建命令：`npm run build`
4. 输出目录：`dist`

## 目录结构

```
├── src/
│   ├── components/      # 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── PostCard.astro
│   ├── content/         # 文章内容
│   │   └── blog/
│   ├── layouts/         # 布局
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── pages/           # 页面
│   │   ├── index.astro
│   │   ├── archive.astro
│   │   ├── search.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   │   └── [...slug].astro
│   │   ├── admin/
│   │   │   └── editor.astro
│   │   └── api/
│   │       └── github/
│   │           └── posts.ts
│   ├── styles/          # 样式
│   │   └── global.css
│   └── consts.ts        # 配置文件
├── public/              # 静态资源
├── astro.config.mjs     # Astro 配置
└── package.json
```

## 配置说明

### 网站配置 (`src/consts.ts`)

```typescript
export const SITE_TITLE = '我的博客';
export const SITE_DESCRIPTION = '欢迎来到我的博客';
export const AUTHOR_NAME = '博主';
export const AUTHOR_AVATAR = '/favicon.svg';

// 导航链接
export const NAV_LINKS = [
    { href: '/', text: '首页' },
    { href: '/archive', text: '归档' },
    { href: '/about', text: '关于' },
];

// 页脚配置
export const FOOTER_CONFIG = {
    copyrightStart: '2024',
    copyrightOwner: '博主',
    beianInfo: '', // ICP备案号
};

// 顶部导航栏配置
export const HEADER_CONFIG = {
    showTopBar: true,
    topTitle: SITE_TITLE,
    topDescription: SITE_DESCRIPTION,
    logoUrl: '/favicon.svg',
};
```

### 文章 Frontmatter

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 文章标题（必填） |
| description | string | 文章描述 |
| pubDate | string | 发布日期（必填） |
| updatedDate | string | 更新日期 |
| isTop | boolean | 置顶文章 |
| isAdvertise | boolean | 广告标记 |
| position | string | 位置信息 |
| positionUrl | string | 位置链接 |
| heroImage | string | 封面图片 |

## 自定义样式

编辑 `src/styles/global.css` 修改主题样式。

## 许可证

MIT License
