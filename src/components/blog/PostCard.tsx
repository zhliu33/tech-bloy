import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import type { Post } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <Link to={`/post/${post.slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            {post.coverImage && (
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
              </div>
            )}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.date)}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readingTime} 分钟
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        to={`/post/${post.slug}`}
        className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {post.excerpt}
          </p>
          <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readingTime} 分钟
            </span>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </Link>
    );
  }

  return (
    <Card className="group h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <Link to={`/post/${post.slug}`} className="block h-full">
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <Badge>{post.category}</Badge>
            </div>
          </div>
        )}
        <CardHeader className={post.coverImage ? 'pt-4' : 'pt-6'}>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-2">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readingTime} 分钟
            </span>
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-end">
              <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                阅读更多
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
