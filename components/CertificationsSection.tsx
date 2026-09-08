import React from 'react';
import { COURSES, ACHIEVEMENTS, ADDITIONAL_INFO } from '../constants';
import { Award, Trophy, BookOpen, Languages, Sparkles } from 'lucide-react';

const CertificationsSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="min-h-screen py-20 px-4 transition-colors duration-300 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Courses & Achievements
          </h2>
          <div className="mt-2 w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4">
            Continuous learning, certifications, hackathons, and workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Courses & Certifications */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Courses & Certifications</h3>
            </div>
            <div className="space-y-4">
              {COURSES.map((course, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between hover:border-indigo-400 transition-all"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {course.title}
                    </h4>
                    {course.issuer && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {course.issuer}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full shrink-0 ml-3">
                    {course.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Workshops */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-400">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hackathons & Workshops</h3>
            </div>
            <div className="space-y-4">
              {ACHIEVEMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between hover:border-purple-400 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Cards (Languages & Interests) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/40 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {ADDITIONAL_INFO.languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-700 text-sm font-medium"
                >
                  <span className="text-slate-900 dark:text-white font-bold">{lang.name}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs ml-1.5">({lang.proficiency})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-sky-50 dark:bg-sky-900/40 rounded-xl text-sky-600 dark:text-sky-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {ADDITIONAL_INFO.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
