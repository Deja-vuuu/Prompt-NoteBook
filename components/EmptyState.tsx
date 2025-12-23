interface EmptyStateProps {
  type?: 'no-data' | 'no-results' | 'error';
  message?: string;
  onRetry?: () => void;
}

/**
 * 空状态组件 - 无数据、无搜索结果、错误状态
 */
export default function EmptyState({
  type = 'no-data',
  message,
  onRetry
}: EmptyStateProps) {
  const configs = {
    'no-data': {
      icon: (
        <svg className="w-24 h-24 text-gray-300 dark:text-gray-700" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      title: '暂无提示词',
      description: message || '数据加载失败，请稍后重试',
    },
    'no-results': {
      icon: (
        <svg className="w-24 h-24 text-gray-300 dark:text-gray-700" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      title: '未找到匹配结果',
      description: message || '试试调整搜索关键词或筛选条件',
    },
    'error': {
      icon: (
        <svg className="w-24 h-24 text-red-300 dark:text-red-700" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      title: '加载失败',
      description: message || 'API 请求失败，请检查网络连接',
    },
  };

  const config = configs[type];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      {config.icon}
      <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
        {config.title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        {config.description}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-6 py-3 rounded-lg font-medium
                   bg-blue-600 hover:bg-blue-700 text-white
                   transition-colors duration-200"
        >
          重新加载
        </button>
      )}
    </div>
  );
}
