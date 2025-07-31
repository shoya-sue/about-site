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

## 没入型サイトコンセプト

### サイトビジョン
訪問者がマウス操作をせずに、ただ見ているだけで魅了される完全自動アニメーションサイト。ファーストビューだけで全ての情報が伝わり、時間経過とともに展開される映画のような体験を提供。

### 選定コンセプト：「デジタル粒子」×「タイポグラフィ変容」ハイブリッド

#### 主要要素
1. **パーティクルシステム**
   - 数万の光る粒子が常に流動
   - 粒子が集まって文字や形を形成
   - 色相が時間とともに変化（青→紫→ピンク→オレンジ）
   - Three.js + WebGLで高性能レンダリング

2. **タイポグラフィアニメーション**
   - 液体のように流れる文字表現
   - SVGパスモーフィングで滑らかな変形
   - グリッチエフェクトでデジタル感演出
   - 文字が3D空間で浮遊・回転

3. **自動展開シーケンス**
   - 0-5秒：粒子が集まり「SHO43」を形成
   - 5-10秒：自己紹介テキストが液体のように流れ込む
   - 10-15秒：スキルアイコンが粒子から生成
   - 15-20秒：プロジェクト実績が3D空間に展開
   - 20-25秒：コンタクト情報がグリッチエフェクトで出現
   - 25-30秒：全要素が粒子に分解し、再び最初から

4. **視覚効果**
   - 背景：深い宇宙空間のような暗い青紫グラデーション
   - 発光エフェクト：ネオンのような光の軌跡
   - ブラー効果：被写界深度で奥行き感
   - ノイズテクスチャ：デジタル感を強調

5. **パフォーマンス最適化**
   - GPU最適化されたシェーダー使用
   - RequestAnimationFrameで60fps維持
   - 粒子数の動的調整（デバイス性能に応じて）
   - WebWorkerで計算処理を分離

### 技術実装計画

#### フェーズ1：基盤構築
- Three.js環境セットアップ
- パーティクルシステムの基本実装
- シェーダープログラミング

#### フェーズ2：アニメーション実装
- GSAPでタイムライン制御
- SVGモーフィングアニメーション
- カスタムイージング関数

#### フェーズ3：エフェクト追加
- ポストプロセッシングエフェクト
- グリッチシェーダー実装
- 発光エフェクト（Bloom）

#### フェーズ4：最適化
- LOD（Level of Detail）実装
- テクスチャアトラス使用
- 遅延ロード戦略

### 必要なライブラリ
- **Three.js**: 3Dグラフィックス
- **GSAP**: アニメーション制御
- **dat.GUI**: デバッグ用（開発時のみ）
- **postprocessing**: ビジュアルエフェクト
- **glsl-noise**: ノイズ関数

### アクセシビリティ配慮
- prefers-reduced-motionでアニメーション制御
- 高コントラストモード対応
- スクリーンリーダー用の代替テキスト
- キーボードでの一時停止機能

### 軽量化戦略
- WebP/AVIF画像フォーマット使用
- 3Dモデルの圧縮（Draco）
- CDNからのライブラリ配信
- Service Workerでキャッシュ戦略

## 詳細技術仕様

### パーティクルシステム詳細

#### 粒子の構成
```javascript
{
  count: 50000, // 基本粒子数（デバイス性能により調整）
  size: 0.02,   // 基本サイズ
  color: {
    start: 0x0066ff, // 開始色（青）
    end: 0xff6600,   // 終了色（オレンジ）
  },
  behavior: {
    velocity: { x: [-0.5, 0.5], y: [-0.5, 0.5], z: [-0.5, 0.5] },
    acceleration: 0.0001,
    lifespan: [2, 5], // 秒
    emissionRate: 100, // 毎フレーム生成数
  }
}
```

#### シェーダー実装
**頂点シェーダー**
```glsl
attribute float size;
attribute vec3 customColor;
attribute float alpha;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = customColor;
  vAlpha = alpha;
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
```

