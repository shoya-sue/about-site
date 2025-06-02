import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('about.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('about.profile.title')}</h2>
          <p className="mb-4">
            {t('about.profile.description1')}
          </p>
          <p>
            {t('about.profile.description2')}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('about.skills.title')}</h2>
          <ul className="list-disc pl-5 space-y-2" aria-label="List of skills">
            <li>{t('about.skills.frontend')}</li>
            <li>{t('about.skills.blockchain')}</li>
            <li>{t('about.skills.smartContract')}</li>
            <li>{t('about.skills.community')}</li>
            <li>{t('about.skills.documentation')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 