
import React from 'react';
import { Project, Education, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "NIVEDAN P S",
  title: "Software Engineering Student",
  subtitle: "Final year Student",
  email: "nivedanps1234@gmail.com",
  phone: "9740130224",
  linkedin: "https://www.linkedin.com/in/nivedanps",
  github: "https://github.com/nivedanps",
  summary: "Building new blocks of boxes through AI tools & a Code enthusiast",
  location: "Mysore, Karnataka, India",
  about: "Hi, I'm Nivedan P S. Currently pursuing my  Final year Bachelor's in Computer Science student at Maharaja Institute of Technology, Mysuru. My passion lies in building software that solves real-world problems and exploring the limitless possibilities of AI tools.\n\nI started my coding journey exploring the basics, but quickly fell in love with Full Stack Development. The ability to bring ideas to life through code constantly drives me. Since then, I've been deep-diving into the React ecosystem, mastering modern web technologies, and building applications that make a difference."
};

export const ABOUT_STATS = [
  {
    label: "Education",
    value: "B.E. Computer Science",
    subValue: "Maharaja Institute of Technology (2023-2027)"
  },
  {
    label: "Focus",
    value: "Full-Stack Development",
    subValue: "React, Node.js, AI Tools,"
  },
  {
    label: "Goal",
    value: "Software Engineer",
    subValue: "Building scalable solutions"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "SMART FACULTY FEEDBACK PORTAL",
    date: "JAN 2026",
    description: "Developed a college website that gathers all the feedback under one portal. Implemented secure admin access and separate portals for faculty and admin.",
    link: "https://github.com/nivedanps/project.git",
    tech: ["React", "HTML", "PHP", "MySQL"]
  },
  {
    title: "ZOO MANAGEMENT SYSTEM",
    date: "DEC 2025",
    description: "Built a user-friendly UI/UX design for managing records of animals and zookeepers. Includes separate portals for visitors and zoo administration.",
    tech: ["PHP", "UI/UX Design", "Database Management"]
  }
];

export const EDUCATION_LIST: Education[] = [
  {
    institution: "Maharaja Institute of Technology",
    degree: "Bachelor of Engineering, Computer Science",
    period: "2023 - 2027",
    grade: "CGPA: 8.73",
    location: "Mysuru"
  },
  {
    institution: "Sadvidya Semi-Residential College",
    degree: "PUC (12th Grade)",
    period: "2022 - 2023",
    grade: "84.16%",
    location: "Mysuru"
  },
  {
    institution: "Bharatiya Vidya Bhavan",
    degree: "SSLC (10th Grade)",
    period: "2021",
    grade: "91.20%",
    location: "Mysuru"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "MySQL", "PHP", "MongoDB", "Python", "Java"]
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook"]
  },
  {
    category: "Soft Skills",
    skills: ["Problem Solving", "Quick Learner", "Team Collaborator"]
  }
];




