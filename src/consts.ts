// 网站配置
export const SITE_TITLE = '塔罗会';
export const SITE_DESCRIPTION = '欢迎来到塔罗会~';
export const SITE_URL = 'https://example.com';

// 作者信息
export const AUTHOR_NAME = '异飨客';
export const AUTHOR_AVATAR = 'https://cdn.jsdmirror.com/gh/zsxcoder/github-img@main/img/yxk-avatar.avif';

// GitHub配置 - 用于内容管理
export const GITHUB_CONFIG = {
    OWNER: import.meta.env.PUBLIC_GITHUB_OWNER || 'your-username',
    REPO: import.meta.env.PUBLIC_GITHUB_REPO || 'your-blog-content',
    BRANCH: import.meta.env.PUBLIC_GITHUB_BRANCH || 'main',
    APP_ID: import.meta.env.PUBLIC_GITHUB_APP_ID || '',
} as const;

// 顶部导航栏配置
export const HEADER_CONFIG = {
    // 是否显示顶部栏
    showTopBar: true,
    // 顶部标题（显示在头像左侧）
    topTitle: '塔罗会',
    // 顶部标题字体颜色
    topTitleColor: '#ffc400ff',
    // 顶部描述（显示在头像下方）
    topDescription: '每一段旅行，都有终点。',
    // 顶部描述字体颜色
    topDescriptionColor: '#ffc400ff',
    // Logo图片URL（头像）
    logoUrl: 'https://cdn.jsdmirror.com/gh/zsxcoder/github-img@main/img/yxk-avatar.avif',
    // Logo链接
    logoLink: '/',
    // 背景图片URL
    headerBgImage: 'https://img.314926.xyz/h', // 例如: '/images/header-bg.jpg'
    // 背景视频URL（优先于图片）
    headerBgVideo: '', // 例如: '/videos/header-bg.mp4'
    // 返回按钮位置: 'left' | 'right'
    backButtonPosition: 'left' as const,
    // 返回按钮文字
    backButtonText: '返回首页',
    // 返回按钮图标颜色
    backButtonColor: '#ffc400ff',
    // 设置按钮图标颜色
    settingButtonColor: '#ffc400ff',
};

// 导航配置
export const NAV_LINKS = [
    { href: '/', text: '首页' },
    { href: '/archive', text: '归档' },
    { href: '/about', text: '关于' },
];

// 页脚配置
export const FOOTER_CONFIG = {
    copyrightStart: '2026',
    copyrightOwner: '异飨客',
    beianInfo: '', // ICP备案号
    poweredBy: [
        { name: 'Astro', url: 'https://astro.build' },
        { name: 'iMM', url: '#' },
    ],
};
