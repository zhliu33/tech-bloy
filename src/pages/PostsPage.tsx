import { useEffect, useState } from 'react';
import type { Post } from '@/types/blog';
import { githubService } from '@/services/github';
import { PostList } from '@/components/blog/PostList';
import { TagCloud } from '@/components/blog/TagCloud';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedPosts, fetchedTags, fetchedCategories] = await Promise.all([
          githubService.getPosts(),
          githubService.getAllTags(),
          githubService.getAllCategories(),
        ]);
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
        setTags(fetchedTags);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = [...posts];

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 分类过滤
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // 排序
    switch (sortBy) {
      case 'date':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'readingTime':
        result.sort((a, b) => a.readingTime - b.readingTime);
        break;
    }

    setFilteredPosts(result);
  }, [posts, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">所有文章</h1>
          <p className="text-muted-foreground text-lg">
            共 {filteredPosts.length} 篇文章，探索技术的无限可能
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">最新发布</SelectItem>
                <SelectItem value="title">标题排序</SelectItem>
                <SelectItem value="readingTime">阅读时间</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Posts */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <PostList
                posts={filteredPosts}
                columns={viewMode === 'grid' ? 3 : 1}
                emptyMessage="没有找到匹配的文章"
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tags */}
            <div className="p-6 rounded-xl bg-card border">
              <h3 className="font-semibold mb-4">热门标签</h3>
              <TagCloud tags={tags.slice(0, 15)} />
            </div>

            {/* Categories */}
            <div className="p-6 rounded-xl bg-card border">
              <h3 className="font-semibold mb-4">分类</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const count = posts.filter((p) => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? 'all' : category
                        )
                      }
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <span>{category}</span>
                      <span
                        className={`text-xs ${
                          selectedCategory === category
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
