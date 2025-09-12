import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Menu, X, Search, Bell } from 'lucide-react';
import LogoMX from './LogoMX';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: lang === 'es' ? 'Inicio' : 'Home', href: '/', icon: Home },
    { name: lang === 'es' ? 'Propiedades' : 'Properties', href: '/propiedades' },
    { name: lang === 'es' ? 'Contacto' : 'Contact', href: '/contacto' },
    { name: lang === 'es' ? 'Admin' : 'Admin', href: '/admin' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      className={
        `backdrop-blur-lg border-b sticky top-0 z-50 shadow-sm ` +
        (darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200/50')
      }
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-14 h-14 flex items-center justify-center">
              <LogoMX size={56} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {lang === 'es' ? 'Propiedades Disponibles' : 'Available Properties'}
              </h1>
              <p className="text-xs text-gray-500 font-medium">{lang === 'es' ? 'Encuentra tu hogar ideal' : 'Find your ideal home'}</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              className={`p-2 rounded-xl transition-colors font-semibold ${darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}
              onClick={() => setDarkMode(d => !d)}
              title={darkMode ? (lang === 'es' ? 'Cambiar a modo claro' : 'Switch to Light Mode') : (lang === 'es' ? 'Cambiar a modo oscuro' : 'Switch to Dark Mode')}
            >
              {darkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
            <button
              className={`p-2 rounded-xl transition-colors font-semibold ${darkMode ? 'bg-gray-800 text-blue-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}
              onClick={() => setLang(l => l === 'en' ? 'es' : 'en')}
              title={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            >
              {lang === 'en' ? 'Español' : 'English'}
            </button>
            <motion.button
              className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>
          </div>

          <motion.button
            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;