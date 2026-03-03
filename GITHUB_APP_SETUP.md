# GitHub App 设置指南

本文档介绍如何创建和配置 GitHub App，用于博客内容管理。

## 什么是 GitHub App？

GitHub App 是一种官方推荐的方式，可以让你的博客通过 API 读写 GitHub 仓库内容，无需使用个人账号密码。

## 创建 GitHub App

### 1. 进入开发者设置

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单最下方 → **Developer settings**
4. 点击 **GitHub Apps** → **New GitHub App**

### 2. 填写 App 信息

| 字段 | 填写内容 |
|------|----------|
| **GitHub App name** | 任意名称，如 `MyBlog Editor` |
| **Homepage URL** | 你的博客地址，如 `https://your-blog.vercel.app` |
| **Webhook** | 取消勾选 **Active**（不需要） |

### 3. 设置权限

在 **Repository permissions** 部分，设置以下权限：

| 权限 | 访问级别 |
|------|----------|
| **Contents** | **Read and write** |
| **Metadata** | **Read-only**（默认） |

### 4. 创建 App

点击 **Create GitHub App** 按钮创建。

### 5. 获取 App ID

创建成功后，在 App 详情页面顶部可以看到 **App ID**，记录下来。

### 6. 生成私钥

1. 在 App 详情页面，向下滚动到 **Private keys** 部分
2. 点击 **Generate a private key**
3. 私钥文件会自动下载（`.pem` 文件）
4. **重要**：妥善保管此私钥，不要上传到公开仓库

### 7. 安装 App

1. 在 App 详情页面，点击左侧 **Install App**
2. 选择你要管理的仓库
3. 点击 **Install**

## 配置博客

### 1. 复制环境变量文件

```bash
cp .env.example .env
```

### 2. 编辑 .env 文件

```env
# GitHub App ID
PUBLIC_GITHUB_APP_ID=123456

# GitHub App Private Key（.pem 文件的全部内容）
# 可以使用以下命令转换私钥格式：
# awk 'NF {sub(/\r/, ""); printf "%s\\n", $0}' your-key.pem
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
...
-----END RSA PRIVATE KEY-----"

# GitHub 仓库配置
PUBLIC_GITHUB_OWNER=your-github-username
PUBLIC_GITHUB_REPO=your-blog-repo
PUBLIC_GITHUB_BRANCH=main
```

### 私钥格式处理

如果私钥包含换行符，需要转义：

**Linux/Mac:**
```bash
awk 'NF {sub(/\r/, ""); printf "%s\\n", $0}' private-key.pem
```

**Windows PowerShell:**
```powershell
(Get-Content private-key.pem -Raw).Replace("`r`n", "\n").Replace("`n", "\n")
```

**手动处理：**
将私钥文件内容复制，把实际的换行符替换为 `\n`。

## 验证配置

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问编辑器：
   ```
   http://localhost:4321/admin/editor
   ```

3. 点击 **"加载文章列表"**
   - 如果显示文章列表，说明配置成功
   - 如果显示错误，检查 `.env` 文件配置

## 常见问题

### Q: 使用 Personal Access Token 还是 GitHub App？

**GitHub App（推荐）：**
- ✅ 更安全，私钥不关联个人账号
- ✅ 可以精确控制权限
- ✅ 适合团队协作
- ❌ 配置稍微复杂

**Personal Access Token：**
- ✅ 配置简单
- ❌ 关联个人账号
- ❌ 需要定期更换

### Q: 私钥泄露了怎么办？

1. 立即在 GitHub App 设置中删除该私钥
2. 生成新的私钥
3. 更新 `.env` 文件
4. 重新部署

### Q: 可以管理多个仓库吗？

可以，在 **Install App** 步骤中选择多个仓库，或者在已安装的 App 设置中添加仓库。

### Q: 部署到 Vercel/Cloudflare 后如何使用？

将 `.env` 文件中的环境变量添加到部署平台的环境变量设置中。

**Vercel:**
1. 进入项目 → Settings → Environment Variables
2. 添加所有以 `PUBLIC_` 和 `GITHUB_` 开头的变量

**Cloudflare Pages:**
1. 进入项目 → Settings → Environment variables
2. 添加所有环境变量

## 安全建议

1. **永远不要提交 `.env` 文件到 Git**
2. **定期轮换私钥**（建议每 90 天）
3. **限制 App 权限**，只给必要的仓库权限
4. **监控 API 调用**，在 GitHub App 设置中查看活动日志

## 参考文档

- [GitHub Apps 官方文档](https://docs.github.com/en/developers/apps)
- [Authenticating with GitHub Apps](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps)
