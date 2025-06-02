import React from 'react';
import Schedule from '@/pages/Schedule';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule a Meeting - SHO43',
  description: 'Schedule a meeting or consultation with SHO43, a blockchain technology specialist and community manager.',
  openGraph: {
    title: 'Schedule a Meeting - SHO43',
    description: 'Schedule a meeting or consultation with SHO43.',
    type: 'website',
  },
};

export default function SchedulePage() {
  return <Schedule />;
} 