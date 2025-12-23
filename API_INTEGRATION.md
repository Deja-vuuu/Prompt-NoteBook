# 🔌 API 集成说明

## API 接口信息

- **接口地址**: `https://opennana.com/awesome-prompt-gallery/data/prompts.json`
- **请求方法**: GET
- **数据格式**: JSON
- **更新频率**: 实时

## 数据结构

### API 响应格式

```json
{
  "generatedAt": "2024-01-20T10:00:00Z",
  "total": 904,
  "items": [
    {
      "id": 904,
      "slug": "victorian-gothic-portrait",
      "title": "维多利亚哥特皇室写真照",
      "source": {
        "name": "创作者名称",
        "url": "https://..."
      },
      "model": "Nano banana pro",
      "images": ["/images/904-1.jpg"],
      "prompts": ["详细提示词..."],
      "examples": ["示例输出..."],
      "notes": ["备注信息..."],
      "originFile": "source.md",
      "description": "详细描述...",
      "tags": ["摄影", "哥特", "复古"],
      "coverImage": "/images/904-cover.jpg"
    }
  ]
}
```

### 应用内部格式

```typescript
interface PromptItem {
  id: string;              // 转换为字符串
  title: string;           // 直接使用
  prompt: string;          // 合并 description + prompts + notes
  imageUrl: string;        // 拼接完整 URL
  imageWidth: number;      // 默认 800
  imageHeight: number;     // 默认 1000
  category?: string;       // 使用第一个 tag 或 model
  tags?: string[];         // 直接使用
  createdAt: Date;         // 当前时间
}
```

## SSG + ISR 配置

### 静态站点生成 (SSG)

页面在构建时生成静态 HTML，性能最优：

```typescript
// app/page.tsx
export const revalidate = 86400; // 24小时

export default async function Home() {
  const prompts = await getPrompts();
  return <PromptGallery items={prompts} />;
}
```

### 增量静态再生成 (ISR)

- **重新验证周期**: 86400 秒（24 小时）
- **工作原理**:
  1. 首次访问返回缓存的静态页面
  2. 24 小时后，后台重新获取数据
  3. 新页面生成后替换旧缓存
  4. 后续访问获得最新数据

### 配置说明

```typescript
// lib/prompts.ts
fetch(API_ENDPOINT, {
  next: {
    revalidate: 86400  // 与页面级配置保持一致
  }
})
```

## 数据转换逻辑

### 图片 URL 处理

```typescript
// API 返回相对路径: "/images/904-cover.jpg"
// 转换为完整 URL: "https://opennana.com/awesome-prompt-gallery/images/904-cover.jpg"

const imageUrl = apiItem.coverImage
  ? `${API_BASE_URL}${apiItem.coverImage}`
  : (apiItem.images?.[0] ? `${API_BASE_URL}${apiItem.images[0]}` : '');
```

### 提示词合并

```typescript
// 合并多个字段为完整提示词
const prompt = [
  apiItem.description,      // 描述
  ...apiItem.prompts,       // 提示词数组
  ...(apiItem.notes || [])  // 备注数组
].filter(Boolean).join('\n\n');
```

### 分类提取

```typescript
// 使用第一个标签作为分类，如果没有则使用模型名称
const category = apiItem.tags?.[0] || apiItem.model;
```

## 错误处理

### API 请求失败

```typescript
try {
  const response = await fetch(API_ENDPOINT, { next: { revalidate: 86400 } });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return data.items.map(transformApiItem);
} catch (error) {
  console.error('Failed to fetch prompts:', error);
  return []; // 返回空数组，页面显示"暂无数据"
}
```

### 前端展示

```typescript
{prompts.length === 0 ? (
  <div>暂无提示词数据 - 数据加载失败，请稍后重试</div>
) : (
  <PromptGallery items={prompts} />
)}
```

## 性能优化

### 1. 静态生成优势

- ✅ 无需每次请求都调用 API
- ✅ 页面加载速度极快（静态 HTML）
- ✅ 减轻 API 服务器压力
- ✅ 更好的 SEO 表现

### 2. ISR 增量更新

- ✅ 自动更新数据，无需重新部署
- ✅ 用户始终看到较新的数据
- ✅ 后台更新，不影响用户体验

### 3. 图片优化

```typescript
// 使用 Next.js Image 组件
<Image
  src={item.imageUrl}
  alt={item.title}
  fill
  loading="lazy"         // 懒加载
  sizes="(max-width: 640px) 100vw, ..."  // 响应式
/>
```

## 部署配置

### Vercel (推荐)

自动支持 ISR，无需额外配置：

```bash
vercel deploy
```

### 自托管

确保支持 Next.js 的 ISR 功能：

```bash
# 构建
npm run build

# 启动
npm start  # 不能使用 next export
```

**注意**: ISR 需要 Node.js 服务器，不支持纯静态导出。

## 缓存策略

### 构建时

```
npm run build
→ 调用 API 获取所有数据
→ 生成静态 HTML 页面
→ 缓存到 .next/cache
```

### 运行时

```
用户访问页面
→ 返回缓存的 HTML（秒级响应）
→ 检查是否超过 24 小时
→ 如果超过，后台重新获取数据
→ 更新缓存
→ 下次访问使用新数据
```

## 调试技巧

### 查看构建日志

```bash
npm run build

# 输出示例:
# ○ /                    (Static)  automatically rendered as static HTML
# ○ Revalidating every 86400 seconds
```

### 强制重新生成

```bash
# 开发环境
rm -rf .next
npm run dev

# 生产环境
# 访问页面时在 URL 后加 ?revalidate=1
```

### 查看缓存状态

检查响应头：

```
X-Nextjs-Cache: HIT      # 命中缓存
X-Nextjs-Cache: STALE    # 缓存过期，后台更新中
X-Nextjs-Cache: MISS     # 未命中缓存
```

## 常见问题

### Q: 为什么页面没有显示最新数据？

A: ISR 的更新是渐进式的：
1. 首次访问后触发后台更新
2. 更新完成前仍显示旧数据
3. 等待几秒后刷新页面查看新数据

### Q: 如何强制立即更新？

A: 三种方法：
1. 重新构建部署: `npm run build && npm start`
2. 使用 On-Demand Revalidation API
3. 减小 revalidate 时间（如改为 3600 秒）

### Q: API 返回的图片 URL 无法访问？

A: 检查：
1. 图片路径拼接是否正确
2. 图片域名是否在 next.config.mjs 的 remotePatterns 中
3. 图片是否真实存在

### Q: 构建时间过长？

A: 优化建议：
1. 考虑分页加载数据
2. 使用客户端渲染部分内容
3. 增加 revalidate 时间减少构建频率

## 监控建议

### 1. API 健康检查

定期检查 API 可用性：

```typescript
const healthCheck = async () => {
  try {
    const res = await fetch(API_ENDPOINT);
    console.log('API Status:', res.ok ? 'OK' : 'Error');
  } catch (e) {
    console.error('API Down:', e);
  }
};
```

### 2. 数据质量验证

确保数据格式正确：

```typescript
// 检查必需字段
if (!apiItem.id || !apiItem.title) {
  console.warn('Invalid item:', apiItem);
}
```

## 总结

本项目采用 **SSG + ISR** 架构：

- ✅ 每天自动更新一次（86400 秒）
- ✅ 静态页面，加载速度快
- ✅ 自动处理 API 数据转换
- ✅ 完善的错误处理机制
- ✅ 优化的图片加载策略

这种架构既保证了性能，又确保了数据的及时性，非常适合内容更新不频繁的展示型网站。
