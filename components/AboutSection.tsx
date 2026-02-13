
import React from 'react';
import { PERSONAL_INFO, ABOUT_STATS } from '../constants';

const AboutSection: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} className="min-h-screen flex items-center py-20 px-4 bg-slate-50 dark:bg-transparent transition-colors duration-300">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        About Me
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        My journey into the world of software development.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-sm border border-slate-100 dark:border-slate-700/50">
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
                            {PERSONAL_INFO.about.split('\n\n').map((paragraph, index) => {
                                const parts = paragraph.split(PERSONAL_INFO.name);
                                return (
                                    <p key={index} className={index === 0 ? "font-medium" : ""}>
                                        {parts.length > 1 ? (
                                            <>
                                                {parts[0]}
                                                <strong className="text-indigo-600 dark:text-indigo-400">{PERSONAL_INFO.name}</strong>
                                                {parts[1]}
                                            </>
                                        ) : (
                                            paragraph
                                        )}
                                    </p>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                            {ABOUT_STATS.map((stat, index) => (
                                <div key={index} className="bg-slate-50 dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-500/30 transition-all duration-300">
                                    <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                                        {stat.label}
                                    </h3>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {stat.subValue}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
