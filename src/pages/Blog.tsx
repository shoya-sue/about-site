import React from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function Blog() {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Solanaブロックチェーンの基礎',
      excerpt: 'Solanaブロックチェーンの基本概念と特徴について解説します。高スループット、低手数料、環境に優しい合意アルゴリズムなどの特徴を持つSolanaの仕組みを初心者向けに説明します。',
      date: '2023-10-15',
      category: 'Blockchain'
    },
    {
      id: '2',
      title: 'Rustプログラミング入門',
      excerpt: 'ブロックチェーン開発で人気のRust言語の基礎を学びましょう。メモリ安全性、並行処理、パフォーマンスに優れたRustの特徴と基本構文を紹介します。',
      date: '2023-09-22',
      category: 'Programming'
    },
    {
      id: '3',
      title: 'Web3コミュニティの作り方',
      excerpt: 'ブロックチェーンプロジェクトの成功に不可欠なコミュニティ構築のノウハウを共有します。効果的なコミュニケーション戦略、メンバーエンゲージメント、持続可能なコミュニティ運営について解説します。',
      date: '2023-08-10',
      category: 'Community'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="border-b pb-8">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <button className="text-blue-600 hover:text-blue-800">
              続きを読む →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 