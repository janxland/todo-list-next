@echo off
echo ========================================
echo 🚀 快速部署到 Vercel
echo ========================================
echo.

echo 📋 检查环境...
echo.

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js
    pause
    exit /b 1
)
echo ✅ Node.js 已安装

REM 检查 pnpm
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pnpm 未安装，正在安装...
    npm install -g pnpm
)
echo ✅ pnpm 已安装

echo.
echo 🔧 开始部署流程...
echo.

REM 安装依赖
echo 📦 安装依赖...
pnpm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

REM 生成 Prisma 客户端
echo 🔧 生成 Prisma 客户端...
pnpm db:generate
if errorlevel 1 (
    echo ❌ Prisma 客户端生成失败
    pause
    exit /b 1
)

REM 构建项目
echo 🏗️ 构建项目...
pnpm run build
if errorlevel 1 (
    echo ❌ 项目构建失败
    pause
    exit /b 1
)

echo.
echo 🚀 准备部署到 Vercel...
echo.

REM 检查 Vercel CLI
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI 未安装，正在安装...
    npm install -g vercel
)

REM 检查是否已登录
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo 📝 需要登录 Vercel...
    vercel login
)

REM 检查是否已链接项目
if not exist ".vercel" (
    echo 📝 首次部署，需要链接 Vercel 项目...
    vercel link
)

REM 部署到 Vercel
echo 🚀 部署到 Vercel...
vercel --prod

echo.
echo ========================================
echo ✅ 部署完成！
echo ========================================
echo.
echo 📊 查看部署状态：
echo    https://vercel.com/dashboard
echo.
echo 💡 如果遇到问题，请查看：
echo    1. Vercel Dashboard 日志
echo    2. 环境变量配置
echo    3. 数据库连接状态
echo.
pause
