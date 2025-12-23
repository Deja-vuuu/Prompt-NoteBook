import { PromptItem, ApiResponse, ApiPromptItem } from './types';

/**
 * API 基础 URL
 */
const API_BASE_URL = 'https://opennana.com/awesome-prompt-gallery';
const API_ENDPOINT = `${API_BASE_URL}/data/prompts.json`;

/**
 * 将 API 数据转换为应用数据格式
 */
function transformApiItem(apiItem: ApiPromptItem): PromptItem {
  // 拼接完整图片 URL
  const imageUrl = API_BASE_URL + '/' + apiItem.coverImage;

  // 合并所有提示词
  const prompt = [
    apiItem.description,
    ...apiItem.prompts,
    ...(apiItem.notes || [])
  ].filter(Boolean).join('\n\n');

  // 提取第一个标签作为分类
  const category = apiItem.tags?.[0] || apiItem.model;

  return {
    id: String(apiItem.id),
    title: apiItem.title,
    prompt: prompt || apiItem.description || '暂无提示词',
    imageUrl: imageUrl || '/placeholder.jpg',
    imageWidth: 800,  // 默认宽度，实际由 CSS 控制
    imageHeight: 1000, // 默认高度，实际由 CSS 控制
    category,
    tags: apiItem.tags,
    createdAt: new Date(),
  };
}

/**
 * 获取所有提示词数据
 * 使用 fetch 从真实 API 获取数据
 */
export async function getPrompts(): Promise<PromptItem[]> {
  try {
    const response = await fetch(API_ENDPOINT, {
      next: {
        revalidate: 86400  // 24小时重新验证一次 (SSG with ISR)
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    // 转换并返回数据
    return data.items.map(transformApiItem);
  } catch (error) {
    console.error('Failed to fetch prompts:', error);

    // 返回空数组，让页面显示"暂无数据"
    return [];
  }
}

/**
 * 根据ID获取单个提示词
 */
export async function getPromptById(id: string): Promise<PromptItem | null> {
  const prompts = await getPrompts();
  return prompts.find(p => p.id === id) || null;
}
