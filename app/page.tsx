'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PromptItem } from '@/lib/types';
import Header from '@/components/Header';
import PromptGallery from '@/components/PromptGallery';
import { SkeletonGrid } from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';

/**
 * 主页面 - 提示词展示 (支持分页加载)
 */
export default function Home() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loaderRef = useRef<HTMLDivElement>(null);

  // 加载数据函数
  const fetchPrompts = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(`/api/prompts?page=${pageNum}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      
      setPrompts(prev => pageNum === 1 ? data.items : [...prev, ...data.items]);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error('Failed to fetch prompts:', err);
      setError(true);
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    fetchPrompts(1);
  }, [fetchPrompts]);

  // Infinite Scroll 观察者
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !error) {
          setPage(prev => {
            const nextPage = prev + 1;
            fetchPrompts(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, error, fetchPrompts]);

  // 重试加载
  const handleRetry = () => {
    setIsInitialLoading(true);
    setPage(1);
    fetchPrompts(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 初始加载状态 */}
        {isInitialLoading && <SkeletonGrid count={10} />}

        {/* 错误状态 */}
        {!isInitialLoading && error && prompts.length === 0 && (
          <EmptyState type="error" onRetry={handleRetry} />
        )}

        {/* 无数据状态 */}
        {!isInitialLoading && !error && prompts.length === 0 && (
          <EmptyState type="no-data" />
        )}

        {/* 正常显示列表 */}
        {prompts.length > 0 && (
          <div className="animate-fadeIn">
            <PromptGallery items={prompts} />
          </div>
        )}

        {/* 底部加载触发器和状态展示 */}
        <div ref={loaderRef} className="py-12 flex justify-center">
          {loading && !isInitialLoading && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400">正在加载更多...</p>
            </div>
          )}
          {!hasMore && prompts.length > 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500 italic">
              — 已经到底啦 —
            </p>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="mt-8 py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>提示词收藏夹 - 精选 AI 提示词，激发无限创意</p>
      </footer>
    </div>
  );
}
