
export interface Project {
  title: string;
  description: string;
  date: string;
  link?: string;
  tech: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  location: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Course {
  title: string;
  year: string;
  issuer?: string;
  link?: string;
}

export interface Achievement {
  title: string;
  category: string;
}
