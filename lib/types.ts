/**
 * 提示词项数据结构
 */
export interface PromptItem {
  id: string;                    // 唯一标识符
  title: string;                 // 标题
  prompt: string;                // 完整提示词内容
  imageUrl: string;              // 图片URL
  imageWidth: number;            // 图片宽度(用于瀑布流计算)
  imageHeight: number;           // 图片高度(用于瀑布流计算)
  category?: string;             // 分类(可选,未来扩展)
  tags?: string[];               // 标签(可选,未来扩展)
  createdAt: Date;               // 创建时间
}

/**
 * API 响应数据结构
 */
export interface ApiResponse {
  generatedAt: string;
  total: number;
  items: ApiPromptItem[];
}

/**
 * API 返回的提示词数据结构
 */
export interface ApiPromptItem {
  id: number;
  slug: string;
  title: string;
  source: {
    name: string;
    url: string;
  };
  model: string;
  images: string[];
  prompts: string[];
  examples: string[];
  notes: string[];
  originFile: string;
  description: string;
  tags: string[];
  coverImage: string;
}

/**
 * 主题类型
 */
export type Theme = 'light' | 'dark';

/**
 * 主题上下文类型
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
