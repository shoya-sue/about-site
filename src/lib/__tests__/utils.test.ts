import { cn, truncate, getFilenameFromUrl, shuffleArray } from '../utils';

describe('ユーティリティ関数テスト', () => {
  describe('cn()', () => {
    test('複数のクラス名を結合する', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    test('条件付きクラス名を適切に処理する', () => {
      expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
      expect(cn('foo', { bar: false })).toBe('foo');
    });

    test('クラス名の競合を解決する', () => {
      expect(cn('p-4 m-2', 'p-8')).toBe('m-2 p-8');
    });
  });

  describe('truncate()', () => {
    test('文字列が最大長より短い場合はそのまま返す', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    test('文字列が最大長より長い場合は切り詰めて省略記号を追加する', () => {
      expect(truncate('Hello, world!', 5)).toBe('Hello...');
    });

    test('文字列の長さが最大長と同じ場合はそのまま返す', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });
  });

  describe('getFilenameFromUrl()', () => {
    test('URLからファイル名を正しく抽出する', () => {
      expect(getFilenameFromUrl('https://example.com/images/photo.jpg')).toBe('photo.jpg');
    });

    test('クエリパラメータを含むURLを処理する', () => {
      expect(getFilenameFromUrl('https://example.com/images/photo.jpg?size=large')).toBe('photo.jpg');
    });

    test('パスのないURLを処理する', () => {
      expect(getFilenameFromUrl('https://example.com')).toBe('example.com');
    });
  });

  describe('shuffleArray()', () => {
    test('配列の長さは保持される', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled.length).toBe(original.length);
    });

    test('配列の内容は同じ要素を含む', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled).toEqual(expect.arrayContaining(original));
      expect(original).toEqual(expect.arrayContaining(shuffled));
    });

    test('元の配列は変更されない', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);
      expect(original).toEqual(originalCopy);
    });
  });
}); 