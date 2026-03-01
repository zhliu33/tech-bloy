import { useEffect } from 'react';
import { highlightElement } from '@/lib/highlight';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  useEffect(() => {
    // 高亮所有代码块
    document.querySelectorAll('pre code').forEach((block) => {
      highlightElement(block as HTMLElement);
    });
  }, [content]);

  return (
    <article
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
        prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-muted/50 prose-pre:border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1
        prose-li:text-muted-foreground
        prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
        prose-hr:border-muted
        prose-table:w-full prose-table:border-collapse
        prose-th:border prose-th:border-muted prose-th:p-3 prose-th:bg-muted/50 prose-th:font-semibold
        prose-td:border prose-td:border-muted prose-td:p-3"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
