@echo off
echo 🚀 开始部署到 Vercel...

REM 检查是否安装了 Vercel CLI
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI 未安装，正在安装...
    npm install -g vercel
)

REM 检查环境变量
if "%VERCEL_TOKEN%"=="" (
    echo ❌ 请设置 VERCEL_TOKEN 环境变量
    pause
    exit /b 1
)

REM 安装依赖
echo 📦 安装依赖...
pnpm install

REM 生成 Prisma 客户端
echo 🔧 生成 Prisma 客户端...
pnpm db:generate

REM 构建项目
echo 🏗️ 构建项目...
pnpm run build

REM 部署到 Vercel
echo 🚀 部署到 Vercel...
vercel --prod --token %VERCEL_TOKEN%

echo ✅ 部署完成！
pause
