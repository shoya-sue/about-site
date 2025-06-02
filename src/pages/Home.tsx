import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          {process.env.NEXT_PUBLIC_SITE_NAME || "SHO43 Portfolio"}
        </h1>
        <p className="text-center text-xl mb-12">
          ブロックチェーン技術スペシャリスト & コミュニティマネージャー
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mr-4">
            プロジェクトを見る
          </button>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg">
            お問い合わせ
          </button>
        </div>
      </section>
    </div>
  );
} 