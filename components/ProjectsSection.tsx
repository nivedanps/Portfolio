
import React from 'react';
import { PROJECTS } from '../constants';

const ProjectsSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="section-padding transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-1000 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Featured Projects</h2>
            <div className="mt-2 w-16 h-1 bg-indigo-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 preserve-3d">
          {PROJECTS.map((project, index) => (
            <div key={index} className="group bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100/50 dark:border-slate-700/50 hover:shadow-xl dark:hover:shadow-purple-500/10 hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all duration-300 tilt-card preserve-3d hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4 preserve-3d">
                <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 tracking-widest uppercase depth-layer">
                  {project.date}
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-50 dark:bg-slate-700 rounded-full text-slate-400 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors depth-layer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors preserve-3d">
                {project.title}
              </h3>

              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed min-h-[80px] preserve-3d">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 preserve-3d">
                {project.tech.map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full depth-layer">
                    {tag}
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

export default ProjectsSection;
