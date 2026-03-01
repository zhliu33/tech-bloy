import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindcssAnimate from 'tailwindcss-animate'

// 集成配置
export const viteConfig = defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          darkMode: ["class"],
          content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
          theme: {
            extend: {
              colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                  DEFAULT: "hsl(var(--primary))",
                  foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                  DEFAULT: "hsl(var(--secondary))",
                  foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                  DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                  foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
                },
                muted: {
                  DEFAULT: "hsl(var(--muted))",
                  foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                  DEFAULT: "hsl(var(--accent))",
                  foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                  DEFAULT: "hsl(var(--popover))",
                  foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                  DEFAULT: "hsl(var(--card))",
                  foreground: "hsl(var(--card-foreground))",
                },
                sidebar: {
                  DEFAULT: "hsl(var(--sidebar-background))",
                  foreground: "hsl(var(--sidebar-foreground))",
                  primary: "hsl(var(--sidebar-primary))",
                  "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                  accent: "hsl(var(--sidebar-accent))",
                  "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                  border: "hsl(var(--sidebar-border))",
                  ring: "hsl(var(--sidebar-ring))",
                },
              },
              borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                xs: "calc(var(--radius) - 6px)",
              },
              boxShadow: {
                xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              },
              keyframes: {
                "accordion-down": {
                  from: { height: "0" },
                  to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                  from: { height: "var(--radix-accordion-content-height)" },
                  to: { height: "0" },
                },
                "caret-blink": {
                  "0%,70%,100%": { opacity: "1" },
                  "20%,50%": { opacity: "0" },
                },
              },
              animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "caret-blink": "caret-blink 1.25s ease-out infinite",
              },
            },
          },
          plugins: [tailwindcssAnimate],
        }),
        autoprefixer(),
      ],
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // 调整警告阈值为1500kB
    rollupOptions: {
      output: {
        manualChunks: {
          radix: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip'
          ],
          ui: ['class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'],
          charts: ['recharts'],
          marked: ['marked'],
          katex: ['katex'],
          'gray-matter': ['gray-matter'],
          'highlight.js': ['highlight.js']
        }
      }
    }
  }
});

export default viteConfig;
