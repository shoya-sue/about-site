import React, { useEffect } from 'react';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { reportWebVitals } from '@/lib/analytics';
import './globals.css';

// パフォーマンス計測を初期化
reportWebVitals({ debug: process.env.NODE_ENV !== 'production' });

// フォントの設定
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || 'SHO43 Portfolio',
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || 'SHO43 Portfolio'}`
  },
  description: 'ブロックチェーン技術スペシャリスト & コミュニティマネージャーのポートフォリオサイト',
  keywords: ['blockchain', 'solana', 'portfolio', 'developer', 'community manager'],
  authors: [{ name: 'SHO43' }],
  creator: 'SHO43',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sho43.com',
    title: process.env.NEXT_PUBLIC_SITE_NAME || 'SHO43 Portfolio',
    description: 'ブロックチェーン技術スペシャリスト & コミュニティマネージャーのポートフォリオサイト',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'SHO43 Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: process.env.NEXT_PUBLIC_SITE_NAME || 'SHO43 Portfolio',
    description: 'ブロックチェーン技術スペシャリスト & コミュニティマネージャーのポートフォリオサイト',
    creator: '@sho43_',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansJP.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
          >
            コンテンツにスキップ
          </a>
          <Header />
          <main id="main-content" className="pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
} 