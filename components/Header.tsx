'use client';

import ThemeToggle from './ThemeToggle';

/**
 * 页面头部组件 - 带圆形展开主题切换特效
 */
export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800
                       bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左侧标题 */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Prompt Notebook
            </h1>
            <span className="ml-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
              AI Prompt Gallery
            </span>
          </div>

          {/* 右侧主题切换 */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
