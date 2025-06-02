import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('home.title')}
        </h1>
        <p className="text-center text-xl mb-12">
          {t('home.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center"
            aria-label={t('home.cta.projects')}
          >
            {t('home.cta.projects')}
          </Link>
          <Link 
            href="/contact"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-center"
            aria-label={t('home.cta.contact')}
          >
            {t('home.cta.contact')}
          </Link>
        </div>
      </section>
    </div>
  );
} 