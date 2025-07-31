# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## 重要なコマンド

```bash
# 開発
npm run dev              # Next.js開発サーバーを起動 (http://localhost:3000)
npm run build            # 本番用ビルド（out/ディレクトリに静的エクスポート）
npm run start            # 本番サーバーを起動（Node.jsデプロイメント用）

# テスト
npm test                 # 全てのテストを1回実行
npm run test:watch       # ファイル変更を監視しながらテスト実行
npm run test:coverage    # カバレッジレポートを生成

# リント
npm run lint             # Next.jsのリンターを実行
```

## アーキテクチャ概要

SHO43（ブロックチェーン開発者/コミュニティマネージャー）のポートフォリオサイト。Next.js 14で構築され、静的エクスポート機能を持つ。

### 主要技術
- **フレームワーク**: Next.js 14 (App Router使用、静的生成のため output: 'export' 設定)
- **言語**: TypeScript (strictモード有効)
- **スタイリング**: Tailwind CSS
- **アニメーション**: Three.js（パーティクルエフェクト）、GSAP、Framer Motion
- **テスト**: Jest + React Testing Library
- **多言語対応**: react-i18next（日本語/英語）
- **コンテンツ**: Notion APIによるブログ記事管理
- **フォーム**: Formspreeによる問い合わせフォーム

### プロジェクト構造
- `src/app/` - Next.js App Routerのページ
- `src/components/` - Reactコンポーネント（UI要素、レイアウト）
- `src/lib/` - コアユーティリティ（Notionクライアント、アナリティクス、i18n）
- `src/types/` - TypeScript型定義
- `src/utils/` - ヘルパー関数（パーティクルユーティリティ）
- `.github/workflows/` - VPSへの手動デプロイ用GitHub Actions

### デプロイ設定
- 静的サイト生成が有効（next.config.jsで `output: 'export'`）
- GitHub Actions経由で `/var/www/vhosts/about-site/` へ手動デプロイ
- Apache/Nginx設定例を提供
- 必要な環境変数: NOTION_API_KEY, NOTION_DATABASE_ID, NEXT_PUBLIC_FORMSPREE_ID

### 重要なパターン
1. **パスエイリアス**: srcディレクトリからのインポートには `@/` を使用
2. **画像**: OptimizedImageコンポーネントが遅延読み込みと最適化を処理
3. **パフォーマンス**: PerformanceWrapperがWeb Vitalsを追跡
4. **テスト**: モックファイルは `__mocks__/`、テストファイルは `__tests__/` ディレクトリに配置
5. **静的エクスポート**: デプロイ時は動的ルートやサーバーサイド機能は使用不可

### Notionデータベーススキーマ
ブログ記事には以下のプロパティが必要:
- Title (title)
- Excerpt (rich_text)
- Date (date)
- Category (select)
- Cover (files)
- Slug (rich_text)
- Published (checkbox)

### 環境変数
`.env.local` に以下を設定:
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_SITE_NAME
- NOTION_API_KEY
- NOTION_DATABASE_ID
- NEXT_PUBLIC_FORMSPREE_ID
- NEXT_PUBLIC_CALENDLY_USERNAME

### 特定のテストの実行
```bash
# 特定のテストファイルを実行
npm test -- src/components/layout/__tests__/PerformanceWrapper.test.tsx

# パターンに一致するテストを実行
npm test -- --testNamePattern="PerformanceWrapper"
```

## Git コミットに関する重要な注意事項

**重要**: このプロジェクトでgit commitを行う際は、co-authorizedメッセージ（Co-Authored-By）を**追加しないでください**。通常のコミットメッセージのみを使用してください。