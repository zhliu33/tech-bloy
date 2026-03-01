import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { themeConfig } from '@/config/theme';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface GiscusCommentsProps {
  term?: string;
}

export function GiscusComments({ term: _term }: GiscusCommentsProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  const loadGiscusScript = () => {
    const container = containerRef.current;
    if (!container) return;

    // 从环境变量读取配置，其次使用默认值
    const giscusConfig = {
      repo: import.meta.env.VITE_GISCUS_REPO || themeConfig.giscus.repo,
      repoId: import.meta.env.VITE_GISCUS_REPO_ID || themeConfig.giscus.repoId,
      category: import.meta.env.VITE_GISCUS_CATEGORY || themeConfig.giscus.category,
      categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID || themeConfig.giscus.categoryId,
    };

    // 清除之前的内容
    container.innerHTML = '';

    // 创建 Giscus script 元素
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);
    scriptLoaded.current = true;
  };

  useEffect(() => {
    if (scriptLoaded.current) return;
    loadGiscusScript();
  }, []);

  // 处理主题变化
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: theme === 'dark' ? 'dark' : 'light',
            },
          },
        },
        'https://giscus.app'
      );
    }
  }, [theme]);

  // 监听消息
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      
      const data = event.data;
      if (typeof data === 'object' && data.giscus) {
        // 调整高度
        if (data.giscus.resizeHeight) {
          const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
          if (iframe) {
            iframe.style.height = `${data.giscus.resizeHeight}px`;
          }
        }
        
        // 退出登录
        if (data.giscus.signOut) {
          localStorage.removeItem('giscus-session');
          toast.success('已成功退出登录');
          scriptLoaded.current = false;
          // 重新加载脚本以更新状态
          loadGiscusScript();
        }
        
        // 登录成功
        if (data.giscus.login) {
          toast.success('登录成功！');
        }
        
        // 错误处理
        if (data.giscus.error) {
          const error = data.giscus.error;
          console.error('[giscus] Error:', error);
          if (error.includes('Bad credentials') || error.includes('Invalid state value')) {
            if (localStorage.getItem('giscus-session')) {
              localStorage.removeItem('giscus-session');
              toast.error('登录状态已过期，请重新登录');
              scriptLoaded.current = false;
              // 重新加载脚本
              loadGiscusScript();
            }
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 处理退出登录
  const handleLogout = () => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            signOut: true,
          },
        },
        'https://giscus.app'
      );
    }
  };

  // 检查是否已登录
  const isLoggedIn = !!localStorage.getItem('giscus-session');

  return (
    <div className="mt-12 pt-8 border-t">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">评论</h3>
        {isLoggedIn && (
          <Button variant="outline" size="sm" onClick={handleLogout}>
            退出登录
          </Button>
        )}
      </div>
      <div ref={containerRef} className="giscus" />
    </div>
  );
}