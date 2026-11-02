import {
  Code2,
  Database,
  Layout,
  Terminal,
  Cpu,
  Globe,
  LucideIcon
} from "lucide-react";

/* ==========================================================================
   TypeScript Interfaces & Types
   ========================================================================== */

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  status: string;
  bio: string;
  aboutParagraphs: string[];
  role: string;
  educationStatus: string;
  interests?: string[];
  email: string;
  phone?: string;
  resumeUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: "Github" | "Linkedin" | "Mail";
}

export interface Project {
  id: string | number;
  sysId?: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  highlights?: string[];
  status?: string;
  github?: string | null;
  live?: string | null;
  caseStudy?: string | null;
  featured?: boolean;
  category?: string;
  date?: string;
  // Legacy / convenience compatibility
  tags?: string[];
  link?: string;
}

export interface ExperienceItem {
  id: string | number;
  sysId?: string;
  role: string;
  organization: string;
  description: string;
  // Optional / legacy compatibility fields
  location?: string;
  period?: string;
  responsibilities?: string[];
  technologies?: string[];
  org?: string;
}

// Alias for type compatibility
export type Experience = ExperienceItem;

export interface AchievementItem {
  id: string | number;
  sysId: string;
  title: string;
  category: string;
  event: string;
  year: string;
  description: string;
  link?: string | null;
  // Optional / legacy compatibility fields
  organization?: string;
  issuer?: string;
  date?: string;
}

// Alias for type compatibility
export type Achievement = AchievementItem;

export interface EducationItem {
  id: string | number;
  sysId: string;
  degree: string;
  field: string;
  school: string;
  period: string;
  grade: string;
  description: string;
  // Optional / legacy compatibility fields
  institution?: string;
  location?: string;
  startYear?: string;
  endYear?: string;
}

// Alias for type compatibility
export type Education = EducationItem;


export interface SkillCategory {
  id: number | string;
  sysId: string;
  category: string;
  items: string[];
  icon?: LucideIcon;
}

export interface CertificationItem {
  id: string | number;
  sysId: string;
  name: string;
  issuer: string;
  title?: string;
  verifyUrl?: string | null;
  certificateUrl?: string | null;
  date?: string;
  credentialId?: string | null;
  verificationUrl?: string | null;
  description?: string;
}

// Alias for type compatibility
export type Certification = CertificationItem;

export interface GithubStatus {
  sysId: string;
  username: string;
  handle?: string;
  profileUrl: string;
  repositories: number | string | null;
  contributions: number | string | null;
  topLanguages: string[];
}

/* ==========================================================================
   1. Personal Information
   ========================================================================== */

export const personalInfo: PersonalInfo = {
  name: "Nivedan P S",
  title: "Software Student",
  tagline: "I build things that turn ideas into decisions.",
  location: "Mysuru, Karnataka, India",
  status: "Available for work",
  bio: "Final-year CS undergrad and Junior Software Developer Intern at Excelsoft Technologies, working across Python, Java, and web stacks — with a growing focus on AI-driven systems and applied data visualization.",
  aboutParagraphs: [
    "I'm a Computer Science undergraduate at Maharaja Institute of Technology, Mysuru, with hands-on experience across software development, databases, and web applications.",
    "My project work spans AI-driven pipelines and data-visualization tools, and I'm comfortable across the stack — from schema design to shipping a usable interface.",
    "Beyond coursework, I'm an active hackathon participant and an enthusiastic open-source contributor, always pulling apart new tools to understand how they actually work."
  ],
  role: "Junior Software Developer Intern, Excelsoft",
  educationStatus: "Final-year B.E. CSE student",
  email: "nivedanps1234@gmail.com",
  resumeUrl: "/resume.pdf"
};

/* ==========================================================================
   2. Social Links
   ========================================================================== */

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/nivedanps",
    iconName: "Github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/nivedanps",
    iconName: "Linkedin"
  },
  {
    name: "Email",
    url: "mailto:nivedanps1234@gmail.com",
    iconName: "Mail"
  }
];

/* ==========================================================================
   3. Projects (Things I've Built)
   ========================================================================== */

