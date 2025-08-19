# Next.js Todo List 应用

一个功能完整的待办事项管理应用，使用 Next.js 15、TypeScript、Tailwind CSS 和 MySQL 数据库构建。

## 🚀 技术栈

- **前端框架**: Next.js 15
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **数据库**: MySQL
- **ORM**: Prisma
- **图标库**: Lucide React
- **图表库**: Recharts
- **通知库**: React Hot Toast
- **主题切换**: Next Themes

## ✨ 功能特性

### 核心功能
- ✅ 添加、编辑、删除任务
- ✅ 标记任务完成/未完成
- ✅ 任务列表展示
- ✅ 按创建时间排序
- ✅ 响应式设计

### 高级功能
- 📊 数据统计看板
- 📁 数据导入导出 (CSV)
- 🎨 深色模式切换
- 🔍 搜索和过滤
- 🏷️ 任务分类管理
- 📈 任务优先级管理

## 🚀 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd nextjs-to-do-list
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **生成 Prisma 客户端**
   ```bash
   pnpm db:generate
   ```

4. **启动开发服务器**
   ```bash
   pnpm dev
   ```

5. **访问应用**
   打开 [http://localhost:3000](http://localhost:3000)

### 部署到 Vercel

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
   - 点击 "Deploy"

3. **完成部署**
   Vercel 会自动检测 Next.js 项目并完成部署

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
├── lib/                   # 工具库
└── types/                 # TypeScript 类型定义
```

## 🔧 开发命令

```bash
# 开发服务器
pnpm dev

# 构建项目
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 数据库操作
pnpm db:generate    # 生成 Prisma 客户端
pnpm db:push        # 推送数据库模式
pnpm db:studio      # 打开 Prisma Studio
```

## 📊 数据库

项目使用 MySQL 数据库，数据库连接已配置在 `prisma/schema.prisma` 中。

## 🎨 主题

应用支持明暗主题切换，会自动跟随系统设置。

## 📱 响应式设计

应用完全响应式，支持桌面端、平板和移动设备。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License
