# テスト設定

## 1. テスト環境

### 1.1 必要なパッケージ
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "ts-jest": "^29.0.0",
    "msw": "^2.0.0"
  }
}
```

### 1.2 テストスクリプト
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage"
  }
}
```

## 2. Jest設定

### 2.1 基本設定
`jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### 2.2 セットアップファイル
`jest.setup.js`:
```javascript
import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## 3. テストカテゴリ

### 3.1 ユニットテスト
- コンポーネントテスト
- ユーティリティ関数テスト
- フックテスト

### 3.2 統合テスト
- ページコンポーネントテスト
- API統合テスト
- フォームテスト

### 3.3 E2Eテスト
- ユーザーフローテスト
- クリティカルパステスト
- パフォーマンステスト

## 4. テストの書き方

### 4.1 コンポーネントテスト
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 4.2 APIテスト
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'John Doe' }));
  })
);

describe('UserProfile', () => {
  it('fetches and displays user data', async () => {
    render(<UserProfile />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

## 5. テストカバレッジ

### 5.1 カバレッジ要件
- ステートメント: 80%以上
- ブランチ: 80%以上
- 関数: 80%以上
- 行: 80%以上

### 5.2 カバレッジレポート
```bash
pnpm test:coverage
```

## 6. モック

### 6.1 MSW設定
`src/mocks/handlers.ts`:
```typescript
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'John Doe',
        email: 'john@example.com'
      })
    );
  })
];
```

### 6.2 モックの使用方法
```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## 7. テストデータ

### 7.1 テストデータファクトリ
```typescript
export const createUser = (overrides = {}) => ({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides
});
```

### 7.2 テストデータの使用方法
```typescript
const user = createUser({ name: 'Jane Doe' });
```

## 8. スナップショットテスト

### 8.1 スナップショットテストの書き方
```typescript
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});
```

### 8.2 スナップショットの更新
```bash
pnpm test -- -u
```

## 9. テストのベストプラクティス

### 9.1 テストの原則
- テストは独立していること
- テストは再現可能であること
- テストは自己文書化されていること
- テストは保守可能であること

### 9.2 テストの命名規則
- テスト名は説明的であること
- テスト名は「should」で始める
- テスト名はテストの目的を説明する

## 10. CI/CD統合

### 10.1 GitHub Actions設定
`.github/workflows/test.yml`:
```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm test:ci
```

### 10.2 テスト結果の報告
- テスト結果の表示
- カバレッジレポートの表示
- テスト失敗時の通知 