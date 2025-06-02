import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // 言語検出機能を使用
  .use(LanguageDetector)
  // i18nextとreactを連携
  .use(initReactI18next)
  // 初期化
  .init({
    // 利用可能な言語
    supportedLngs: ['en', 'ja'],
    // デフォルト言語
    fallbackLng: 'en',
    // 開発モードでデバッグ
    debug: process.env.NODE_ENV === 'development',
    // 翻訳ファイルのパス
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    // 言語検出の設定
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    // 翻訳ファイルをロードする方法
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n; 