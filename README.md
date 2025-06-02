# SHO43 Portfolio

## About Me / 自己紹介

### English
I am SHO, a passionate developer and community manager specializing in blockchain technology, particularly Solana. With a strong background in web development and blockchain integration, I focus on creating innovative solutions and fostering community growth.

### 日本語
SHOと申します。ブロックチェーン技術、特にSolanaに特化した開発者兼コミュニティマネージャーです。Web開発とブロックチェーン統合のバックグラウンドを持ち、革新的なソリューションの作成とコミュニティの成長促進に注力しています。

## Skills / スキル
- Blockchain Development (特にSolana)
- Web Development
- Community Management
- Smart Contract Development
- Web3 Integration

## Projects / プロジェクト
- [Solana BCG "SCANNNER"](https://linktr.ee/be_into_net) - Community Manager
- Various blockchain and web development projects

## Connect with Me / 連絡先
- Twitter: [@sho43_](https://twitter.com/sho43_)
- GitHub: [shoya-sue](https://github.com/shoya-sue)
- Linktree: [be_into_net](https://linktr.ee/be_into_net)

## プロジェクトセットアップ

### 環境要件
- Node.js 18.0.0以上
- npm 8.0.0以上
- Git 2.30.0以上

### インストール手順
```bash
# リポジトリのクローン
git clone https://github.com/shoya-sue/about-site.git
cd about-site

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 環境変数の設定
`.env.local`ファイルを作成し、以下の環境変数を設定してください：
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=SHO43 Portfolio
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
NEXT_PUBLIC_CALENDLY_USERNAME=your_calendly_username
```

### Notionデータベースの設定
ブログ機能のために、以下のプロパティを持つNotionデータベースを作成してください：
- `Title`: タイトル (title)
- `Excerpt`: 抜粋 (rich_text)
- `Date`: 公開日 (date)
- `Category`: カテゴリー (select)
- `Cover`: カバー画像 (files)
- `Slug`: スラッグ (rich_text)
- `Published`: 公開状態 (checkbox)

## 技術スタック
- **フロントエンド**: Next.js 14 (App Router)、React、TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks
- **多言語対応**: i18next
- **フォーム処理**: Formspree
- **コンテンツ管理**: Notion API
- **マークダウン**: React Markdown
- **アニメーション**: Framer Motion
- **フォント**: Inter (英語)、Noto Sans JP (日本語)
- **パフォーマンス計測**: Web Vitals
- **テスト**: Jest、React Testing Library

## 実装済み機能
- 基本的なページ構造 (Home, About, Projects, Blog, Contact)
- レスポンシブデザイン
- ダークモード対応
- 多言語対応（日本語・英語）
- Formspreeを使用したコンタクトフォーム
- Notion APIを使用したブログ機能
- SEO対応（メタタグ、OGP、Twitter Card）
- アクセシビリティ対応（スキップリンク、ARIAラベル）
- Calendlyを使用したミーティング予約機能
- 画像ギャラリー（ライトボックス機能付き）
- パフォーマンス最適化（遅延ロード、画像最適化、Web Vitals計測）
- テスト実装（一部のコンポーネントとユーティリティ関数のテスト）

## 今後の実装予定
1. 残りのコンポーネントのテスト実装
2. E2Eテストの追加
3. インテグレーションテストの追加

## テスト実行
```bash
# すべてのテストを実行
npm test

# ファイル変更を監視しながらテストを実行
npm run test:watch

# カバレッジレポートを生成
npm run test:coverage
```

## License / ライセンス
This project is licensed under the MIT License - see the LICENSE file for details.
