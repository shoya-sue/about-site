'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallback?: string;
  lowQualityPreview?: boolean;
  lazyBoundary?: string;
  fadeIn?: boolean;
}

/**
 * 最適化された画像コンポーネント
 * - 遅延読み込み
 * - ブラー効果付き低品質プレビュー
 * - 読み込み完了時のフェードイン効果
 * - フォールバック画像サポート
 */
export default function OptimizedImage({
  src,
  alt,
  fallback = '/images/placeholder.jpg',
  lowQualityPreview = true,
  lazyBoundary = '100px',
  fadeIn = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // エラー処理
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };
  
  // 読み込み完了処理
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <div
      className={cn(
        'overflow-hidden relative',
        className
      )}
    >
      {/* 低品質プレビュー（オプション） */}
      {lowQualityPreview && isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      <Image
        src={error ? fallback : src}
        alt={alt}
        loading="lazy"
        lazyBoundary={lazyBoundary}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          props.className
        )}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
    </div>
  );
} 