
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 selection:bg-indigo-100 selection:text-indigo-700 dark:text-slate-100">
      {/* 3D Animated Background */}
      <Background3D isDark={isDark} />

      {/* Starfield styling removed in favor of 3D component */}

      <Navbar activeSection={activeSection} isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative z-10">
        <Hero id="home" />
        <AboutSection id="about" />
        <EducationSection id="education" />
        <ProjectsSection id="projects" />
        <SkillsSection id="skills" />
        <ContactSection id="contact" />
      </main>

      <Footer />
    </div>
  );
};

export default App;
