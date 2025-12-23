/**
 * 骨架屏卡片组件 - 加载状态占位符
 */
export default function SkeletonCard() {
  return (
    <div className="break-inside-avoid mb-6 group relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse">
      {/* 图片骨架 */}
      <div className="relative w-full aspect-[4/5] bg-gray-300 dark:bg-gray-700" />

      {/* 内容骨架 */}
      <div className="p-4 space-y-3">
        {/* 标题骨架 */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4" />

        {/* 标签骨架 */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * 骨架屏网格 - 显示多个骨架卡片
 */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
