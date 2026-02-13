
import React, { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-900 shadow-md bg-slate-200">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-900">Nivedan P S</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${activeSection === link.id
                    ? 'bg-green-600 text-white border-green-600 scale-105 shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-white border-slate-300 dark:border-slate-600 hover:scale-110 hover:shadow-xl hover:border-green-500 hover:bg-green-50 dark:hover:bg-slate-700'
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 text-slate-700 dark:text-slate-200 shadow-sm"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 text-slate-700 dark:text-slate-200 shadow-sm"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === link.id
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-indigo-500 hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
