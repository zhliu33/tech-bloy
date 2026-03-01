import type { Post } from '@/types/blog';
import matter from 'gray-matter';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// 配置 marked 以支持数学公式
marked.use({
  extensions: [
    {
      name: 'math',
      level: 'inline',
      start(src) { return src.indexOf('$'); },
      tokenizer(src) {
        const match = src.match(/^\$+([^$]+)\$+/);
        if (match) {
          return {
            type: 'math',
            raw: match[0],
            text: match[1].trim()
          };
        }
      },
      renderer(token) {
        return katex.renderToString(token.text, {
          throwOnError: false,
          displayMode: token.raw.startsWith('$$') && token.raw.endsWith('$$')
        });
      }
    }
  ]
});

// GitHub 配置 - 优先从环境变量读取，其次使用默认值
const GITHUB_CONFIG = {
  owner: import.meta.env.VITE_GITHUB_OWNER || 'facebook',
  repo: import.meta.env.VITE_GITHUB_REPO || 'react',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  postsPath: import.meta.env.VITE_GITHUB_POSTS_PATH || 'fixtures/packaging',
};



export class GitHubService {
  private owner: string;
  private repo: string;
  private branch: string;
  private postsPath: string;

  constructor(config?: Partial<typeof GITHUB_CONFIG>) {
    this.owner = config?.owner || GITHUB_CONFIG.owner;
    this.repo = config?.repo || GITHUB_CONFIG.repo;
    this.branch = config?.branch || GITHUB_CONFIG.branch;
    this.postsPath = config?.postsPath || GITHUB_CONFIG.postsPath;
  }

  // 获取文章列表
  async getPosts(): Promise<Post[]> {
    try {
      // 尝试从GitHub获取
      const response = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.postsPath}?ref=${this.branch}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch from GitHub');
      }

      const files = await response.json();
      const mdFiles = files.filter((file: any) => file.name.endsWith('.md'));

      const posts = await Promise.all(
        mdFiles.map(async (file: any) => {
          const contentResponse = await fetch(file.download_url);
          const content = await contentResponse.text();
          return this.parsePostContent(content, file.name);
        })
      );

      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('GitHub fetch failed:', error);
      // 不返回备用数据，直接抛出错误
      throw error;
    }
  }

  // 获取单篇文章
  async getPost(slug: string): Promise<Post | null> {
    try {
      const posts = await this.getPosts();
      return posts.find(post => post.slug === slug) || null;
    } catch (error) {
      console.error('Failed to get post:', error);
      return null;
    }
  }

  // 解析文章内容
  private parsePostContent(content: string, filename: string): Post {
    const { data, content: markdownContent } = matter(content);
    const slug = filename.replace('.md', '');
    
    // 计算阅读时间（假设平均阅读速度为每分钟200字）
    const wordCount = markdownContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      id: slug,
      title: data.title || 'Untitled',
      slug,
      excerpt: data.excerpt || markdownContent.slice(0, 150) + '...',
      content: marked(markdownContent) as string,
      date: data.date || new Date(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      category: data.category || 'Uncategorized',
      coverImage: data.coverImage,
      readingTime: Math.max(1, readingTime),
    };
  }

  // 按标签筛选文章
  async getPostsByTag(tag: string): Promise<Post[]> {
    const posts = await this.getPosts();
    return posts.filter(post => post.tags.includes(tag));
  }

  // 按分类筛选文章
  async getPostsByCategory(category: string): Promise<Post[]> {
    const posts = await this.getPosts();
    return posts.filter(post => post.category === category);
  }

  // 搜索文章
  async searchPosts(query: string): Promise<Post[]> {
    const posts = await this.getPosts();
    const lowerQuery = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // 获取所有标签
  async getAllTags(): Promise<string[]> {
    const posts = await this.getPosts();
    const tagsSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }

  // 获取所有分类
  async getAllCategories(): Promise<string[]> {
    const posts = await this.getPosts();
    const categoriesSet = new Set<string>();
    posts.forEach(post => {
      categoriesSet.add(post.category);
    });
    return Array.from(categoriesSet).sort();
  }
}

export const githubService = new GitHubService();
