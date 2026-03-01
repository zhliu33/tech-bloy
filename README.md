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
   修改 `src/services/github.ts` 文件中的 GitHub 配置：
   ```typescript
   const GITHUB_CONFIG = {
     owner: 'yourusername',  // 你的 GitHub 用户名
     repo: 'your-blog-repo', // 存放博客文章的仓库
     branch: 'main',         // 分支名称
     postsPath: 'posts',      // 文章存放路径
   };
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
├── package.json          # 项目配置
├── vite.config.ts        # Vite 配置
└── tsconfig.json         # TypeScript 配置
```

## 部署

### GitHub Pages

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到 GitHub Pages**
   - 手动部署：将 `dist` 目录内容推送到 `gh-pages` 分支
   - 自动部署：使用 GitHub Actions 自动构建和部署

### 其他静态托管服务

- **Vercel**: 直接导入 GitHub 仓库，自动部署
- **Netlify**: 连接 GitHub 仓库，设置构建命令为 `npm run build`
- **Cloudflare Pages**: 连接 GitHub 仓库，设置构建命令和输出目录

## 配置

### 主题配置

修改 `src/config/theme.ts` 文件：

```typescript
export const themeConfig: ThemeConfig = {
  name: 'TechFlow',
  description: '一个简洁优雅的开发者博客',
  author: {
    name: '开发者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=developer',
    bio: '热爱代码，热爱生活',
    social: {
      github: 'https://github.com',
      email: 'mailto:your-email@example.com',
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

MIT License

## 联系方式

- GitHub: [yourusername](https://github.com/yourusername)
- Email: your-email@example.com