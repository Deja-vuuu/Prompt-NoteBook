# 🚀 快速启动指南

## 第一步:安装依赖

```bash
npm install
```

## 第二步:启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

## 第三步:开始使用

浏览器打开后,您将看到:

1. **页面头部** - 带有网站标题和主题切换按钮
2. **瀑布流画廊** - 展示所有提示词卡片
3. **点击卡片** - 打开详情弹窗
4. **复制提示词** - 点击"复制提示词"按钮一键复制

## 自定义提示词数据

编辑 `lib/prompts.ts` 文件,修改 `mockPrompts` 数组:

```typescript
{
  id: '唯一ID',
  title: '卡片标题',
  prompt: '完整的提示词内容',
  imageUrl: '图片链接 (可以使用 Unsplash 等)',
  imageWidth: 800,    // 图片原始宽度
  imageHeight: 1000,  // 图片原始高度
  category: '分类',
  tags: ['标签1', '标签2'],
  createdAt: new Date(),
}
```

## 部署到生产环境

### 构建

```bash
npm run build
```

### 本地预览生产版本

```bash
npm start
```

### 部署到 Vercel

```bash
vercel
```

## 常见问题

**Q: 如何更改主题颜色?**
A: 编辑 `tailwind.config.js` 中的颜色配置

**Q: 如何调整瀑布流列数?**
A: 编辑 `components/MasonryGrid.tsx` 中的 `breakpointColumns` 对象

**Q: 图片加载失败怎么办?**
A: 确保 `imageUrl` 是可访问的公开链接,或使用 Unsplash 等图床服务

**Q: 如何连接后端API?**
A: 修改 `lib/prompts.ts` 中的 `getPrompts` 函数,替换为实际的 API 调用

## 技术支持

如有问题,请查看:
- README.md - 完整文档
- Next.js 官方文档: https://nextjs.org/docs
- Tailwind CSS 文档: https://tailwindcss.com/docs
