# 待办事项清单 (Todo List)

一个基于 Next.js 15 和 TypeScript 构建的现代化待办事项管理应用。

## 技术栈

- **前端框架**: Next.js 15
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **数据库**: MySQL
- **ORM**: Prisma
- **图标库**: Lucide React
- **部署平台**: Vercel

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
- 🎨 现代化UI设计
- 📱 移动端优化
- ⚡ 实时状态更新

## 快速开始

### 环境要求

- Node.js 18+ 
- MySQL 数据库

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd nextjs-to-do-list
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   创建 `.env.local` 文件并添加数据库连接信息：
   ```env
   DATABASE_URL="mysql://todolist:ZWx52hMDc3wRc7RG@8.134.198.179:3306/todolist"
   ```

4. **初始化数据库**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
nextjs-to-do-list/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 路由
│   │   │   └── todos/      # 待办事项 API
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 主页面
│   ├── components/         # React 组件
│   │   ├── AddTodo.tsx     # 添加任务组件
│   │   ├── TodoItem.tsx    # 任务项组件
│   │   ├── LoadingSpinner.tsx # 加载状态组件
│   │   └── EmptyState.tsx  # 空状态组件
│   ├── lib/               # 工具库
│   │   ├── db.ts          # 数据库连接
│   │   └── utils.ts       # 工具函数
│   └── types/             # TypeScript 类型定义
│       └── todo.ts        # 待办事项类型
├── prisma/                # Prisma 配置
│   └── schema.prisma      # 数据库模式
├── public/                # 静态资源
├── vercel.json           # Vercel 部署配置
└── package.json          # 项目配置
```

## API 接口

### 获取所有任务
```http
GET /api/todos
```

### 创建新任务
```http
POST /api/todos
Content-Type: application/json

{
  "title": "任务标题",
  "description": "任务描述（可选）"
}
```

### 更新任务
```http
PUT /api/todos/[id]
Content-Type: application/json

{
  "title": "新标题",
  "description": "新描述",
  "completed": true
}
```

### 删除任务
```http
DELETE /api/todos/[id]
```

## 部署到 Vercel

1. **推送代码到 GitHub**
2. **在 Vercel 中导入项目**
3. **配置环境变量**
   - 在 Vercel 项目设置中添加 `DATABASE_URL` 环境变量
4. **部署完成**

## 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 生成 Prisma 客户端
npm run db:generate

# 推送数据库模式
npm run db:push

# 数据库迁移
npm run db:migrate
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
