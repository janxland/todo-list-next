# 获取 Vercel 配置信息

## 步骤 1：安装 Vercel CLI
```bash
npm install -g vercel
```

## 步骤 2：登录 Vercel
```bash
vercel login
```

## 步骤 3：链接项目
```bash
vercel link
```

这会显示类似以下信息：
```
✅  Linked to your-project-name (your-org-id/your-project-id)
```

## 步骤 4：获取 Token
访问：https://vercel.com/account/tokens
创建新的 Token

## 步骤 5：配置 GitHub Secrets
在 GitHub 仓库设置中添加：
- `VERCEL_TOKEN`: 你的 Vercel Token
- `VERCEL_ORG_ID`: 组织 ID
- `VERCEL_PROJECT_ID`: 项目 ID
