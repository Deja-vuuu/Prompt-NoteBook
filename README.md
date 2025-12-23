# 提示词收藏夹 - Prompt Collection

一个简约优雅的提示词收集网站,使用 Next.js 16 和 Tailwind CSS 构建。

## ✨ 特性

- 📱 **响应式瀑布流布局** - 自适应不同设备尺寸
- 🌓 **黑白主题切换** - 支持亮色/暗色模式
- 🎨 **简约设计风格** - 极简界面,专注内容
- 🚀 **高性能优化** - SSG + ISR 静态生成,秒级加载
- 📋 **一键复制** - 快速复制提示词内容
- ⌨️ **键盘支持** - ESC键关闭弹窗
- 🔄 **自动更新** - 每24小时自动获取最新数据
- 🌐 **真实数据** - 接入 OpenNana 提示词库

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5.7
- **样式**: Tailwind CSS 3.4
- **UI库**: React 19
- **布局**: react-masonry-css
- **图片**: Next.js Image优化

## 📦 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🏗️ 项目结构

```
prompt-collection-site/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── Header.tsx         # 页面头部
│   ├── ThemeToggle.tsx    # 主题切换按钮
│   ├── MasonryGrid.tsx    # 瀑布流容器
│   ├── PromptCard.tsx     # 提示词卡片
│   └── PromptModal.tsx    # 提示词弹窗
├── hooks/                 # 自定义Hooks
│   ├── useTheme.ts        # 主题管理
│   └── useModal.ts        # 弹窗状态管理
├── lib/                   # 工具和数据
│   ├── types.ts           # TypeScript类型
│   ├── prompts.ts         # 提示词数据
│   └── utils.ts           # 工具函数
└── public/                # 静态资源
```

## 🎯 核心功能

### 瀑布流布局

- 响应式列数:移动端1列,平板2列,桌面3-4列
- 自动计算卡片高度
- 流畅的悬停动画效果

### 主题系统

- 基于 Tailwind CSS 的 dark mode
- LocalStorage 持久化主题设置
- 跟随系统主题偏好
- 平滑的切换动画

### 提示词弹窗

- 全屏遮罩展示
- 图片预览
- 提示词详情展示
- 一键复制功能
- 多种关闭方式(点击遮罩/ESC键/关闭按钮)

## 🔧 自定义数据

编辑 `lib/prompts.ts` 文件来添加或修改提示词数据:

```typescript
const mockPrompts: PromptItem[] = [
  {
    id: '1',
    title: '你的标题',
    prompt: '你的提示词内容',
    imageUrl: '图片URL',
    imageWidth: 800,
    imageHeight: 1000,
    category: '分类',
    tags: ['标签1', '标签2'],
    createdAt: new Date(),
  },
  // ... 更多提示词
];
```

## 🎨 主题定制

在 `tailwind.config.js` 中自定义颜色:

```javascript
theme: {
  extend: {
    colors: {
      light: {
        bg: '#ffffff',
        surface: '#f8f9fa',
        // ...
      },
      dark: {
        bg: '#0a0a0a',
        surface: '#1a1a1a',
        // ...
      },
    },
  },
}
```

## 📱 响应式断点

| 设备 | 屏幕宽度 | 列数 |
|------|---------|------|
| 移动端 | < 640px | 1列 |
| 平板 | 640px - 1024px | 2列 |
| 桌面 | 1024px - 1280px | 3列 |
| 大屏 | > 1280px | 4列 |

## 🔌 API 集成

本项目已集成真实的提示词 API:

- **API 地址**: `https://opennana.com/awesome-prompt-gallery/data/prompts.json`
- **更新策略**: SSG + ISR (每 24 小时自动更新)
- **数据来源**: [OpenNana 提示词画廊](https://opennana.com/awesome-prompt-gallery/)

详细的 API 集成说明请查看: [API_INTEGRATION.md](./API_INTEGRATION.md)

## 🚀 部署

### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

Vercel 自动支持 ISR，无需额外配置。

### 其他平台

项目支持部署到任何支持 Next.js ISR 的平台:
- Netlify
- Railway
- AWS Amplify
- 自托管服务器（需要 Node.js 运行时）

**注意**: ISR 功能需要 Node.js 服务器，不支持纯静态导出 (`next export`)。

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!
# Prompt-NoteBook
