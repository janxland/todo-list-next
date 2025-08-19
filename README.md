# 待办事项清单 (Todo List)

一个基于 Next.js 15 和 TypeScript 构建的现代化待办事项管理应用。

## 🚀 在线演示

访问在线应用：[https://your-app.vercel.app](https://your-app.vercel.app)

## 技术栈

- **前端框架**: Next.js 15
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **数据库**: MySQL
- **ORM**: Prisma
- **图标库**: Lucide React
- **部署平台**: Vercel
- **包管理器**: pnpm

## 功能特性

### 核心功能 ✅
- ✅ 添加新的待办任务（标题+描述）
- ✅ 编辑和删除任务
- ✅ 标记任务完成/未完成状态
- ✅ 任务列表展示（显示所有任务）
- ✅ 任务按创建时间排序
- ✅ 响应式设计（移动端友好）
- ✅ 合理的错误处理
- ✅ 加载状态提示
- ✅ 空状态处理

### 加分功能 🚀
- 📊 数据统计看板（任务完成率统计）
- 📁 数据导入导出（CSV格式）
- 🎨 深色模式支持
- 🔍 高级搜索和过滤
- 📱 移动端优化
- ⚡ 实时状态更新

## 快速开始

### 环境要求

- Node.js 18+ 
- pnpm 8+
- MySQL 数据库

### 本地开发

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd nextjs-to-do-list
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **配置环境变量**
   
   创建 `.env.local` 文件并添加数据库连接信息：
   ```env
   DATABASE_URL="mysql://todolist:ZWx52hMDc3wRc7RG@8.134.198.179:3306/todolist"
   ```

4. **初始化数据库**
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

5. **启动开发服务器**
   ```bash
   pnpm dev
   ```

6. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🚀 部署到 Vercel

### 一键部署

运行部署脚本：
```bash
# Windows
deploy-vercel.bat

# 或使用 npm 脚本
pnpm run deploy
```

### 手动部署

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

### GitHub Actions 自动化部署

1. **配置 GitHub Secrets**
   - `VERCEL_TOKEN`: Vercel API Token
   - `VERCEL_ORG_ID`: 组织 ID
   - `VERCEL_PROJECT_ID`: 项目 ID

2. **推送代码触发部署**
   ```bash
   git push origin main
   ```

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 项目结构

```
nextjs-to-do-list/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 路由
│   │   │   ├── todos/      # 待办事项 API
│   │   │   ├── categories/ # 分类管理 API
│   │   │   └── stats/      # 统计 API
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 主页面
│   ├── components/         # React 组件
│   │   ├── AddTodo.tsx     # 添加任务组件
│   │   ├── TodoItem.tsx    # 任务项组件
│   │   ├── StatsDashboard.tsx # 统计看板
│   │   ├── DataImportExport.tsx # 数据导入导出
│   │   ├── LoadingSpinner.tsx # 加载状态
│   │   └── EmptyState.tsx  # 空状态
│   ├── lib/               # 工具库
│   │   ├── db.ts          # 数据库连接
│   │   └── utils.ts       # 工具函数
│   └── types/             # TypeScript 类型定义
│       └── todo.ts        # 待办事项类型
├── prisma/                # Prisma 配置
│   └── schema.prisma      # 数据库模式
├── scripts/               # 部署脚本
├── .github/               # GitHub Actions
├── vercel.json           # Vercel 配置
└── package.json          # 项目配置
```

## API 接口

### 任务管理
```http
GET    /api/todos          # 获取所有任务
POST   /api/todos          # 创建新任务
PUT    /api/todos/[id]     # 更新任务
DELETE /api/todos/[id]     # 删除任务
```

### 分类管理
```http
GET    /api/categories     # 获取所有分类
POST   /api/categories     # 创建新分类
```

### 数据操作
```http
GET    /api/stats          # 获取统计数据
GET    /api/todos/export   # 导出数据
POST   /api/todos/import   # 导入数据
POST   /api/todos/batch    # 批量操作
```

## 开发命令

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 数据库操作
pnpm db:generate    # 生成 Prisma 客户端
pnpm db:push        # 推送数据库模式
pnpm db:migrate     # 数据库迁移
pnpm db:studio      # 打开 Prisma Studio

# 部署
pnpm deploy         # 部署到生产环境
pnpm deploy:dev     # 部署到开发环境
pnpm setup:vercel   # 链接 Vercel 项目
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-username/nextjs-to-do-list/issues)
- 邮箱: your-email@example.com

---

**⭐ 如果这个项目对你有帮助，请给它一个星标！**
