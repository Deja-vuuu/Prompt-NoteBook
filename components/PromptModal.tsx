'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PromptItem } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';

interface PromptModalProps {
  item: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 提示词弹窗组件 - 优化移动端体验和复制反馈
 */
export default function PromptModal({ item, isOpen, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  // 重置图片错误状态
  useEffect(() => {
    if (isOpen) {
      setImageError(false);
    }
  }, [isOpen, item]);

  // 复制功能 - 增强反馈
  const handleCopy = async () => {
    if (item && await copyToClipboard(item.prompt)) {
      setCopied(true);

      // 震动反馈（移动端）
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }

      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:w-auto sm:max-w-3xl
                   max-h-[95vh] sm:max-h-[90vh] overflow-y-auto
                   bg-white dark:bg-gray-900
                   rounded-t-3xl sm:rounded-2xl shadow-2xl
                   animate-slideUp sm:animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full
                     bg-black/20 hover:bg-black/40 backdrop-blur-sm
                     flex items-center justify-center transition-colors
                     active:scale-95"
          aria-label="关闭"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeWidth={2}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 移动端拖拽指示器 */}
        <div className="sm:hidden flex justify-center pt-2 pb-1">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        {/* 图片 */}
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800">
          {!imageError ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover rounded-t-3xl sm:rounded-t-2xl"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              unoptimized
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400 dark:text-gray-600">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm">图片加载失败</p>
              </div>
            </div>
          )}
        </div>

        {/* 内容 */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* 标题 */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {item.title}
          </h2>

          {/* 分类和标签 */}
          {(item.category || item.tags) && (
            <div className="flex flex-wrap gap-2">
              {item.category && (
                <span className="px-3 py-1 text-sm rounded-full
                               bg-blue-100 dark:bg-blue-900/30
                               text-blue-700 dark:text-blue-300">
                  {item.category}
                </span>
              )}
              {item.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full
                           bg-gray-100 dark:bg-gray-800
                           text-gray-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 提示词内容 */}
          <div className="relative">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 max-h-60 overflow-y-auto">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {item.prompt}
              </p>
            </div>

            {/* 复制按钮 - 增强反馈 */}
            <button
              onClick={handleCopy}
              disabled={copied}
              className={`mt-4 w-full px-6 py-3 sm:py-3.5 rounded-lg font-medium
                       transition-all duration-300 flex items-center justify-center gap-2
                       active:scale-95 ${
                copied
                  ? 'bg-green-600 text-white ring-4 ring-green-400/50 scale-105'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5 animate-bounce" fill="none" strokeWidth={2.5} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">已复制到剪贴板！</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  复制提示词
                </>
              )}
            </button>
          </div>
        </div>

        {/* 移动端安全区域 */}
        <div className="h-safe-area-inset-bottom sm:hidden" />
      </div>
    </div>
  );
}
