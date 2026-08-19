# Prompt Studio - AI创作工作台

功能强大的AI创作工作台，支持AI对话、图片生成、视频生成等功能。

## 技术栈

- **前端框架**: Next.js 14 (App Router) + TypeScript
- **UI组件**: Naive UI + Tailwind CSS
- **状态管理**: Zustand
- **数据库**: Supabase PostgreSQL
- **认证**: Supabase Auth
- **部署**: Cloudflare Pages
- **AI Provider**: AGNES

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd prompt-studio
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local`，并填写您的配置：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AGNES API 配置
AGNES_API_KEY=sk-JQe3pJYGIVgbO2pAgX5o4KdeEVWF8EiIq8fYxllirEsLMFOy
AGNES_BASE_URL=https://api.agnes-ai.com

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Prompt Studio

# 支付配置（易支付）
PAYMENT_MERCHANT_ID=150
PAYMENT_MERCHANT_KEY=QqAlgOwucP6uQIxIhpVnFK288UXwhIxB
PAYMENT_SOFTWARE_KEY=DQExOMh4pPtAiTtxKAWI9NNpwfIwfZZn
PAYMENT_API_URL=https://pay.mx88.top/mapi.php
PAYMENT_SUBMIT_URL=https://pay.mx88.top/submit.php
```

### 4. 配置 Supabase 数据库

1. 访问 https://supabase.com 创建项目
2. 进入 SQL Editor
3. 执行 `supabase/schema.sql` 文件中的SQL
4. 在 Authentication → Users 中创建管理员账户
5. 在 `admin_users` 表中插入管理员记录

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 部署到 Cloudflare Pages

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 连接 Cloudflare Pages

1. 登录 Cloudflare Dashboard
2. 进入 Pages → 创建项目
3. 连接您的 GitHub 仓库
4. 配置构建设置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `.next`
   - **Node.js 版本**: `18.x` 或 `20.x`

### 3. 配置环境变量

在 Cloudflare Pages 项目设置中添加环境变量：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
AGNES_API_KEY=sk-JQe3pJYGIVgbO2pAgX5o4KdeEVWF8EiIq8fYxllirEsLMFOy
AGNES_BASE_URL=https://api.agnes-ai.com
NEXT_PUBLIC_APP_URL=https://your-domain.pages.dev
NEXT_PUBLIC_APP_NAME=Prompt Studio
PAYMENT_MERCHANT_ID=150
PAYMENT_MERCHANT_KEY=QqAlgOwucP6uQIxIhpVnFK288UXwhIxB
PAYMENT_SOFTWARE_KEY=DQExOMh4pPtAiTtxKAWI9NNpwfIwfZZn
PAYMENT_API_URL=https://pay.mx88.top/mapi.php
PAYMENT_SUBMIT_URL=https://pay.mx88.top/submit.php
```

### 4. 部署

点击 "Save and Deploy"，等待部署完成。

## 项目结构

```
prompt-studio/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── api/               # API Routes
│   │   ├── dashboard/         # 工作台
│   │   ├── chat/              # AI对话
│   │   ├── image/             # 图片生成
│   │   ├── video/             # 视频生成
│   │   ├── gallery/           # 我的作品
│   │   ├── quota/             # 额度中心
│   │   ├── pricing/           # 套餐购买
│   │   ├── profile/           # 个人中心
│   │   ├── admin/             # 管理后台
│   │   ├── login/             # 登录页
│   │   └── register/          # 注册页
│   ├── components/            # 组件
│   │   ├── ui/                # 基础UI组件
│   │   ├── sidebar.tsx        # 侧边栏
│   │   ├── 3d-card.tsx        # 3D卡片
│   │   └── stateful-button.tsx # 状态按钮
│   ├── lib/                   # 工具库
│   │   ├── supabase.ts        # Supabase客户端
│   │   └── utils.ts           # 工具函数
│   ├── store/                 # 状态管理
│   │   └── auth.ts            # 认证状态
│   └── types/                 # TypeScript类型
│       └── supabase.ts        # Supabase类型
├── supabase/
│   └── schema.sql             # 数据库Schema
├── public/                    # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.local                 # 环境变量
```

## 功能特性

### 用户端
- ✅ 用户注册/登录
- ✅ AI对话（流式响应）
- ✅ 图片生成
- ✅ 视频生成
- ✅ 作品管理
- ✅ 额度中心
- ✅ 套餐购买
- ✅ 个人中心

### 管理端
- ✅ 数据总览
- ✅ 用户管理
- ✅ 邀请码管理
- ✅ 模型管理
- ✅ 订单管理
- ✅ 生成任务查看
- ✅ 系统设置

## 开发计划

### 阶段1：项目初始化 ✅
- [x] 创建 Next.js 项目
- [x] 配置 Tailwind CSS
- [x] 配置 Supabase
- [x] 搭建项目结构

### 阶段2：数据库设计 ✅
- [x] 创建数据库Schema
- [x] 配置RLS策略
- [x] 插入种子数据

### 阶段3：基础UI框架 ✅
- [x] 登录/注册页面
- [x] 工作台布局
- [x] 响应式设计
- [x] 3D Card组件
- [x] Stateful Button组件

### 阶段4：核心AI功能（待开发）
- [ ] AI Chat流式对话
- [ ] 图片生成
- [ ] 视频生成
- [ ] 作品管理

### 阶段5：商业化功能（待开发）
- [ ] 额度系统
- [ ] 套餐购买
- [ ] 支付对接
- [ ] 订单管理

### 阶段6：管理员后台（待开发）
- [ ] 数据总览
- [ ] 用户管理
- [ ] 邀请码管理
- [ ] 模型管理
- [ ] 订单管理
- [ ] 系统设置

### 阶段7：部署（待开发）
- [ ] 推送GitHub
- [ ] 部署Cloudflare
- [ ] 配置生产环境

## 注意事项

1. **不要将 `.env.local` 提交到Git**
2. **生产环境请使用强密码**
3. **定期备份数据库**
4. **监控API使用量**

## 许可证

MIT

## 联系方式

如有问题，请提交 Issue。
