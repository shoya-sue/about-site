'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogProps {
  initialPosts?: BlogPost[];
}

export default function Blog({ initialPosts = [] }: BlogProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // 実際の実装ではNotion APIからデータを取得するか、initialPostsを使用します
  const posts = initialPosts.length > 0 ? initialPosts : [
    {
      id: '1',
      title: 'Solanaブロックチェーンの基礎',
      excerpt: 'Solanaブロックチェーンの基本概念と特徴について解説します。高スループット、低手数料、環境に優しい合意アルゴリズムなどの特徴を持つSolanaの仕組みを初心者向けに説明します。',
      date: '2023-10-15',
      category: 'Blockchain',
      slug: 'solana-blockchain-basics',
    },
    {
      id: '2',
      title: 'Rustプログラミング入門',
      excerpt: 'ブロックチェーン開発で人気のRust言語の基礎を学びましょう。メモリ安全性、並行処理、パフォーマンスに優れたRustの特徴と基本構文を紹介します。',
      date: '2023-09-22',
      category: 'Programming',
      slug: 'rust-programming-intro',
    },
    {
      id: '3',
      title: 'Web3コミュニティの作り方',
      excerpt: 'ブロックチェーンプロジェクトの成功に不可欠なコミュニティ構築のノウハウを共有します。効果的なコミュニケーション戦略、メンバーエンゲージメント、持続可能なコミュニティ運営について解説します。',
      date: '2023-08-10',
      category: 'Community',
      slug: 'web3-community-building',
    }
  ];

  // ユニークなカテゴリーを抽出
  const categories = Array.from(new Set(posts.map(post => post.category)));

  // 検索とフィルタリングを適用
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('blog.title')}</h1>

      {/* 検索とフィルター */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="記事を検索..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search articles"
          />
        </div>
        <div>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            aria-label="Filter by category"
          >
            <option value="">すべてのカテゴリー</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 記事一覧 */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="border-b pb-8"
              aria-labelledby={`blog-title-${post.id}`}
            >
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <time dateTime={post.date}>{post.date}</time>
                <span className="mx-2" aria-hidden="true">•</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>
              </div>
              <h2 
                id={`blog-title-${post.id}`}
                className="text-2xl font-semibold mb-2"
              >
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800"
                aria-label={`${t('blog.readMore')} ${post.title}`}
              >
                {t('blog.readMore')}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">記事が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
} 