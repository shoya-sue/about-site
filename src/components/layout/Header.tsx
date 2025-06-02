'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.projects'), href: '/projects' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.gallery'), href: '/gallery' },
    { name: t('navigation.contact'), href: '/contact' },
    { name: t('navigation.schedule'), href: '/schedule' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle, Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50
                           dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 