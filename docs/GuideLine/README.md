# アクセシビリティガイドライン

## 1. WCAG 2.1準拠

### 1.1 レベルA要件
- キーボード操作のサポート
- 十分なコントラスト比
- 代替テキストの提供
- フォームのラベル付け
- エラーの識別と説明

### 1.2 レベルAA要件
- リサイズ可能なテキスト
- フォーカス可視性
- 一貫したナビゲーション
- エラーの防止
- 言語の識別

## 2. キーボードアクセシビリティ

### 2.1 フォーカス管理
```typescript
// フォーカストラップの実装例
const FocusTrap = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = ref.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        // フォーカス管理のロジック
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <div ref={ref}>{children}</div>;
};
```

### 2.2 スキップリンク
```typescript
const SkipLink = () => (
  <a
    href="#main-content"
    className="skip-link"
    style={{
      position: 'absolute',
      top: '-40px',
      left: '0',
      background: '#000',
      color: 'white',
      padding: '8px',
      zIndex: 100,
      ':focus': {
        top: '0'
      }
    }}
  >
    Skip to main content
  </a>
);
```

## 3. スクリーンリーダー対応

### 3.1 ARIA属性
```typescript
// ボタンの例
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  aria-controls="modal-content"
>
  Close
</button>
```

### 3.2 ライブリージョン
```typescript
// 通知の例
<div
  aria-live="polite"
  aria-atomic="true"
>
  {notification}
</div>
```

## 4. コントラストとカラー

### 4.1 コントラスト比
- 通常のテキスト: 4.5:1以上
- 大きなテキスト: 3:1以上
- 非テキスト要素: 3:1以上

### 4.2 カラーユーザビリティ
```typescript
// カラーユーザビリティの例
const ColorCheck = ({ color, text }) => {
  const contrast = getContrastRatio(color, '#ffffff');
  return (
    <div style={{ color, backgroundColor: '#ffffff' }}>
      {text} (Contrast: {contrast.toFixed(2)})
    </div>
  );
};
```

## 5. フォームアクセシビリティ

### 5.1 フォームラベル
```typescript
// フォームの例
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  {error}
</span>
```

### 5.2 エラー処理
```typescript
// エラー処理の例
const FormError = ({ error }) => (
  <div
    role="alert"
    aria-live="assertive"
    className="error-message"
  >
    {error}
  </div>
);
```

## 6. メディアアクセシビリティ

### 6.1 画像
```typescript
// 画像の例
<img
  src="image.jpg"
  alt="Description of the image"
  width="300"
  height="200"
/>
```

### 6.2 動画
```typescript
// 動画の例
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="captions.vtt"
    srcLang="en"
    label="English"
  />
</video>
```

## 7. ナビゲーション

### 7.1 ヘッダーナビゲーション
```typescript
// ナビゲーションの例
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

### 7.2 パンくずリスト
```typescript
// パンくずリストの例
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>
```

## 8. モーダルとダイアログ

### 8.1 モーダル
```typescript
// モーダルの例
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

### 8.2 アラート
```typescript
// アラートの例
const Alert = ({ message }) => (
  <div
    role="alert"
    aria-live="assertive"
    className="alert"
  >
    {message}
  </div>
);
```

## 9. テストと検証

### 9.1 アクセシビリティテスト
```bash
# axe-coreを使用したテスト
npm run test:a11y
```

### 9.2 手動テスト
- キーボードナビゲーション
- スクリーンリーダーテスト
- コントラストチェック
- ズームテスト

## 10. リソース

### 10.1 ツール
- axe DevTools
- WAVE Evaluation Tool
- Color Contrast Analyzer
- VoiceOver (macOS)
- NVDA (Windows)

### 10.2 ドキュメント
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) 