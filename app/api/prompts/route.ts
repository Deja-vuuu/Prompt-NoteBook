import { NextResponse } from 'next/server';
import { getPrompts } from '@/lib/prompts';

/**
 * GET /api/prompts - 获取提示词数据（支持分页）
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const allPrompts = await getPrompts();
    
    // 计算分页
    const total = allPrompts.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const prompts = allPrompts.slice(start, end);
    const hasMore = end < total;

    return NextResponse.json({
      items: prompts,
      total,
      page,
      limit,
      hasMore,
    });
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
