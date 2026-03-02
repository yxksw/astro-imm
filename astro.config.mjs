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
            theme: 'github-light',
            wrap: true,
        },
    },
    // 开发服务器配置
    server: {
        port: 4321,
        host: true,
    },
});
