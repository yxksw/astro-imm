// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    // 配置静态站点生成
    output: 'static',
    // 构建输出目录
    outDir: './dist',
    integrations: [mdx(), sitemap()],
    // Markdown 配置
    markdown: {
        // 使用 Prism.js 进行代码高亮，通过 CSS 适配深色模式
        syntaxHighlight: 'prism',
    },
    // 开发服务器配置
    server: {
        port: 4321,
        host: true,
    },
});
