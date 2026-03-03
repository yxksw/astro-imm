// GitHub App 认证工具
// 参考: https://github.com/YYsuni/2025-blog-public

export interface GitHubAppConfig {
    appId: string;
    privateKey: string;
    owner: string;
    repo: string;
    installationId?: string;
}

// 生成 JWT (JSON Web Token)
export async function generateJWT(appId: string, privateKey: string): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iat: now - 60,  // 签发时间（提前60秒防止时钟偏移）
        exp: now + 600, // 过期时间（10分钟）
        iss: appId,     // GitHub App ID
    };

    // 使用 Web Crypto API 签名
    const header = { alg: 'RS256', typ: 'JWT' };
    const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '');
    const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '');
    const signingInput = `${encodedHeader}.${encodedPayload}`;

    // 导入私钥
    const pemHeader = '-----BEGIN RSA PRIVATE KEY-----';
    const pemFooter = '-----END RSA PRIVATE KEY-----';
    const pemContents = privateKey
        .replace(pemHeader, '')
        .replace(pemFooter, '')
        .replace(/\s/g, '');
    
    const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
    
    const cryptoKey = await crypto.subtle.importKey(
        'pkcs8',
        binaryDer.buffer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );

    // 签名
    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        cryptoKey,
        new TextEncoder().encode(signingInput)
    );

    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/=/g, '');

    return `${signingInput}.${encodedSignature}`;
}

// 获取 Installation Access Token
export async function getInstallationToken(
    appId: string,
    privateKey: string,
    owner: string,
    repo: string
): Promise<string> {
    // 1. 生成 JWT
    const jwt = await generateJWT(appId, privateKey);

    // 2. 获取 Installation ID
    const installResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/installation`,
        {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Astro-Blog-Editor',
            },
        }
    );

    if (!installResponse.ok) {
        throw new Error(`Failed to get installation: ${installResponse.status}`);
    }

    const installData = await installResponse.json();
    const installationId = installData.id;

    // 3. 获取 Installation Access Token
    const tokenResponse = await fetch(
        `https://api.github.com/app/installations/${installationId}/access_tokens`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Astro-Blog-Editor',
            },
        }
    );

    if (!tokenResponse.ok) {
        throw new Error(`Failed to get access token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    return tokenData.token;
}

// 使用 GitHub App 认证调用 API
export async function fetchWithGitHubApp(
    url: string,
    options: RequestInit = {},
    config: GitHubAppConfig
): Promise<Response> {
    const token = await getInstallationToken(
        config.appId,
        config.privateKey,
        config.owner,
        config.repo
    );

    const headers = new Headers(options.headers);
    headers.set('Authorization', `token ${token}`);
    headers.set('Accept', 'application/vnd.github.v3+json');
    headers.set('User-Agent', 'Astro-Blog-Editor');

    return fetch(url, {
        ...options,
        headers,
    });
}
