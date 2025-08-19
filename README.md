# Next.js 待办事项清单

一个功能丰富的待办事项管理应用，使用 Next.js 14、TypeScript、Tailwind CSS 和 Prisma 构建。

## 功能特性

### 核心功能
- ✅ 添加、编辑、删除待办事项
- ✅ 任务完成状态切换
- ✅ 任务优先级设置（低、中、高、紧急）
- ✅ 任务分类管理
- ✅ 原生拖拽排序（无需第三方库）
- ✅ 任务搜索功能
- ✅ 数据导入导出（CSV 格式）
- ✅ 统计分析和图表展示

### 拖拽排序功能
- 🎯 使用原生 HTML5 拖拽 API，性能更好
- 🎯 支持整个任务卡片拖拽
- 🎯 实时视觉反馈
- 🎯 自动保存排序到数据库
- 🎯 支持分类筛选下的拖拽排序

### 界面特性
- 🎨 Instagram 风格的现代化 UI
- 🌙 深色/浅色主题切换
- 📱 响应式设计
- ⚡ 流畅的动画效果
- 🎯 直观的用户体验

## 技术栈

- **前端**: Next.js 14, React 18, TypeScript
- **样式**: Tailwind CSS
- **数据库**: MySQL + Prisma ORM
- **部署**: Vercel
- **拖拽**: 原生 HTML5 Drag & Drop API

## 快速开始

### 环境要求
- Node.js 18+
- MySQL 数据库

### 安装依赖
```bash
npm install
```

### 数据库设置
```bash
# 生成 Prisma 客户端
npx prisma generate

# 推送数据库模式
npx prisma db push

# 或者运行迁移
npx prisma migrate dev
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 使用说明

### 拖拽排序
1. 点击右上角的"拖拽模式"按钮
2. 直接拖拽任务卡片或点击左侧的拖拽图标
3. 拖拽到目标位置释放即可完成排序
4. 排序会自动保存到数据库

### 分类管理
1. 在分类页面创建和管理分类
2. 为任务分配分类
3. 使用分类筛选功能

### 数据导入导出
1. 在导入导出页面下载当前数据
2. 支持 CSV 格式
3. 可以导入外部数据

## 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   ├── categories/     # 分类管理页面
│   ├── import-export/  # 导入导出页面
│   └── stats/          # 统计分析页面
├── components/         # React 组件
│   ├── home/          # 主页组件
│   ├── categories/    # 分类组件
│   ├── stats/         # 统计组件
│   └── ui/            # 通用 UI 组件
├── hooks/             # 自定义 Hooks
├── lib/               # 工具库
└── types/             # TypeScript 类型定义
```

## 部署

### Vercel 部署
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量（数据库连接等）
3. 自动部署

### 环境变量
```env
DATABASE_URL="mysql://user:password@host:port/database"
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
