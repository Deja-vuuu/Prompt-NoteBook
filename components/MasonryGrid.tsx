'use client';

import Masonry from 'react-masonry-css';
import { PromptItem } from '@/lib/types';
import PromptCard from './PromptCard';

interface MasonryGridProps {
  items: PromptItem[];
  onItemClick: (item: PromptItem) => void;
}

/**
 * 瀑布流容器组件
 */
export default function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    640: 2,
    480: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex w-auto -ml-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {items.map((item) => (
        <div key={item.id} className="mb-4">
          <PromptCard item={item} onClick={onItemClick} />
        </div>
      ))}
    </Masonry>
  );
}
