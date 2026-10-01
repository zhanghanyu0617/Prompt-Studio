#!/bin/bash
set -e

echo "=== 1. 构建 Next.js ==="
npm run build

echo "=== 2. OpenNext 构建 ==="
npx @opennextjs/cloudflare build --dangerouslyUseUnsupportedNextVersion

echo "=== 3. 准备 Pages 输出目录 ==="
rm -rf .open-next/pages-output
mkdir -p .open-next/pages-output
cp -r .open-next/assets/* .open-next/pages-output/
cp .open-next/worker.js .open-next/pages-output/_worker.js
cp -r .open-next/cloudflare .open-next/pages-output/
cp -r .open-next/cloudflare-templates .open-next/pages-output/
cp -r .open-next/middleware .open-next/pages-output/
cp -r .open-next/server-functions .open-next/pages-output/
cp -r .open-next/cache .open-next/pages-output/
cp -r .open-next/.build .open-next/pages-output/
rm -rf .open-next/pages-output/server-functions/default/node_modules

echo "=== 4. 修复静态资源处理（__ASSETS_RUN_WORKER_FIRST__） ==="
sed -i 's/__ASSETS_RUN_WORKER_FIRST__: false/__ASSETS_RUN_WORKER_FIRST__: true/' .open-next/pages-output/cloudflare/init.js

echo "=== 5. 部署到 Cloudflare Pages ==="
npx wrangler pages deploy .open-next/pages-output --project-name=prompt-studio --branch=main

echo "=== 部署完成！==="
