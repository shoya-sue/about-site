import React from 'react';
import Gallery from '@/pages/Gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - SHO43',
  description: 'View blockchain technology and community event images in the gallery of SHO43, a blockchain technology specialist and community manager.',
  openGraph: {
    title: 'Gallery - SHO43',
    description: 'View blockchain technology and community event images.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return <Gallery />;
} 