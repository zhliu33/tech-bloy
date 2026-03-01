import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Hash } from 'lucide-react';
import { githubService } from '@/services/github';
import type { Post } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TagWithCount {
  name: string;
  count: number;
  posts: Post[];
}

export function TagsPage() {
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedPosts, fetchedTags] = await Promise.all([
          githubService.getPosts(),
          githubService.getAllTags(),
        ]);

        // 计算每个标签的文章数量
        const tagData: TagWithCount[] = fetchedTags.map((tag) => {
          const tagPosts = fetchedPosts.filter((post) => post.tags.includes(tag));
          return {
            name: tag,
            count: tagPosts.length,
            posts: tagPosts.slice(0, 3),
          };
        });

        // 按文章数量排序
        tagData.sort((a, b) => b.count - a.count);

        setTags(tagData);
      } catch (error) {
        console.error('Failed to load tags:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 w-48 bg-muted rounded animate-pulse mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Hash className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">所有标签</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            共 {tags.length} 个标签，按主题浏览文章
          </p>
        </div>

        {/* Tag Cloud */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <Link key={tag.name} to={`/tag/${encodeURIComponent(tag.name)}`}>
                <Badge
                  variant="secondary"
                  className={`text-base px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors ${
                    tag.count > 5 ? 'text-lg' : tag.count > 2 ? 'text-base' : 'text-sm'
                  }`}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {tag.name}
                  <span className="ml-2 opacity-70">({tag.count})</span>
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Tag Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag) => (
            <Card key={tag.name} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-primary" />
                    {tag.name}
                  </CardTitle>
                  <Badge variant="outline">{tag.count} 篇</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {tag.posts.length > 0 ? (
                  <ul className="space-y-2">
                    {tag.posts.map((post) => (
                      <li key={post.id}>
                        <Link
                          to={`/post/${post.slug}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                    {tag.count > 3 && (
                      <li>
                        <Link
                          to={`/tag/${encodeURIComponent(tag.name)}`}
                          className="text-sm text-primary hover:underline"
                        >
                          查看更多...
                        </Link>
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">暂无文章</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
