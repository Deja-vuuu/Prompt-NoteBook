'use client';

import { useState, useEffect } from 'react';
import { PromptItem } from '@/lib/types';
import Header from '@/components/Header';
import PromptGallery from '@/components/PromptGallery';
import { SkeletonGrid } from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';

/**
 * 主页面 - 提示词展示
 */
export default function Home() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 加载数据
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch('/api/prompts');
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setPrompts(data);
      } catch (err) {
        console.error('Failed to fetch prompts:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  // 重试加载
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 加载状态 */}
        {loading && <SkeletonGrid count={12} />}

        {/* 错误状态 */}
        {!loading && error && (
          <EmptyState type="error" onRetry={handleRetry} />
        )}

        {/* 无数据状态 */}
        {!loading && !error && prompts.length === 0 && (
          <EmptyState type="no-data" />
        )}

        {/* 正常显示 */}
        {!loading && !error && prompts.length > 0 && (
          <div className="animate-fadeIn">
            <PromptGallery items={prompts} />
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="mt-16 py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>提示词收藏夹 - 精选 AI 提示词，激发无限创意</p>
      </footer>
    </div>
  );
}
