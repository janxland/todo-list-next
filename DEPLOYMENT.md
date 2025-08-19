# Vercel 自动化部署指南

## 🚀 快速部署

### 方法一：使用 Vercel Dashboard（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **在 Vercel 中导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 配置项目设置

3. **配置环境变量**
   - 在项目设置中添加环境变量：
   ```
   DATABASE_URL=mysql://todolist:ZWx52hMDc3wRc7RG@8.134.198.179:3306/todolist
   ```

4. **部署完成**
   - Vercel 会自动构建和部署你的应用

### 方法二：使用 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **链接项目**
   ```bash
   pnpm run setup:vercel
   ```

4. **部署**
   ```bash
   pnpm run deploy
   ```

### 方法三：使用部署脚本

#### Windows
```bash
scripts/deploy.bat
```

#### Linux/Mac
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## 🔧 GitHub Actions 自动化部署

### 1. 获取 Vercel 配置信息

1. **获取 VercEL_TOKEN**
   - 访问 [Vercel Account Settings](https://vercel.com/account/tokens)
   - 创建新的 Token

2. **获取项目信息**
   ```bash
   vercel link
   ```
   这会显示 `Project ID` 和 `Org ID`

### 2. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

- `VERCEL_TOKEN`: 你的 Vercel Token
- `VERCEL_ORG_ID`: 你的组织 ID
- `VERCEL_PROJECT_ID`: 你的项目 ID

### 3. 推送代码触发部署

```bash
git add .
git commit -m "Setup automated deployment"
git push origin main
```

## 📋 部署检查清单

### 部署前检查
- [ ] 代码已推送到 GitHub
- [ ] 环境变量已配置
- [ ] 数据库连接正常
- [ ] 所有依赖已安装

### 部署后检查
- [ ] 网站可以正常访问
- [ ] API 接口正常工作
- [ ] 数据库连接正常
- [ ] 功能测试通过

## 🔍 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 本地测试构建
   pnpm run build
   ```

2. **环境变量问题**
   - 检查 Vercel 项目设置中的环境变量
   - 确保变量名和值正确

3. **数据库连接问题**
   - 检查数据库服务器是否可访问
   - 验证连接字符串格式

4. **依赖安装问题**
   ```bash
   # 清理缓存
   pnpm store prune
   pnpm install
   ```

### 调试命令

```bash
# 本地开发
pnpm dev

# 构建测试
pnpm build

# 启动生产服务器
pnpm start

# 数据库操作
pnpm db:generate
pnpm db:push
pnpm db:studio
```

## 📊 监控和日志

### Vercel 监控
- 访问 Vercel Dashboard 查看部署状态
- 查看函数日志和性能指标
- 监控错误和异常

### 自定义域名
1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录
3. 等待 DNS 传播

## 🔄 持续部署

### 分支部署
- `main` 分支：生产环境
- `develop` 分支：开发环境
- 其他分支：预览环境

### 自动回滚
- Vercel 支持自动回滚到上一个稳定版本
- 在 Dashboard 中可以手动回滚

## 📞 支持

如果遇到部署问题：

1. 查看 [Vercel 文档](https://vercel.com/docs)
2. 检查 [GitHub Actions 日志](https://github.com/your-repo/actions)
3. 查看 [Vercel 函数日志](https://vercel.com/dashboard)

---

**注意**: 确保在生产环境中使用安全的数据库连接和适当的环境变量管理。