**フラグメントシェーダー**
```glsl
uniform sampler2D pointTexture;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec4 color = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
  if (color.a < 0.01) discard;
  
  // グロー効果
  float dist = distance(gl_PointCoord, vec2(0.5));
  float glow = 1.0 - smoothstep(0.0, 0.5, dist);
  
  gl_FragColor = vec4(color.rgb * glow * 2.0, color.a);
}
```

### アニメーションタイムライン詳細

#### フェーズ1: イントロダクション（0-5秒）
```javascript
timeline.to(particles, {
  duration: 5,
  onUpdate: () => {
    // 粒子が中心に集まる
    particles.forEach((p, i) => {
      const targetPos = getLetterPosition('S', 'H', 'O', '4', '3')[i];
      p.position.lerp(targetPos, 0.02);
    });
  },
  ease: "power2.inOut"
});
```

**詳細な動き**
- 0-1秒: 画面全体に散らばった粒子が微細に振動
- 1-3秒: 粒子が渦を巻きながら中心に移動
- 3-4秒: 文字の形に収束し始める
- 4-5秒: 「SHO43」の文字が完全に形成、発光エフェクト強化

#### フェーズ2: 自己紹介展開（5-10秒）
```javascript
timeline.to(textMesh, {
  duration: 5,
  morphTargets: {
    influence: 1
  },
  onUpdate: () => {
    // SVGパスの変形アニメーション
    updateSVGMorph(currentPath, targetPath, progress);
  }
});
```

**テキストアニメーション詳細**
- 液体シミュレーション: Navier-Stokes方程式の簡易実装
- 文字の流動性: ベジェ曲線でパスを動的生成
- グラデーション: 時間経過で色相が変化

#### フェーズ3: スキル表示（10-15秒）
```javascript
const skills = ['Solana', 'React', 'Three.js', 'Web3', 'TypeScript'];
skills.forEach((skill, index) => {
  timeline.to(skillParticles[index], {
    duration: 1,
    delay: index * 0.5,
    scale: [0, 1],
    rotation: [0, Math.PI * 2],
    onStart: () => generateSkillIcon(skill)
  });
});
```

**スキルアイコン生成プロセス**
1. 粒子がアイコンの輪郭を形成
2. 内部が徐々に充填される
3. 3D回転しながら定位置に配置
4. ホログラム風のスキャンライン効果

#### フェーズ4: プロジェクト展示（15-20秒）
```javascript
projects.forEach((project, i) => {
  timeline.to(projectCard[i], {
    duration: 2,
    z: i * -100,
    rotationY: i * 30,
    onUpdate: () => {
      // 3D空間での配置
      updateProjectPosition(project, camera.position);
    }
  });
});
```

**3D空間レイアウト**
- カルーセル配置: 円形に配置された3Dカード
- 被写界深度: 手前のカードは鮮明、奥はぼやける
- パララックス効果: マウス位置に微細に反応（オプション）

#### フェーズ5: コンタクト情報（20-25秒）
```javascript
timeline.to(contactInfo, {
  duration: 5,
  glitchIntensity: [0, 1, 0],
  onUpdate: (progress) => {
    // グリッチエフェクトの強度制御
    applyGlitchEffect(progress);
  }
});
```

**グリッチエフェクト詳細**
- RGB分離: 赤・緑・青のチャンネルをずらす
- スキャンライン: 水平方向のノイズライン
- デジタルノイズ: ランダムなピクセル化
- データモッシング風の歪み

#### フェーズ6: アウトロ（25-30秒）
```javascript
timeline.to(allElements, {
  duration: 5,
  onUpdate: (progress) => {
    // 全要素が粒子に分解
    elements.forEach(elem => {
      elem.explode(progress);
    });
  },
  onComplete: () => timeline.restart()
});
```

### パフォーマンス最適化詳細

#### GPU最適化
```javascript
// インスタンスメッシュの使用
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

// フラストムカリング
particles.frustumCulled = true;
```

#### 動的LOD（Level of Detail）
```javascript
const updateLOD = (distance) => {
  if (distance < 100) {
    particleCount = 50000; // 高品質
  } else if (distance < 200) {
    particleCount = 25000; // 中品質
  } else {
    particleCount = 10000; // 低品質
  }
};
```

