import { Github, Twitter, Mail, MapPin, Calendar, Briefcase } from 'lucide-react';
import { themeConfig } from '@/config/theme';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function AboutPage() {
  const skills = [
    'React',
    'TypeScript',
    'Node.js',
    'Next.js',
    'Tailwind CSS',
    'GraphQL',
    'PostgreSQL',
    'Docker',
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto">
              <img
                src={themeConfig.author.avatar}
                alt={themeConfig.author.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {themeConfig.author.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            {themeConfig.author.bio}
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-3">
            {themeConfig.author.social?.github && (
              <a
                href={themeConfig.author.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
            )}
            {themeConfig.author.social?.twitter && (
              <a
                href={themeConfig.author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
            )}
            {themeConfig.author.social?.email && (
              <a href={themeConfig.author.social.email}>
                <Button variant="outline" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="flex items-center space-x-3 p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">位置</p>
                <p className="font-medium">中国</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-3 p-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">职业</p>
                <p className="font-medium">前端工程师</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-3 p-4">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">经验</p>
                <p className="font-medium">5+ 年</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* About Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">关于我</h2>
          <p className="text-muted-foreground">
            我是一名热爱技术的前端工程师，专注于构建高性能、用户友好的 Web 应用。
            在这个博客中，我分享我的技术见解、学习心得和实践经验。
          </p>
          <p className="text-muted-foreground">
            我相信持续学习和分享是成长的最佳方式。通过这个博客，我希望能够帮助更多的开发者，
            同时也记录下自己的技术成长之路。
          </p>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">技术栈</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Blog Info */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">关于博客</h2>
          <p className="text-muted-foreground">
            {themeConfig.name} 是一个基于 React + Vite 构建的博客，
            使用 GitHub Pages 作为内容源，Giscus 作为评论系统。
          </p>
          <p className="text-muted-foreground">博客特性包括：</p>
          <ul className="text-muted-foreground space-y-2">
            <li>⚡ 极速加载 - 基于 Vite 构建，优化性能</li>
            <li>🎨 深色模式 - 支持自动/手动切换主题</li>
            <li>🔍 全文搜索 - 快速找到感兴趣的内容</li>
            <li>🏷️ 标签分类 - 按主题浏览文章</li>
            <li>💬 Giscus 评论 - 基于 GitHub Discussions 的评论系统</li>
            <li>📱 响应式设计 - 完美适配各种设备</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">联系我</h2>
          <p className="text-muted-foreground mb-6">
            有任何问题或建议？欢迎通过以下方式联系我
          </p>
          <div className="flex justify-center space-x-4">
            {themeConfig.author.social?.email && (
              <a href={themeConfig.author.social.email}>
                <Button>
                  <Mail className="h-5 w-5 mr-2" />
                  发送邮件
                </Button>
              </a>
            )}
            {themeConfig.author.social?.github && (
              <a
                href={themeConfig.author.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
