# 開発環境設定

## 1. 前提条件

### 1.1 必要なソフトウェア
- Node.js 18.0.0以上
- npm 8.0.0以上
- Git 2.30.0以上
- VS Code（推奨エディタ）

### 1.2 推奨VS Code拡張機能
- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- i18n Ally
- GitLens

## 2. プロジェクトセットアップ

### 2.1 リポジトリのクローン
```bash
git clone https://github.com/shoya-sue/about-site.git
cd about-site
```

### 2.2 依存関係のインストール
```bash
npm install
```

### 2.3 環境変数の設定
`.env.local`ファイルを作成し、以下の環境変数を設定：

```env
# アプリケーション設定
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=SHO43 Portfolio

# Notion API設定
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id

# Formspree設定
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id

# Calendly設定
NEXT_PUBLIC_CALENDLY_USERNAME=your_calendly_username
```

## 3. 開発サーバーの起動

### 3.1 開発モード
```bash
npm run dev
```

### 3.2 ビルド
```bash
npm run build
```

### 3.3 本番モード
```bash
npm run start
```

## 4. コード品質管理

### 4.1 ESLint設定
`.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

### 4.2 Prettier設定
`.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## 5. Gitフロー

### 5.1 ブランチ命名規則
- 機能開発: `feature/機能名`
- バグ修正: `fix/バグ名`
- リリース: `release/バージョン`
- ホットフィックス: `hotfix/バグ名`

### 5.2 コミットメッセージ規則
```
<type>(<scope>): <subject>

<body>

<footer>
```

## 6. ディレクトリ構造

```
src/
├── app/              # ページコンポーネント
├── components/       # 共通コンポーネント
│   ├── ui/          # UIコンポーネント
│   ├── layout/      # レイアウトコンポーネント
│   └── sections/    # セクションコンポーネント
├── lib/             # ユーティリティ関数
├── styles/          # グローバルスタイル
├── types/           # 型定義
└── config/          # 設定ファイル
```

## 7. 開発ガイドライン

### 7.1 コンポーネント作成
- コンポーネントは`components`ディレクトリに配置
- ファイル名はPascalCase
- 1コンポーネント1ファイル
- 型定義は必ず作成

### 7.2 スタイリング
- Panda CSSを使用
- コンポーネントごとにスタイルを定義
- グローバルスタイルは最小限に

### 7.3 国際化
- テキストは必ず翻訳キーを使用
- 翻訳ファイルは`public/locales`に配置
- 言語切り替えは`next-i18next`を使用

## 8. デバッグ

### 8.1 開発者ツール
- React Developer Tools
- Redux DevTools
- Networkタブ
- Consoleタブ

### 8.2 ログ出力
```typescript
// 開発環境のみログを出力
if (process.env.NODE_ENV === 'development') {
  console.log('デバッグ情報');
}
```

## 9. パフォーマンス最適化

### 9.1 画像最適化
- `next/image`を使用
- 適切なサイズ指定
- 遅延ロードの活用

### 9.2 コード分割
- 動的インポートの活用
- コンポーネントの遅延ロード

## 10. トラブルシューティング

### 10.1 よくある問題
1. 依存関係の競合
   - `npm install`を実行
   - `node_modules`を削除して再インストール

2. ビルドエラー
   - TypeScriptの型エラーを確認
   - ESLintの警告を確認

3. 環境変数の問題
   - `.env.local`の設定を確認
   - 環境変数の再読み込み

### 10.2 サポート
- GitHub Issuesを使用
- チーム内での相談
- ドキュメントの確認 