import React from 'react';
import Blog from '@/pages/Blog';
import { getPublishedBlogPosts } from '@/lib/notion';
import { BlogPost } from '@/types/blog';

export const revalidate = 3600; // 1時間ごとに再検証

export default async function Page() {
  let posts: BlogPost[] = [];
  
  try {
    // Notion APIからブログ記事を取得する
    posts = await getPublishedBlogPosts();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    // エラーが発生した場合でもクラッシュさせない
  }

  return <Blog initialPosts={posts} />;
} 