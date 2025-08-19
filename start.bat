@echo off
echo 正在启动待办事项应用...
echo.

echo 1. 安装依赖...
npm install

echo.
echo 2. 生成 Prisma 客户端...
npm run db:generate

echo.
echo 3. 推送数据库模式...
npm run db:push

echo.
echo 4. 启动开发服务器...
npm run dev

pause
