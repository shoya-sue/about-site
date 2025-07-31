/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的エクスポートを有効化
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
    ],
  },
  // パフォーマンス最適化
  experimental: {
    optimizeCss: false, // CSSの最適化を無効化
    optimizePackageImports: ['lucide-react', '@/components/ui'], // パッケージインポートの最適化
  },
  // 静的アセットのキャッシュ最適化
  staticPageGenerationTimeout: 120, // 静的ページ生成のタイムアウト設定（秒）
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 本番環境ではconsole.logを削除
  },
  webpack: (config, { isServer }) => {
    // フォントファイルの最適化
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
};

module.exports = nextConfig; 