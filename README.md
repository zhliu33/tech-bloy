# TechFlow

一个基于 React + TypeScript + Vite 构建的现代化开发者博客系统，使用 GitHub API 作为内容源。

## 功能特性

- ⚡ 极速加载 - 基于 Vite 构建，优化性能
- 🎨 深色模式 - 支持自动/手动切换主题
- 🔍 全文搜索 - 快速找到感兴趣的内容
- 🏷️ 标签分类 - 按主题浏览文章
- 💬 Giscus 评论 - 基于 GitHub Discussions 的评论系统
- 📱 响应式设计 - 完美适配各种设备
- 📦 静态部署 - 支持 GitHub Pages 等静态托管服务

## 技术栈

- **前端框架**: React 19
- **类型系统**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **路由管理**: React Router
- **UI 组件**: Radix UI
- **图标库**: Lucide React
- **Markdown 解析**: Gray Matter + Marked
- **评论系统**: Giscus

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/zhliu33/tech-bloy.git
   cd tech-bloy
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **配置 GitHub API**
   修改 `src/services/github.ts` 文件中的 GitHub 配置，或通过环境变量设置：
   ```typescript
   const GITHUB_CONFIG = {
     owner: import.meta.env.VITE_GITHUB_OWNER || 'yourusername',  // 你的 GitHub 用户名
     repo: import.meta.env.VITE_GITHUB_REPO || 'your-blog-repo', // 存放博客文章的仓库
     branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',         // 分支名称
     postsPath: import.meta.env.VITE_GITHUB_POSTS_PATH || 'posts',      // 文章存放路径
     token: import.meta.env.VITE_GITHUB_TOKEN || '', // GitHub 个人访问令牌（可选，用于提高 API 速率限制）
   };
   ```

   或在 `.env` 文件中设置环境变量：
   ```
   VITE_GITHUB_OWNER=yourusername
   VITE_GITHUB_REPO=your-blog-repo
   VITE_GITHUB_BRANCH=main
   VITE_GITHUB_POSTS_PATH=posts
   VITE_GITHUB_TOKEN=your-github-token
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

5. **构建生产版本**
   ```bash
   npm run build
   # 或
   yarn build
   ```

## 项目结构

```
├── src/
│   ├── components/       # 组件目录
│   │   ├── blog/         # 博客相关组件
│   │   ├── layout/       # 布局组件
│   │   └── ui/           # UI 组件
│   ├── config/           # 配置文件
│   ├── contexts/         # 上下文
│   ├── hooks/            # 自定义 Hooks
│   ├── lib/              # 工具库
│   ├── pages/            # 页面组件
│   ├── services/         # 服务
│   ├── types/            # 类型定义
│   ├── App.tsx           # 应用入口
│   ├── main.tsx          # 主入口
│   └── index.css         # 全局样式
├── public/               # 静态资源
├── dist/                 # 构建输出
├── .github/              # GitHub 配置
│   └── workflows/        # GitHub Actions 工作流
├── package.json          # 项目配置
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
├── .env                  # 环境变量文件（可选）
├── LICENSE               # 许可证文件
└── README.md             # 项目说明文件
```

## 部署

### GitHub Pages

本项目已配置 GitHub Actions 自动部署，无需手动操作。当你推送到 `main` 分支时，GitHub Actions 会自动构建并部署到 `gh-pages` 分支。

**配置步骤**：
1. 确保你的仓库已启用 GitHub Pages（设置 → Pages → 来源选择 `gh-pages` 分支）
2. 在仓库的 `Settings → Secrets and variables → Actions` 中添加以下环境变量：
   - `VITE_GITHUB_OWNER`: 你的 GitHub 用户名
   - `VITE_GITHUB_REPO`: 存放博客文章的仓库
   - `VITE_GITHUB_BRANCH`: 分支名称（通常为 main）
   - `VITE_GITHUB_POSTS_PATH`: 文章存放路径（通常为 posts）
   - `VITE_GITHUB_TOKEN`: GitHub 个人访问令牌（可选，用于提高 API 速率限制）

### 其他静态托管服务

- **Vercel**: 直接导入 GitHub 仓库，自动部署
- **Netlify**: 连接 GitHub 仓库，设置构建命令为 `npm run build`，输出目录为 `dist`
- **Cloudflare Pages**: 
  1. 连接 GitHub 仓库
  2. 设置构建命令为 `npm run build`
  3. 设置输出目录为 `dist`
  4. 在 "Environment variables" 中添加必要的环境变量（与 GitHub Actions 相同）
  5. 选择 Framework preset 为 "React"
  6. 触发构建和部署

## 配置

### 主题配置

修改 `src/config/theme.ts` 文件：

```typescript
export const themeConfig: ThemeConfig = {
  name: 'TechFlow',
  description: '一个简洁优雅的开发者博客，分享技术见解与实践经验',
  author: {
    name: 'yourname',
    avatar: 'your-avatar-url',
    bio: '热爱代码，热爱生活。分享前端开发、工程化实践与技术思考。',
    social: {
      github: 'https://github.com/yourusername',
    },
  },
  navigation: [
    { label: '首页', path: '/' },
    { label: '文章', path: '/posts' },
    { label: '标签', path: '/tags' },
    { label: '关于', path: '/about' },
  ],
  giscus: {
    repo: 'yourusername/your-blog-repo',
    repoId: 'your-repo-id',
    category: 'Announcements',
    categoryId: 'your-category-id',
  },
};
```

### Giscus 配置

1. 访问 [Giscus](https://giscus.app/) 生成配置
2. 将生成的配置复制到 `src/config/theme.ts` 文件中的 `giscus` 部分

## 写博客

1. 在 GitHub 仓库的 `postsPath` 目录下创建 Markdown 文件
2. 每个 Markdown 文件需要包含 front matter：

```markdown
---
title: 文章标题
date: 2024-01-01
author: 作者
category: 分类
tags:
  - 标签1
  - 标签2
excerpt: 文章摘要
coverImage: 封面图片 URL
---

文章内容...
```

## 开发指南

### 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 格式化代码
- 遵循 TypeScript 类型规范

### 测试

```bash
npm run test
# 或
yarn test
```

### 代码风格

- 使用 2 个空格缩进
- 使用单引号
- 大括号使用
- 箭头函数

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目使用 MIT 许可证，详情请参阅 [LICENSE] 文件。