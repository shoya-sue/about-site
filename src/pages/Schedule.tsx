'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import CalendlyEmbed from '@/components/ui/CalendlyEmbed';

export default function Schedule() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('calendly.title')}</h1>
      <p className="text-lg mb-8">{t('calendly.description')}</p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
        <CalendlyEmbed className="w-full" />
      </div>
    </div>
  );
} 