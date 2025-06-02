'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
}

export default function ImageGallery({ 
  images, 
  columns = 3, 
  gap = 4 
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
    // スクロールを無効化
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // スクロールを再度有効化
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    
    if (direction === 'prev') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      setSelectedImage(images[prevIndex]);
    } else {
      const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(images[nextIndex]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isLightboxOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
      case 'Escape':
        closeLightbox();
        break;
      default:
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-${gap}`}
      >
        {images.map((image) => (
          <div 
            key={image.id} 
            className="relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => openLightbox(image)}
          >
            <div className="aspect-square relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ライトボックス */}
      {isLightboxOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 text-white p-2 rounded-full hover:bg-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="relative max-w-4xl max-h-[80vh] mx-auto">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-h-[80vh] w-auto h-auto object-contain"
            />
          </div>
          
          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 text-white p-2 rounded-full hover:bg-white/10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
} 