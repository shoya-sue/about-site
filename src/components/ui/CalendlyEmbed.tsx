'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CalendlyEmbedProps {
  username?: string;
  hideEventTypeDetails?: boolean;
  hideLandingPageDetails?: boolean;
  primaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  className?: string;
}

export default function CalendlyEmbed({
  username = process.env.NEXT_PUBLIC_CALENDLY_USERNAME,
  hideEventTypeDetails = false,
  hideLandingPageDetails = false,
  primaryColor = '3b82f6', // Tailwind blue-500
  textColor = '111827', // Tailwind gray-900
  backgroundColor = 'ffffff', // white
  className = '',
}: CalendlyEmbedProps) {
  const { t } = useTranslation();

  useEffect(() => {
    // Calendlyのスクリプトをロード
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // クリーンアップ関数
      document.body.removeChild(script);
    };
  }, []);

  if (!username) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
        {t('calendly.missingUsername')}
      </div>
    );
  }

  // Calendly widget用のURLを構築
  const calendlyUrl = `https://calendly.com/${username}`;
  const queryParams = new URLSearchParams({
    hide_event_type_details: hideEventTypeDetails ? '1' : '0',
    hide_landing_page_details: hideLandingPageDetails ? '1' : '0',
    primary_color: primaryColor,
    text_color: textColor,
    background_color: backgroundColor,
  }).toString();

  return (
    <div 
      className={`calendly-inline-widget ${className}`} 
      data-url={`${calendlyUrl}?${queryParams}`}
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
} 