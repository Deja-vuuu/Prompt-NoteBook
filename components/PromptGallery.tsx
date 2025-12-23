'use client';

import { PromptItem } from '@/lib/types';
import MasonryGrid from './MasonryGrid';
import PromptModal from './PromptModal';
import { useModal } from '@/hooks/useModal';

interface PromptGalleryProps {
  items: PromptItem[];
}

/**
 * 提示词画廊客户端组件
 * 处理弹窗交互逻辑
 */
export default function PromptGallery({ items }: PromptGalleryProps) {
  const { isOpen, selectedItem, openModal, closeModal } = useModal();

  return (
    <>
      <MasonryGrid items={items} onItemClick={openModal} />
      <PromptModal item={selectedItem} isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
