import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

/**
 * Core Web Vitalsなどのパフォーマンス指標を収集する
 */
export function reportWebVitals(options: { debug?: boolean } = {}): void {
  const { debug = false } = options;
  
  // 開発環境またはデバッグが有効な場合のみ
  const isReporting = process.env.NODE_ENV === 'production' || debug;
  
  if (!isReporting) return;
  
  try {
    // Largest Contentful Paint (LCP)
    onLCP((metric) => {
      logMetric('LCP', metric.value);
      sendToAnalytics(metric);
    });
    
    // First Input Delay (FID)
    onFID((metric) => {
      logMetric('FID', metric.value);
      sendToAnalytics(metric);
    });
    
    // Cumulative Layout Shift (CLS)
    onCLS((metric) => {
      logMetric('CLS', metric.value);
      sendToAnalytics(metric);
    });
    
    // First Contentful Paint (FCP)
    onFCP((metric) => {
      logMetric('FCP', metric.value);
      sendToAnalytics(metric);
    });
    
    // Time to First Byte (TTFB)
    onTTFB((metric) => {
      logMetric('TTFB', metric.value);
      sendToAnalytics(metric);
    });
  } catch (error) {
    console.error('Failed to report web vitals:', error);
  }
}

/**
 * ログにパフォーマンス指標を出力する
 */
function logMetric(name: string, value: number): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Web Vitals] ${name}: ${Math.round(value)}${name === 'CLS' ? '' : 'ms'}`);
  }
}

/**
 * アナリティクスサービスに指標を送信する
 * @param metric パフォーマンス指標
 */
function sendToAnalytics(metric: any): void {
  // 実際のアナリティクスサービス（Google Analyticsなど）に送信する実装
  // 例: window.gtag('event', 'web_vitals', { name: metric.name, value: metric.value, ... });
  
  // 現在は実装しないでおく（将来的に必要に応じて実装する）
} 