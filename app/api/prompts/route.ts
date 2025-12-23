import { NextResponse } from 'next/server';
import { getPrompts } from '@/lib/prompts';

/**
 * GET /api/prompts - 获取所有提示词数据
 */
export async function GET() {
  try {
    const prompts = await getPrompts();
    return NextResponse.json(prompts);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}

// 启用 ISR - 24小时重新验证
export const revalidate = 86400;
