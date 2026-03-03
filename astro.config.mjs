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
    // Markdown配置
    markdown: {
        shikiConfig: {
            // 使用单一主题，通过 CSS 变量适配深色模式
            theme: 'github-dark',
            wrap: true,
        },
    },
    // 开发服务器配置
    server: {
        port: 4321,
        host: true,
    },
});
