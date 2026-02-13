
import React from 'react';
import { EDUCATION_LIST } from '../constants';

const EducationSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="section-padding bg-white dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Education</h2>
          <div className="mt-2 w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {EDUCATION_LIST.map((edu, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all py-2 group hover:translate-x-2">
              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-indigo-600 shadow-[0_0_0_4px_rgba(79,70,229,0.1)] dark:shadow-[0_0_0_4px_rgba(79,70,229,0.2)]"></div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{edu.institution}</h3>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full whitespace-nowrap">
                  {edu.period}
                </span>
              </div>

              <p className="text-slate-700 dark:text-slate-300 font-medium mt-1">{edu.degree}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {edu.location}
                </span>
                <span className="text-indigo-700 dark:text-indigo-300 font-bold text-sm">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
