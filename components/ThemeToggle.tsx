'use client';

import { useTheme } from '@/hooks/useTheme';
import { flushSync } from 'react-dom';

/**
 * 主题切换按钮组件
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // 避免服务端渲染不匹配
  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Toggle clicked, current theme:', theme);
    // 检查浏览器支持
    // @ts-ignore
    const isTransition = document.startViewTransition && 
                        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTransition) {
      console.log('View Transition not supported, switching directly');
      toggleTheme();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    try {
      await transition.ready;

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    } catch (err) {
      console.error('View Transition failed:', err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700
                 flex items-center justify-center transition-all duration-200
                 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:ring-gray-400"
      aria-label="切换主题"
    >
      {theme === 'light' ? (
        <svg
          className="w-5 h-5 text-gray-800"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-200"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
}
