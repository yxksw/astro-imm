// 网站配置
export const SITE_TITLE = '我的博客';
export const SITE_DESCRIPTION = '欢迎来到我的博客';
export const SITE_URL = 'https://example.com';

// 作者信息
export const AUTHOR_NAME = '博主';
export const AUTHOR_AVATAR = '/favicon.svg';

// GitHub配置 - 用于内容管理
export const GITHUB_CONFIG = {
    OWNER: import.meta.env.PUBLIC_GITHUB_OWNER || 'your-username',
    REPO: import.meta.env.PUBLIC_GITHUB_REPO || 'your-blog-content',
    BRANCH: import.meta.env.PUBLIC_GITHUB_BRANCH || 'main',
    APP_ID: import.meta.env.PUBLIC_GITHUB_APP_ID || '',
} as const;

// 导航配置
export const NAV_LINKS = [
    { href: '/', text: '首页' },
    { href: '/archive', text: '归档' },
    { href: '/about', text: '关于' },
];

// 页脚配置
export const FOOTER_CONFIG = {
    copyrightStart: '2024',
    copyrightOwner: '博主',
    beianInfo: '', // ICP备案号
    poweredBy: [
        { name: 'Astro', url: 'https://astro.build' },
        { name: 'iMM Theme', url: '#' },
    ],
};

// 顶部导航栏配置
export const HEADER_CONFIG = {
    showTopBar: true,
    topTitle: SITE_TITLE,
    topDescription: SITE_DESCRIPTION,
    logoUrl: '/favicon.svg',
    logoSize: '64px',
    logoLink: '/',
    topTitleDark: false,
};
