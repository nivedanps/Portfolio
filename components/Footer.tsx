
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 py-12 text-slate-400 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="text-2xl font-bold text-white tracking-tight">Nivedan P S</span>
          <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">Building the future of web and AI</p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          {['Home', 'Projects', 'Education', 'Skills'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white dark:hover:text-indigo-400 transition-all hover:scale-110">
              {item}
            </a>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Nivedan P S. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-1">
            <span>Designed for Excellence</span>
            <span className="text-rose-500">❤</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