#### メモリ管理
```javascript
// オブジェクトプーリング
class ParticlePool {
  constructor(size) {
    this.pool = new Array(size);
    this.available = [];
    
    for (let i = 0; i < size; i++) {
      const particle = new Particle();
      this.pool[i] = particle;
      this.available.push(particle);
    }
  }
  
  get() {
    return this.available.pop() || new Particle();
  }
  
  release(particle) {
    particle.reset();
    this.available.push(particle);
  }
}
```

### サウンドデザイン（オプション）

#### 環境音
- 深宇宙の低周波ハム音
- 粒子移動時の高周波シンセサウンド
- 文字形成時のクリスタライズ音

#### インタラクティブサウンド
```javascript
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

// 粒子の動きに応じて音程変化
const updateSound = (particleVelocity) => {
  oscillator.frequency.value = 440 + (particleVelocity * 100);
  gainNode.gain.value = Math.min(particleVelocity * 0.1, 0.5);
};
```

### レスポンシブ対応

#### デバイス別最適化
```javascript
const deviceProfiles = {
  mobile: {
    particleCount: 10000,
    shadowQuality: 'low',
    postProcessing: false
  },
  tablet: {
    particleCount: 25000,
    shadowQuality: 'medium',
    postProcessing: true
  },
  desktop: {
    particleCount: 50000,
    shadowQuality: 'high',
    postProcessing: true
  }
};
```

#### アダプティブクオリティ
```javascript
let frameCount = 0;
let lastTime = performance.now();

const adaptQuality = () => {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime > 1000) {
    const fps = frameCount;
    frameCount = 0;
    lastTime = currentTime;
    
    if (fps < 30) {
      // 品質を下げる
      reduceParticleCount();
      disablePostProcessing();
    } else if (fps > 50) {
      // 品質を上げる
      increaseParticleCount();
      enablePostProcessing();
    }
  }
};
```

### 実装スケジュール

#### 週1: 基盤構築
- Day 1-2: Three.js環境構築、基本シーン設定
- Day 3-4: パーティクルシステムの基礎実装
- Day 5-6: シェーダープログラムの作成
- Day 7: パフォーマンステスト、最適化

#### 週2: コアアニメーション
- Day 8-9: GSAPタイムライン設定
- Day 10-11: 文字形成アニメーション
- Day 12-13: SVGモーフィング実装
- Day 14: アニメーション調整、タイミング最適化

#### 週3: エフェクト実装
- Day 15-16: ポストプロセッシング設定
- Day 17-18: グリッチエフェクト実装
- Day 19-20: 発光・ブルーム効果
- Day 21: 全体的なビジュアル調整

#### 週4: 最終調整
- Day 22-23: レスポンシブ対応
- Day 24-25: パフォーマンス最適化
- Day 26-27: アクセシビリティ実装
- Day 28: 最終テスト、デプロイ準備

### デバッグツール

```javascript
// dat.GUI設定
const gui = new dat.GUI();
const params = {
  particleCount: 50000,
  particleSize: 0.02,
  animationSpeed: 1.0,
  glowIntensity: 2.0,
  colorScheme: 'default'
};

gui.add(params, 'particleCount', 1000, 100000).onChange(updateParticles);
gui.add(params, 'particleSize', 0.01, 0.1);
gui.add(params, 'animationSpeed', 0.1, 2.0);
gui.add(params, 'glowIntensity', 0, 5);
gui.add(params, 'colorScheme', ['default', 'warm', 'cool', 'monochrome']);
```

### セキュリティ考慮事項

- WebGL コンテキストの安全な取得
- クロスオリジンリソースの適切な処理
- メモリリークの防止
- 無限ループの回避

### ブラウザ互換性

- Chrome 90+: 完全対応
- Firefox 88+: 完全対応
- Safari 14+: WebGL2一部制限あり
- Edge 90+: 完全対応

### フォールバック戦略

```javascript
if (!window.WebGLRenderingContext) {
  // Canvas 2Dフォールバック
  initCanvas2DVersion();
} else {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  
  if (!gl) {
    // 静的画像フォールバック
    showStaticVersion();
  }
}
```

## License / ライセンス
This project is licensed under the MIT License - see the LICENSE file for details.
