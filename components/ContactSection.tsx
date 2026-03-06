import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Send, FileText, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const ContactSection: React.FC<{ id: string }> = ({}) => {
  return (
    <section id={id} className="section-padding bg-slate-50 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-1000">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Let's Connect</h2>
          <div className="mt-2 w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center preserve-3d">
          <div className="space-y-8 preserve-3d">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Have a project in mind?</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              I'm always open to discussing new opportunities, creative ideas, or being part of your visions.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Email Me', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}`, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { label: 'Call Me', value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}`, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
              ].map((item, idx) => (
                <a key={idx} href={item.href} className="flex items-center group transform transition-all hover:translate-x-2">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 flex items-center justify-center mr-4 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase">{item.value}</p>
                  </div>
                </a>
              ))}

              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center group transform transition-all hover:translate-x-2">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 flex items-center justify-center mr-4 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">LinkedIn</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Nivedan P S</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transform transition-all duration-500 hover:scale-[1.02] tilt-card preserve-3d">
            <form
              action="https://formsubmit.co/nivedanps1234@gmail.com"
              method="POST"
              className="space-y-6 preserve-3d"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={window.location.href} />

              <div className="grid grid-cols-1 gap-6 preserve-3d">
                <div className="depth-layer">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="depth-layer">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                <input required name="subject" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Project Inquiry" />
              </div>
              <div className="depth-layer">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea required name="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Tell me more..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none transform hover:scale-105 depth-layer">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
