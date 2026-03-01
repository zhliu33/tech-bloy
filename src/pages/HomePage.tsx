import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Code2, Zap } from 'lucide-react';
import { githubService } from '@/services/github';
import type { Post } from '@/types/blog';
import { PostList } from '@/components/blog/PostList';
import { TagCloud } from '@/components/blog/TagCloud';
import { Button } from '@/components/ui/button';
import { themeConfig } from '@/config/theme';

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedPosts, fetchedTags] = await Promise.all([
          githubService.getPosts(),
          githubService.getAllTags(),
        ]);
        setPosts(fetchedPosts.slice(0, 5));
        setTags(fetchedTags.slice(0, 10));
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>欢迎来到 {themeConfig.name}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            分享技术见解
            <br />
            <span className="text-primary">探索代码之美</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {themeConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/posts">
              <Button size="lg" className="w-full sm:w-auto">
                <BookOpen className="h-5 w-5 mr-2" />
                浏览文章
              </Button>
            </Link>
            <Link to="/tags">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Code2 className="h-5 w-5 mr-2" />
                探索标签
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">高性能</h3>
              <p className="text-muted-foreground text-sm">
                基于 React 和 Vite 构建，极速加载体验
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">技术深度</h3>
              <p className="text-muted-foreground text-sm">
                深入探讨前端技术和工程化实践
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">持续更新</h3>
              <p className="text-muted-foreground text-sm">
                定期分享最新的技术见解和实践经验
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">最新文章</h2>
              <p className="text-muted-foreground">探索最新的技术分享</p>
            </div>
            <Link to="/posts">
              <Button variant="ghost" className="hidden sm:flex items-center">
                查看全部
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <PostList posts={posts} variant="featured" />
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/posts">
              <Button variant="outline">查看全部文章</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">热门标签</h2>
          <p className="text-muted-foreground mb-8">按主题浏览文章</p>
          <div className="flex justify-center">
            <TagCloud tags={tags} />
          </div>
          <div className="mt-8">
            <Link to="/tags">
              <Button variant="outline">查看所有标签</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
