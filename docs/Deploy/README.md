# デプロイメント設定

## 1. Vercelデプロイメント

### 1.1 前提条件
- Vercelアカウント
- GitHubリポジトリへのアクセス権限
- 環境変数の設定

### 1.2 デプロイメント手順
1. Vercelにログイン
2. 新規プロジェクト作成
3. GitHubリポジトリを選択
4. 環境変数を設定
5. デプロイメント設定を確認
6. デプロイメントを開始

### 1.3 環境変数設定
```env
# アプリケーション設定
NEXT_PUBLIC_SITE_URL=https://sho43-portfolio.vercel.app
NEXT_PUBLIC_SITE_NAME=SHO43 Portfolio

# Notion API設定
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id

# Formspree設定
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id

# Calendly設定
NEXT_PUBLIC_CALENDLY_USERNAME=your_calendly_username
```

## 2. ビルド設定

### 2.1 Vercel設定
`vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

### 2.2 ビルドコマンド
```bash
pnpm build
```

### 2.3 出力ディレクトリ
```
.next/
```

## 3. ドメイン設定

### 3.1 カスタムドメイン
1. Vercelのプロジェクト設定からドメインを追加
2. DNSレコードを設定
   - Aレコード: 76.76.21.21
   - CNAMEレコード: cname.vercel-dns.com

### 3.2 SSL証明書
- Vercelが自動的にLet's Encrypt証明書を発行
- 自動更新が設定済み

## 4. 環境設定

### 4.1 環境変数
- 本番環境
- プレビュー環境
- 開発環境

### 4.2 ビルド環境
```bash
# ビルド環境変数
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 5. デプロイメント戦略

### 5.1 ブランチデプロイメント
- main: 本番環境
- develop: ステージング環境
- feature/*: プレビュー環境

### 5.2 デプロイメントフロー
1. プルリクエスト作成
2. プレビューデプロイメント
3. レビューと承認
4. マージ
5. 本番デプロイメント

## 6. モニタリング

### 6.1 Vercel Analytics
- パフォーマンスモニタリング
- エラートラッキング
- ユーザー行動分析

### 6.2 ログ管理
- Vercel Logs
- エラーログの監視
- パフォーマンスログの分析

## 7. バックアップ

### 7.1 データバックアップ
- GitHubリポジトリ
- 環境変数のエクスポート
- データベースのバックアップ

### 7.2 復旧手順
1. リポジトリのクローン
2. 環境変数の復元
3. 依存関係のインストール
4. ビルドとデプロイ

## 8. セキュリティ

### 8.1 セキュリティヘッダー
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 8.2 CSP設定
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
        }
      ]
    }
  ]
}
```

## 9. パフォーマンス最適化

### 9.1 キャッシュ設定
```json
{
  "headers": [
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 9.2 画像最適化
- Next.js Image Optimization
- WebPフォーマットの使用
- 適切なサイズ指定

## 10. トラブルシューティング

### 10.1 デプロイメントエラー
1. ビルドログの確認
2. 環境変数の確認
3. 依存関係の確認
4. キャッシュのクリア

### 10.2 パフォーマンス問題
1. ビルドサイズの確認
2. 画像最適化の確認
3. キャッシュ設定の確認
4. CDN設定の確認 