export const projects: Project[] = [
  {
    id: 1,
    sysId: "SYS_BUILD.01",
    title: "Voxsynth",
    subtitle: "Real-Time Multilingual Speech Agent",
    description: "An autonomous multiplayer agent system that translates text to audio in real time across multiple languages simultaneously.",
    technologies: ["Python", "AI Agents", "Text-to-Speech", "Audio Streaming"],
    tags: ["Python", "AI Agents", "Text-to-Speech"],
    highlights: [
      "Designed an agent pipeline coordinating real-time translation and speech synthesis with low latency.",
      "Supports concurrent multilingual stream routing for seamless group and multiplayer communication."
    ],
    status: "Active",
    github: "https://github.com/nivedanps/voxsynth",
    link: "https://github.com/nivedanps/voxsynth",
    live: null,
    caseStudy: null,
    featured: true,
    category: "AI / ML",
    date: "Feb 2026"
  },
  {
    id: 2,
    sysId: "SYS_BUILD.02",
    title: "SentinelAI",
    subtitle: "AI Security & Threat Monitoring System",
    description: "An intelligent security system designed for automated threat monitoring, anomaly detection, and real-time security alerting.",
    technologies: ["Python", "AI / ML", "Anomaly Detection", "Security Systems"],
    tags: ["Python", "AI / ML", "Security Systems"],
    highlights: [
      "Engineered automated anomaly detection and threat classification routines for security logs.",
      "Structured continuous monitoring workflows to deliver timely security notification pipelines."
    ],
    status: "Active",
    github: "https://github.com/nivedanps/SentinelAI",
    link: "https://github.com/nivedanps/SentinelAI",
    live: null,
    caseStudy: null,
    featured: true,
    category: "AI / ML",
    date: "2026"
  },
  {
    id: 3,
    sysId: "SYS_BUILD.03",
    title: "Smart Faculty Feedback Portal",
    subtitle: "Feedback & Analytics Platform",
    description: "A web application to streamline the collection, aggregation, and analytical reporting of student and faculty feedback for academic institutions.",
    technologies: ["JavaScript", "Python", "Data Visualization", "Full-Stack Web"],
    tags: ["JavaScript", "Python", "Data Visualization"],
    highlights: [
      "Built interactive dashboard metrics to support administrative review and evaluation cycles.",
      "Streamlined the feedback lifecycle from anonymous submission to comprehensive reporting."
    ],
    status: "Completed",
    github: "https://github.com/nivedanps/Smart-feedback-faculty-portal",
    link: "https://github.com/nivedanps/Smart-feedback-faculty-portal",
    live: null,
    caseStudy: null,
    featured: false,
    category: "Web Application",
    date: "Jan 2026"
  },
  {
    id: 4,
    sysId: "SYS_BUILD.04",
    title: "ZOO Database Management System",
    subtitle: "Wildlife Records & Operations",
    description: "A relational database-driven management system that coordinates animal care records, diet & feeding schedules, and staff assignments for wildlife centers.",
    technologies: ["JavaScript", "Python", "MySQL", "Relational Database"],
    tags: ["JavaScript", "Python", "MySQL"],
    highlights: [
      "Structured optimized SQL schemas to streamline wildlife administration and records tracking.",
      "Built management workflows supporting day-to-day staff care operations and queries."
    ],
    status: "Completed",
    github: "https://github.com/nivedanps/zoomanager",
    link: "https://github.com/nivedanps/zoomanager",
    live: null,
    caseStudy: null,
    featured: false,
    category: "Database / Systems",
    date: "Dec 2025"
  },
  {
    id: 5,
    sysId: "SYS_BUILD.05",
    title: "HANDY CRICKET LEAGUE",
    subtitle: "Interactive Hand-Cricket Match Engine",
    description: "A digital implementation of the classic hand-cricket game featuring turn-based game logic, match simulation rules, and player scoring states.",
    technologies: ["Python", "Game Logic", "Simulation", "CLI / Web"],
    tags: ["Python", "Game Logic", "CLI / Web"],
    highlights: [
      "Implemented match simulation logic modeling batting, bowling, target chases, and decision cycles.",
      "Engineered an interactive turn-by-turn game loop with state management."
    ],
    status: "Completed",
    github: "https://github.com/nivedanps/HANDY-CRICKET-LEAGUE",
    link: "https://github.com/nivedanps/HANDY-CRICKET-LEAGUE",
    live: null,
    caseStudy: null,
    featured: false,
    category: "Software Development",
    date: "2025 - 2026"
  }
];

/* ==========================================================================
   4. Experience
   ========================================================================== */

export const experience: ExperienceItem[] = [
  {
    id: 1,
    sysId: "EXP_LOG.01",
    role: "Junior Software Developer Intern",
    organization: "Excelsoft Technologies Limited",
    description: "Software development internship at Excelsoft Technologies Limited."
  }
];

// Alias for existing component compatibility
export const workExperience = experience;

/* ==========================================================================
   5. Achievements
   ========================================================================== */

export const achievements: AchievementItem[] = [
  {
    id: 1,
    sysId: "LOG_ACHV.01",
    title: "Runner-up, Innovostava 2026",
    category: "Hackathon",
    event: "Innovostava 2026",
    year: "2026",
    description: "Secured Runner-up position at Innovostava 2026 hackathon."
  }
];

/* ==========================================================================
   6. Education
   ========================================================================== */

