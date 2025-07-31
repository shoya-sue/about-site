'use client';

import React, { useEffect, useState } from 'react';
import { sleep } from '@/lib/utils';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  priority?: boolean;
  delayMs?: number;
  fallback?: React.ReactNode;
}

/**
 * パフォーマンス最適化のためのラッパーコンポーネント
 * - 優先度の低いコンテンツを遅延ロード
 * - インタラクティブ要素を最適化
 * - 非クリティカルなコンテンツをアイドル時にロード
 */
export default function PerformanceWrapper({
  children,
  priority = false,
  delayMs = 0,
  fallback = null
}: PerformanceWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(priority);

  useEffect(() => {
    if (priority) return;

    let isMounted = true;

    const load = async () => {
      if (delayMs > 0) {
        await sleep(delayMs);
      }
      
      // requestIdleCallbackが利用可能な場合は使用（ブラウザがアイドル状態の時に実行）
      if (typeof window !== 'undefined' && window.requestIdleCallback && typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => {
          if (isMounted) setIsLoaded(true);
        });
      } else {
        // フォールバックとしてタイムアウトを使用
        setTimeout(() => {
          if (isMounted) setIsLoaded(true);
        }, 1);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [priority, delayMs]);

  return (
    <>
      {isLoaded ? children : fallback}
    </>
  );
} 