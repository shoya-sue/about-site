import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import PerformanceWrapper from '../PerformanceWrapper';

// モックの設定
jest.mock('@/lib/utils', () => ({
  sleep: jest.fn().mockImplementation((ms) => Promise.resolve()),
}));

describe('PerformanceWrapper コンポーネント', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('priority=true の場合、コンテンツが即座に表示される', () => {
    render(
      <PerformanceWrapper priority={true}>
        <div data-testid="test-content">Test Content</div>
      </PerformanceWrapper>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('priority=false の場合、最初はfallbackが表示され、その後にコンテンツが表示される', async () => {
    // requestIdleCallbackのモック
    const mockRequestIdleCallback = jest.fn().mockImplementation((callback) => {
      setTimeout(() => callback(), 0);
      return 1;
    });
    // windowオブジェクトにrequestIdleCallbackを追加
    window.requestIdleCallback = mockRequestIdleCallback;

    render(
      <PerformanceWrapper priority={false} fallback={<div data-testid="fallback">Loading...</div>}>
        <div data-testid="test-content">Test Content</div>
      </PerformanceWrapper>
    );

    // 最初はfallbackが表示される
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();

    // タイマーを進める
    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    // コンテンツが表示される
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();

    // 後片付け
    (window as any).requestIdleCallback = undefined;
  });

  test('requestIdleCallbackが利用できない場合、setTimeout が使用される', async () => {
    // 元のrequestIdleCallbackを一時的に削除
    const originalRequestIdleCallback = window.requestIdleCallback;
    (window as any).requestIdleCallback = undefined;

    render(
      <PerformanceWrapper priority={false}>
        <div data-testid="test-content">Test Content</div>
      </PerformanceWrapper>
    );

    // 最初はコンテンツが表示されない
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();

    // タイマーを進める
    await act(async () => {
      jest.advanceTimersByTime(1);
    });

    // 再レンダリングを待つ
    await waitFor(() => {
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    // 後片付け
    if (originalRequestIdleCallback) {
      window.requestIdleCallback = originalRequestIdleCallback;
    }
  });
}); 