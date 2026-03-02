import type { APIRoute } from 'astro';
import { GITHUB_CONFIG } from '../../../consts';

// 获取GitHub内容
export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const path = url.searchParams.get('path') || 'src/content/blog';
    
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.OWNER}/${GITHUB_CONFIG.REPO}/contents/${path}?ref=${GITHUB_CONFIG.BRANCH}`,
            {
                headers: {
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
    } catch (error) {
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
        
        // 需要GitHub Token，这里使用环境变量
        const token = import.meta.env.GITHUB_TOKEN;
        
        if (!token) {
            return new Response(
                JSON.stringify({ error: 'GitHub token not configured' }), 
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
    } catch (error) {
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
        
        const token = import.meta.env.GITHUB_TOKEN;
        
        if (!token) {
            return new Response(
                JSON.stringify({ error: 'GitHub token not configured' }), 
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
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }), 
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
