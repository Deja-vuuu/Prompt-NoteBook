import { useState, useCallback } from 'react';
import { PromptItem } from '@/lib/types';

/**
 * 弹窗状态管理Hook
 */
export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PromptItem | null>(null);

  const openModal = useCallback((item: PromptItem) => {
    setSelectedItem(item);
    setIsOpen(true);
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
    // 恢复背景滚动
    document.body.style.overflow = 'unset';
  }, []);

  return { isOpen, selectedItem, openModal, closeModal };
}
