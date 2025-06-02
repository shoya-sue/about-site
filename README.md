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

## 技術スタック
- **フロントエンド**: Next.js 14 (App Router)、React、TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks
- **多言語対応**: i18next
- **フォーム処理**: Formspree
- **アニメーション**: Framer Motion

## 実装済み機能
- 基本的なページ構造 (Home, About, Projects, Blog, Contact)
- レスポンシブデザイン
- ダークモード対応
- 多言語対応

## 今後の実装予定
- Notion APIを使用したブログ機能
- カレンダー予約機能 (Calendly)
- 画像ギャラリー
- パフォーマンス最適化

## License / ライセンス
This project is licensed under the MIT License - see the LICENSE file for details.
