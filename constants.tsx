import React from 'react';
import { Project, Education, SkillCategory, Course, Achievement } from './types';

export const PERSONAL_INFO = {
  name: "NIVEDAN P S",
  title: "Software Engineering Student",
  subtitle: "Final year Student",
  email: "nivedanps1234@gmail.com",
  phone: "9740130224",
  linkedin: "https://www.linkedin.com/in/nivedanps",
  github: "https://github.com/nivedanps",
  summary: "Aspiring software engineering student in final year. Passionate coding enthusiast with strong knowledge of modern AI tools & software development.",
  location: "Mysuru, Karnataka, India",
  about: "Hi, I'm Nivedan P S. Currently pursuing my final year Bachelor's in Computer Science & Engineering at Maharaja Institute of Technology, Mysuru. My passion lies in building software that solves real-world problems and exploring the limitless possibilities of cutting-edge AI tools.\n\nI started my coding journey exploring the fundamentals and quickly developed a deep interest in Full-Stack Development and AI-driven systems. From building real-time multilingual autonomous agent systems to feedback portals and database management applications, I love bringing ideas to life through robust, scalable code."
};

export const ABOUT_STATS = [
  {
    label: "Education",
    value: "B.E. Computer Science",
    subValue: "Maharaja Institute of Technology (2023-2027) | 8.73 CGPA"
  },
  {
    label: "Focus",
    value: "AI & Full-Stack Development",
    subValue: "Python, Java, React, AI Tools"
  },
  {
    label: "Goal",
    value: "Software Engineer",
    subValue: "Building intelligent & scalable solutions"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Voxsynth",
    date: "FEB 2026",
    description: "Built an Autonomous multiplayer agent system that translates text to audio in real time in multiple languages simultaneously.",
    tech: ["Autonomous Agents", "Real-Time Audio", "NLP", "Python", "AI"]
  },
  {
    title: "SMART FACULTY FEEDBACK PORTAL",
    date: "JAN 2026",
    description: "Designed a Web Application to simplify feedbacks and reporting. Enhanced decision-making through organized data visualization and analytics.",
    link: "https://github.com/nivedanps/project.git",
    tech: ["React", "HTML", "PHP", "MySQL", "Data Visualization"]
  },
  {
    title: "ZOO DATABASE MANAGEMENT SYSTEM",
    date: "DEC 2025",
    description: "Developed a Zoo Management System that simplifies animal records, feeding schedules, and staff management. A step towards smarter, tech-driven wildlife care and administration.",
    link: "https://github.com/nivedanps/zoomanager.git",
    tech: ["PHP", "MySQL", "Database Management", "UI/UX Design"]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    institution: "Maharaja Institute of Technology, Mysuru",
    degree: "Bachelor of Engineering, Computer Science",
    period: "2023 – 2027",
    grade: "CGPA: 8.73",
    location: "Mysuru"
  },
  {
    institution: "Sadvidya Semi-Residential College, Mysuru",
    degree: "Pre-University Board",
    period: "2022 – 2023",
    grade: "84.16%",
    location: "Mysuru"
  },
  {
    institution: "Bharatiya Vidya Bhavan, Mysuru",
    degree: "High School",
    period: "2020 – 2021",
    grade: "91.20%",
    location: "Mysuru"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "C", "Java", "JavaScript"]
  },
  {
    category: "Technologies & Tools",
    skills: ["MySQL", "Git & GitHub", "Jupyter Notebook", "VS Code", "Antigravity", "Web Hosting", "React.js", "Node.js"]
  },
  {
    category: "Soft Skills",
    skills: ["Mentoring", "Problem Solving", "Team Collaboration", "Communication"]
  }
];

export const COURSES: Course[] = [
  {
    title: "Introduction to Generative AI",
    year: "2026"
  },
  {
    title: "Artificial Intelligence Fundamentals",
    year: "2025"
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    year: "2026"
  },
  {
    title: "Programming with JavaScript",
    year: "2026"
  },
  {
    title: "Certified in Java Language",
    year: "2025",
    issuer: "Acube Tech Skills, Mysore, India"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Innovostava 2026 (Runner)",
    category: "Hackathons / Competitions"
  },
  {
    title: "Hackverse 2025",
    category: "Hackathons / Competitions"
  },
  {
    title: "ARGHYA - Empowering Engineers with Next-Gen AI Tools",
    category: "Workshops / Seminars"
  },
  {
    title: "Be10x AI tools (Workshop)",
    category: "Workshops / Seminars"
  }
];

export const ADDITIONAL_INFO = {
  languages: [
    { name: "English", proficiency: "Professional" },
    { name: "Kannada", proficiency: "Native" },
    { name: "Hindi", proficiency: "Limited" }
  ],
  interests: ["Cricket", "Kabaddi", "Open Source Contributor"]
};
