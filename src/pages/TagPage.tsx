import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { githubService } from '@/services/github';
import type { Post } from '@/types/blog';
import { PostList } from '@/components/blog/PostList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!tag) return;

      setIsLoading(true);
      try {
        const fetchedPosts = await githubService.getPostsByTag(tag);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [tag]);

  const decodedTag = decodeURIComponent(tag || '');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/tags"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回标签列表
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <Badge variant="default" className="text-lg px-4 py-1">
              <Tag className="h-4 w-4 mr-2" />
              {decodedTag}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            标签: {decodedTag}
          </h1>
          <p className="text-muted-foreground text-lg">
            共 {posts.length} 篇文章
          </p>
        </div>

        {/* Posts */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <PostList
            posts={posts}
            emptyMessage={`暂无 "${decodedTag}" 标签的文章`}
          />
        )}

        {/* Actions */}
        <div className="mt-12 flex justify-center space-x-4">
          <Link to="/tags">
            <Button variant="outline">浏览其他标签</Button>
          </Link>
          <Link to="/posts">
            <Button>查看所有文章</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
