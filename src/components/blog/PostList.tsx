import type { Post } from '@/types/blog';
import { PostCard } from './PostCard';
import { FileText } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  variant?: 'default' | 'featured' | 'compact';
  columns?: 1 | 2 | 3;
  emptyMessage?: string;
}

export function PostList({
  posts,
  variant = 'default',
  columns = 3,
  emptyMessage = '暂无文章',
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-muted-foreground">
          {emptyMessage}
        </h3>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="space-y-8">
        {posts.length > 0 && <PostCard post={posts[0]} variant="featured" />}
        {posts.length > 1 && (
          <div className={`grid gap-6 md:grid-cols-2`}>
            {posts.slice(1).map((post) => (
              <PostCard key={post.id} post={post} variant="default" />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} variant="compact" />
        ))}
      </div>
    );
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} variant="default" />
      ))}
    </div>
  );
}
