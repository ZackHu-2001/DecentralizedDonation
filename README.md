# DecentralizedDonation


### Project Structure

📦 decentralized-donation
├── app/
│   ├── layout.tsx                 # 根布局
│   ├── page.tsx                   # 首页
│   ├── providers.tsx              # 全局 providers
│   ├── loading.tsx                # 全局加载状态
│   ├── error.tsx                  # 全局错误处理
│   │
│   ├── campaigns/
│   │   ├── page.tsx               # 活动列表页
│   │   ├── loading.tsx            # 活动列表加载状态
│   │   ├── [id]/
│   │   │   ├── page.tsx           # 活动详情页
│   │   │   └── loading.tsx        # 详情页加载状态
│   │   └── create/
│   │       └── page.tsx           # 创建活动页
│   │
│   ├── profile/
│   │   ├── page.tsx               # 个人主页
│   │   ├── edit/
│   │   │   └── page.tsx           # 编辑个人资料
│   │   └── [address]/
│   │       └── page.tsx           # 查看其他用户资料
│   │
│   ├── donate/
│   │   └── [address]/
│   │       └── page.tsx           # 个人捐赠页
│   │
│   ├── search/
│   │   └── page.tsx               # 搜索结果页
│   │
│   ├── rankings/
│   │   └── page.tsx               # 排行榜页面
│   │
│   ├── wallet/
│   │   └── page.tsx               # 钱包页面
│   │
│   ├── settings/
│   │   └── page.tsx               # 设置页面
│   │
│   ├── notifications/
│   │   └── page.tsx               # 通知页面
│   │
│   └── help/
│       └── page.tsx               # 帮助中心
│
├── components/
│   ├── ui/                        # UI 基础组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── layout/                    # 布局组件
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── sidebar.tsx
│   │
│   ├── campaigns/                 # 活动相关组件
│   │   ├── campaign-card.tsx
│   │   ├── campaign-form.tsx
│   │   ├── campaign-list.tsx
│   │   └── donation-form.tsx
│   │
│   ├── profile/                   # 个人资料相关组件
│   │   ├── profile-card.tsx
│   │   ├── donation-history.tsx
│   │   └── profile-form.tsx
│   │
│   └── shared/                    # 共享组件
│       ├── search-bar.tsx
│       ├── loading-spinner.tsx
│       └── error-message.tsx
│
├── lib/
│   ├── contracts/                 # 智能合约相关
│   │   ├── abi.ts
│   │   └── addresses.ts
│   │
│   ├── hooks/                     # 自定义 hooks
│   │   ├── useContract.ts
│   │   ├── useWallet.ts
│   │   └── useDonation.ts
│   │
│   └── utils/                     # 工具函数
│       ├── ethereum.ts
│       ├── format.ts
│       └── validation.ts
│
├── types/                         # 类型定义
│   ├── campaign.ts
│   ├── donation.ts
│   └── user.ts
│
├── styles/                        # 样式文件
│   └── globals.css
│
├── public/                        # 静态资源
│   ├── images/
│   └── icons/
│
├── .env                          # 环境变量
├── .env.local
├── next.config.js               # Next.js 配置
├── tailwind.config.js           # Tailwind 配置
├── tsconfig.json                # TypeScript 配置
└── package.json