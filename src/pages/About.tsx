import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">プロフィール</h2>
          <p className="mb-4">
            ブロックチェーン技術、特にSolana関連の開発に特化したエンジニアです。
            コミュニティマネージャーとしても活動し、技術者と非技術者の架け橋となることを目指しています。
          </p>
          <p>
            新しい技術の習得と実装に情熱を持ち、オープンソースプロジェクトへの貢献も積極的に行っています。
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">スキル</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>フロントエンド開発 (React, Next.js, TypeScript)</li>
            <li>ブロックチェーン開発 (Solana, Ethereum)</li>
            <li>スマートコントラクト開発 (Rust, Solidity)</li>
            <li>コミュニティ管理・運営</li>
            <li>技術ドキュメント作成</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 