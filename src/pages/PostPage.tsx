import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, Bookmark } from 'lucide-react';
import { githubService } from '@/services/github';
import type { Post } from '@/types/blog';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { GiscusComments } from '@/components/blog/GiscusComments';
import { PostList } from '@/components/blog/PostList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
// 注意：marked和katex的配置已移至github.ts中，通过动态导入加载

// 辅助函数：格式化日期
type DateType = string | number | Date;

function formatDate(date: DateType): string {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  } else if (typeof date === 'number') {
    return new Date(date).toISOString().split('T')[0];
  }
  return date;
}

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      setIsLoading(true);
      try {
        const fetchedPost = await githubService.getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);

          // 获取相关文章
          const allPosts = await githubService.getPosts();
          const related = allPosts
            .filter(
              (p) =>
                p.id !== fetchedPost.id &&
                (p.category === fetchedPost.category ||
                  p.tags.some((tag) => fetchedPost.tags.includes(tag)))
            )
            .slice(0, 3);
          setRelatedPosts(related);

          // 检查是否已收藏
          const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
          setIsBookmarked(bookmarks.includes(slug));
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Failed to load post:', error);
        toast.error('加载文章失败');
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
  }, [slug, navigate]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    } catch {
      toast.error('复制失败');
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((id: string) => id !== slug);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setIsBookmarked(false);
      toast.success('已取消收藏');
    } else {
      bookmarks.push(slug);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast.success('已添加到收藏');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-32 bg-muted rounded animate-pulse mb-6" />
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse mb-4" />
          <div className="flex space-x-4 mb-8">
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
          <Link to="/posts">
            <Button>返回文章列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/posts"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回文章列表
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-10">
            {/* Category */}
            <Link to={`/category/${encodeURIComponent(post.category)}`}>
              <Badge className="mb-4">{post.category}</Badge>
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                {post.readingTime} 分钟阅读
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link key={tag} to={`/tag/${encodeURIComponent(tag)}`}>
                  <Badge variant="outline" className="hover:bg-primary/10">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
              <Button
                variant={isBookmarked ? 'default' : 'outline'}
                size="sm"
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? '已收藏' : '收藏'}
              </Button>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-10">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">标签:</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/tag/${encodeURIComponent(tag)}`}>
                      <Badge variant="secondary">{tag}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                分享文章
              </Button>
            </div>
          </footer>
        </article>

        {/* Comments */}
        <GiscusComments term={post.slug} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">相关文章</h2>
            <PostList posts={relatedPosts} columns={3} />
          </div>
        )}
      </div>
    </div>
  );
}