import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, X } from 'lucide-react';
import { githubService } from '@/services/github';
import type { Post } from '@/types/blog';
import { PostList } from '@/components/blog/PostList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!initialQuery.trim()) {
        setPosts([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const results = await githubService.searchPosts(initialQuery);
        setPosts(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/posts"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回文章列表
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">搜索文章</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="输入关键词搜索文章..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              <Button type="submit" size="lg" disabled={!query.trim()}>
                <Search className="h-5 w-5 mr-2" />
                搜索
              </Button>
              {hasSearched && (
                <Button type="button" variant="outline" size="lg" onClick={clearSearch}>
                  清除
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {isLoading ? (
                  '搜索中...'
                ) : (
                  <>
                    &quot;{initialQuery}&quot; 的搜索结果
                    <span className="text-muted-foreground font-normal ml-2">
                      ({posts.length} 篇)
                    </span>
                  </>
                )}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <PostList
                posts={posts}
                emptyMessage={`未找到包含 "${initialQuery}" 的文章`}
              />
            )}
          </div>
        )}

        {/* Tips */}
        {!hasSearched && (
          <div className="bg-muted/50 rounded-xl p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">搜索提示</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>输入文章标题关键词</li>
              <li>搜索文章摘要内容</li>
              <li>使用标签名称搜索</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
