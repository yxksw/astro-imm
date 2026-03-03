import type { APIRoute } from 'astro';
import { GITHUB_CONFIG } from '../../../consts';
import { fetchWithGitHubApp, type GitHubAppConfig } from '../../../utils/github-app';

// 获取 GitHub 认证配置
function getGitHubConfig(): GitHubAppConfig | null {
    const appId = import.meta.env.PUBLIC_GITHUB_APP_ID || GITHUB_CONFIG.APP_ID;
    const privateKey = import.meta.env.GITHUB_APP_PRIVATE_KEY;
    const owner = GITHUB_CONFIG.OWNER;
    const repo = GITHUB_CONFIG.REPO;

    if (!appId || !privateKey || appId === '-') {
        return null;
    }

    return {
        appId,
        privateKey: privateKey.replace(/\\n/g, '\n'),
        owner,
        repo,
    };
}

// 获取 GitHub Token（优先使用 GitHub App，否则使用 Personal Token）
async function getGitHubToken(): Promise<string | null> {
    // 1. 尝试使用 Personal Access Token
    const personalToken = import.meta.env.GITHUB_TOKEN;
    if (personalToken) {
        return personalToken;
    }

    // 2. 尝试使用 GitHub App
    const config = getGitHubConfig();
    if (config) {
        try {
            const { getInstallationToken } = await import('../../../utils/github-app');
            return await getInstallationToken(
                config.appId,
                config.privateKey,
                config.owner,
                config.repo
            );
        } catch (error) {
            console.error('GitHub App authentication failed:', error);
            return null;
        }
    }

    return null;
}

// 获取 GitHub 内容
export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const path = url.searchParams.get('path') || 'src/content/blog';

    try {
        const token = await getGitHubToken();

        if (!token) {
            return new Response(
                JSON.stringify({ error: 'GitHub authentication not configured. Please set GITHUB_TOKEN or GitHub App credentials in .env file.' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.OWNER}/${GITHUB_CONFIG.REPO}/contents/${path}?ref=${GITHUB_CONFIG.BRANCH}`,
            {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Astro-Blog-Editor',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// 创建或更新文章
export const POST: APIRoute = async ({ request }) => {
    try {
        const { path, content, message, sha } = await request.json();

        const token = await getGitHubToken();

        if (!token) {
            return new Response(
                JSON.stringify({ error: 'GitHub authentication not configured. Please set GITHUB_TOKEN or GitHub App credentials in .env file.' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const body: any = {
            message: message || 'Update from blog editor',
            content: Buffer.from(content).toString('base64'),
            branch: GITHUB_CONFIG.BRANCH,
        };

        if (sha) {
            body.sha = sha;
        }

        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.OWNER}/${GITHUB_CONFIG.REPO}/contents/${path}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${token}`,
                    'User-Agent': 'Astro-Blog-Editor',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// 删除文章
export const DELETE: APIRoute = async ({ request }) => {
    try {
        const { path, sha, message } = await request.json();

        const token = await getGitHubToken();

        if (!token) {
            return new Response(
                JSON.stringify({ error: 'GitHub authentication not configured. Please set GITHUB_TOKEN or GitHub App credentials in .env file.' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.OWNER}/${GITHUB_CONFIG.REPO}/contents/${path}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${token}`,
                    'User-Agent': 'Astro-Blog-Editor',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message || 'Delete from blog editor',
                    sha: sha,
                    branch: GITHUB_CONFIG.BRANCH,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `GitHub API error: ${response.status}`);
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
