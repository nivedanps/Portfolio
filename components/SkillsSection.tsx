import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { Code2, Database, Terminal, User } from 'lucide-react';

const SkillsSection: React.FC<{ id: string }> = ({ id }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case "Frontend": return <Code2 className="w-8 h-8 text-blue-500" />;
      case "Backend": return <Database className="w-8 h-8 text-green-500" />;
      case "Tools": return <Terminal className="w-8 h-8 text-orange-500" />;
      case "Soft Skills": return <User className="w-8 h-8 text-purple-500" />;
      default: return <Code2 className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <section id={id} className="min-h-screen py-20 px-4 transition-colors duration-300 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Technical Arsenal
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, index) => (
            <div key={index} className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg dark:hover:shadow-purple-500/20 transition-all duration-300 group hover:-translate-y-1">
              <div className="mb-6 bg-slate-100/80 dark:bg-slate-700/50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {getIcon(cat.category)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 bg-slate-100/80 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200/50 dark:border-slate-600/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
