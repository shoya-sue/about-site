'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/shoya-sue',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/sho43_',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/sho43',
    icon: Linkedin,
  },
];

export default function Footer() {
  const { t } = useTranslation();

  const footerNavigation = [
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.projects'), href: '/projects' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center space-x-6 md:space-x-12">
          {footerNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex justify-center space-x-6">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label={item.name}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>

        <div className="mt-8 text-center text-gray-400 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} Portfolio. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
} 