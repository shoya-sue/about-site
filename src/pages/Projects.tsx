import React from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
}

export default function Projects() {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      id: 1,
      titleKey: "projects.wallet.title",
      descriptionKey: "projects.wallet.description",
      technologies: ["React", "TypeScript", "Solana Web3.js", "Tailwind CSS"]
    },
    {
      id: 2,
      titleKey: "projects.marketplace.title",
      descriptionKey: "projects.marketplace.description",
      technologies: ["Next.js", "Rust", "Solana", "AWS"]
    },
    {
      id: 3,
      titleKey: "projects.dashboard.title",
      descriptionKey: "projects.dashboard.description",
      technologies: ["Vue.js", "Node.js", "GraphQL", "Ethereum"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('projects.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article 
            key={project.id} 
            className="border rounded-lg overflow-hidden shadow-lg"
            aria-labelledby={`project-title-${project.id}`}
          >
            <div className="p-6">
              <h2 
                id={`project-title-${project.id}`}
                className="text-xl font-semibold mb-2"
              >
                {t(project.titleKey)}
              </h2>
              <p className="text-gray-600 mb-4">{t(project.descriptionKey)}</p>
              <div 
                className="flex flex-wrap gap-2"
                aria-label="Technologies used"
              >
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 