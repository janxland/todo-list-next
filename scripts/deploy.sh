#!/bin/bash

# 部署脚本
echo "🚀 开始部署到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装，正在安装..."
    npm install -g vercel
fi

# 检查环境变量
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ 请设置 VERCEL_TOKEN 环境变量"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 生成 Prisma 客户端
echo "🔧 生成 Prisma 客户端..."
pnpm db:generate

# 构建项目
echo "🏗️ 构建项目..."
pnpm run build

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
vercel --prod --token $VERCEL_TOKEN

echo "✅ 部署完成！"
