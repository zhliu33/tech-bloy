import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TagCloudProps {
  tags: string[];
  selectedTag?: string;
  showCount?: boolean;
  tagCounts?: Record<string, number>;
}

export function TagCloud({
  tags,
  selectedTag,
  showCount = false,
  tagCounts = {},
}: TagCloudProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTag === tag;
        const count = tagCounts[tag] || 0;

        return (
          <Link key={tag} to={isSelected ? '/tags' : `/tag/${encodeURIComponent(tag)}`}>
            <Badge
              variant={isSelected ? 'default' : 'secondary'}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/20'
              }`}
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
              {showCount && count > 0 && (
                <span className="ml-1 opacity-70">({count})</span>
              )}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}
