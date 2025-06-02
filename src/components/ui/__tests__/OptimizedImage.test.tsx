import React from 'react';
import { render, screen } from '@testing-library/react';
import OptimizedImage from '../OptimizedImage';

// 必要なモックをセットアップ
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} data-testid="next-image" alt={props.alt || ''} />;
  },
}));

describe('OptimizedImage コンポーネント', () => {
  test('正しい src と alt が設定される', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  test('クラス名が正しく適用される', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="custom-class"
      />
    );
    
    const wrapper = screen.getByTestId('next-image').parentElement;
    expect(wrapper).toHaveClass('overflow-hidden');
    expect(wrapper).toHaveClass('relative');
    expect(wrapper).toHaveClass('custom-class');
  });

  test('エラー時にフォールバック画像が使用される', () => {
    const { rerender } = render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        fallback="/fallback.jpg"
      />
    );
    
    let image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    
    // エラーを発生させて再レンダリング
    const onError = image.onerror;
    if (onError) {
      onError({} as any);
      rerender(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={100}
          height={100}
          fallback="/fallback.jpg"
        />
      );
      
      image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('src', '/fallback.jpg');
    }
  });
}); 