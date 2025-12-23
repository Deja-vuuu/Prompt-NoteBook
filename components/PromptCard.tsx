'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PromptItem } from '@/lib/types';

interface PromptCardProps {
  item: PromptItem;
  onClick: (item: PromptItem) => void;
}

/**
 * 提示词卡片组件 - 增强图片处理和交互效果
 */
export default function PromptCard({ item, onClick }: PromptCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      onClick={() => onClick(item)}
      className="group relative cursor-pointer overflow-hidden rounded-xl
                 bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-2xl
                 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]
                 active:scale-[0.98]"
    >
      {/* 图片 */}
      <div className="relative aspect-[4/5] bg-gray-200 dark:bg-gray-700">
        {!imageError ? (
          <>
            {/* 加载占位符 */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}

            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              unoptimized
              onLoadingComplete={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          /* 图片加载失败占位符 */
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 p-4">
            <svg className="w-20 h-20 mb-3" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-sm text-center">图片加载失败</p>
            <p className="text-xs mt-1 text-center text-gray-500 dark:text-gray-700">点击查看详情</p>
          </div>
        )}

        {/* 渐变蒙层 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* 底部信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-4
                        bg-gradient-to-t from-black/90 via-black/60 to-transparent
                        transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-base sm:text-lg line-clamp-2 drop-shadow-lg">
            {item.title}
          </h3>

          {/* 分类和标签 */}
          <div className="mt-2 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.category && (
              <span className="inline-block px-2.5 py-1 text-xs rounded-full
                             bg-blue-500/90 text-white backdrop-blur-sm font-medium">
                {item.category}
              </span>
            )}
            {item.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2.5 py-1 text-xs rounded-full
                         bg-white/20 text-white backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
            {(item.tags?.length || 0) > 2 && (
              <span className="inline-block px-2.5 py-1 text-xs rounded-full
                             bg-white/20 text-white backdrop-blur-sm">
                +{(item.tags?.length || 0) - 2}
              </span>
            )}
          </div>
        </div>

        {/* 悬停效果：查看详情提示 */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2">
            <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
