import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "ブロックチェーンウォレット",
      description: "Solanaブロックチェーン用のウェブウォレットアプリケーション。トークン管理、NFT表示、トランザクション履歴の表示機能を実装。",
      technologies: ["React", "TypeScript", "Solana Web3.js", "Tailwind CSS"]
    },
    {
      id: 2,
      title: "NFTマーケットプレイス",
      description: "デジタルアートのNFTを売買できるマーケットプレイス。オークション機能やクリエイター報酬の自動分配機能を実装。",
      technologies: ["Next.js", "Rust", "Solana", "AWS"]
    },
    {
      id: 3,
      title: "DeFiダッシュボード",
      description: "複数のDeFiプロトコルの資産を一括管理・可視化するダッシュボード。リアルタイムのパフォーマンス分析機能を実装。",
      technologies: ["Vue.js", "Node.js", "GraphQL", "Ethereum"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 