export const education: EducationItem[] = [
  {
    id: 1,
    sysId: "EDU_LOG.01",
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    school: "Maharaja Institute of Technology, Mysuru",
    institution: "Maharaja Institute of Technology, Mysuru",
    period: "2023 — 2027",
    grade: "CGPA: 8.73",
    description: "Currently pursuing Bachelor of Engineering in Computer Science and Engineering with a CGPA of 8.73."
  },
  {
    id: 2,
    sysId: "EDU_LOG.02",
    degree: "Pre-University (PCMB)",
    field: "PCMB",
    school: "Sadvidya Semi-Residential College, Mysuru",
    institution: "Sadvidya Semi-Residential College, Mysuru",
    period: "2022 — 2023",
    grade: "84.16%",
    description: "Completed pre-university education in PCMB with 84.16%."
  },
  {
    id: 3,
    sysId: "EDU_LOG.03",
    degree: "High School (SSLC)",
    field: "SSLC",
    school: "Bharatiya Vidya Bhavan, Mysuru",
    institution: "Bharatiya Vidya Bhavan, Mysuru",
    period: "2020 — 2021",
    grade: "91.20%",
    description: "Completed secondary school education with 91.20%."
  }
];

/* ==========================================================================
   7. Technical Skills
   ========================================================================== */

export const technicalSkills: SkillCategory[] = [
  {
    id: 1,
    sysId: "SKILL_SET.01",
    category: "Languages",
    icon: Code2,
    items: ["Java", "Python", "C", "JavaScript", "SQL"]
  },
  {
    id: 2,
    sysId: "SKILL_SET.02",
    category: "Database",
    icon: Database,
    items: ["MySQL", "MongoDB", "SQL"]
  },
  {
    id: 3,
    sysId: "SKILL_SET.03",
    category: "Software Development",
    icon: Layout,
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Problem Solving",
      "Web Development"
    ]
  },
  {
    id: 4,
    sysId: "SKILL_SET.04",
    category: "AI / ML",
    icon: Cpu,
    items: ["Generative AI", "AI Agents", "RAG"]
  },
  {
    id: 5,
    sysId: "SKILL_SET.05",
    category: "Cloud",
    icon: Globe,
    items: ["AWS Cloud Fundamentals"]
  },
  {
    id: 6,
    sysId: "SKILL_SET.06",
    category: "Tools & Technologies",
    icon: Terminal,
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"]
  }
];

// Alias for existing component compatibility
export const skills = technicalSkills;

/* ==========================================================================
   8. Certifications
   ========================================================================== */

export const certifications: CertificationItem[] = [
  {
    id: 1,
    sysId: "CERT_LOG.01",
    name: "AWS Cloud Practitioner Essentials",
    issuer: "AWS",
    certificateUrl: "https://coursera.org/verify/7RA0XGO7JYKQ",
    verifyUrl: "https://coursera.org/verify/7RA0XGO7JYKQ"
  },
  {
    id: 2,
    sysId: "CERT_LOG.02",
    name: "IBM-AI Fundamentals",
    issuer: "IBM",
    certificateUrl: "https://www.credly.com/badges/ec38b6f4-4d31-43d8-90c8-f4ec73e76406",
    verifyUrl: "https://www.credly.com/badges/ec38b6f4-4d31-43d8-90c8-f4ec73e76406"
  },
  {
    id: 3,
    sysId: "CERT_LOG.03",
    name: "Developing Front-End Apps with React",
    issuer: "Certification",
    certificateUrl: "https://coursera.org/verify/JQUS1MG8V9QZ",
    verifyUrl: "https://coursera.org/verify/JQUS1MG8V9QZ"
  },
  {
    id: 4,
    sysId: "CERT_LOG.04",
    name: "Cyber Security Technologies",
    issuer: "Certification",
    certificateUrl: "https://coursera.org/verify/NNE5XES9J5YP",
    verifyUrl: "https://coursera.org/verify/NNE5XES9J5YP"
  },
  {
    id: 5,
    sysId: "CERT_LOG.05",
    name: "Applied Machine Learning in Python",
    issuer: "University of Michigan",
    certificateUrl: "https://coursera.org/verify/K5BXL8KWQUX2",
    verifyUrl: "https://coursera.org/verify/K5BXL8KWQUX2",
    date: "12-Jun-2026",
    description: "Online course certificate authorized by University of Michigan and offered through Coursera."
  }
];

/* ==========================================================================
   9. GitHub Status
   ========================================================================== */

export const githubStatus: GithubStatus = {
  sysId: "GITHUB_LOG.01",
  username: "nivedanps",
  handle: "@nivedanps",
  profileUrl: "https://github.com/nivedanps",
  repositories: "32 Repositories",
  contributions: "Contribution data unavailable",
  topLanguages: ["JavaScript", "Python", "C#", "TypeScript", "HTML", "CSS"]
};
