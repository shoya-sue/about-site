'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import ImageGallery, { GalleryImage } from '@/components/ui/ImageGallery';

export default function Gallery() {
  const { t } = useTranslation();
  
  // サンプル画像データ - 実際の実装ではAPIから取得するかもしれません
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: '/images/gallery/blockchain-1.jpg',
      alt: 'ブロックチェーン技術の図解',
      width: 1200,
      height: 800,
    },
    {
      id: '2',
      src: '/images/gallery/event-1.jpg',
      alt: 'ブロックチェーンイベントの様子',
      width: 1200,
      height: 800,
    },
    {
      id: '3',
      src: '/images/gallery/code-1.jpg',
      alt: 'スマートコントラクトのコード例',
      width: 1200,
      height: 800,
    },
    {
      id: '4',
      src: '/images/gallery/presentation-1.jpg',
      alt: 'コミュニティイベントでの発表',
      width: 1200,
      height: 800,
    },
    {
      id: '5',
      src: '/images/gallery/workshop-1.jpg',
      alt: 'ワークショップの様子',
      width: 1200,
      height: 800,
    },
    {
      id: '6',
      src: '/images/gallery/project-1.jpg',
      alt: 'プロジェクト開発の様子',
      width: 1200,
      height: 800,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('gallery.title')}</h1>
      <p className="text-lg mb-8">{t('gallery.description')}</p>
      
      <div className="mb-12">
        <ImageGallery images={galleryImages} columns={3} gap={4} />
      </div>
    </div>
  );
} 