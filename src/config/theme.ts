import type { ThemeConfig } from '@/types/blog';

export const themeConfig: ThemeConfig = {
  name: 'DevBlog',
  description: '一个简洁优雅的开发者博客，分享技术见解与实践经验',
  author: {
    name: '开发者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=developer',
    bio: '热爱代码，热爱生活。分享前端开发、工程化实践与技术思考。',
    social: {
      github: 'https://github.com/zhliu33',
    },
  },
  navigation: [
    { label: '首页', path: '/' },
    { label: '文章', path: '/posts' },
    { label: '标签', path: '/tags' },
    { label: '关于', path: '/about' },
  ],
  giscus: {
    repo: 'zhliu33/tech-bloy',
    repoId: 'R_kgDORaa4Lw',
    category: 'Announcements',
    categoryId: 'DIC_kwDORaa4L84C3WWk',
  },
};

export default themeConfig;
