/**
 * ブログ記事の型定義
 */
export interface BlogPost {
  /** 記事のID */
  id: string;
  /** 記事のタイトル */
  title: string;
  /** 記事の要約 */
  excerpt: string;
  /** 公開日 (YYYY-MM-DD) */
  date: string;
  /** カテゴリー */
  category: string;
  /** カバー画像のURL */
  coverImage?: string;
  /** 記事のスラッグ（URL用） */
  slug: string;
}

/**
 * ブログ記事のページネーション用の型定義
 */
export interface BlogPagination {
  /** 総ページ数 */
  totalPages: number;
  /** 現在のページ */
  currentPage: number;
  /** 1ページあたりの記事数 */
  postsPerPage: number;
} 