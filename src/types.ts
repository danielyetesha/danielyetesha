export type ThemeMode = 'dark' | 'light';

export interface WorkExperience {
  id: string;
  indexNumber: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  isCurrent?: boolean;
  logoIcon?: string;
  imageKey?: string;
  imageUrl?: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  highlights?: { label: string; value: string }[];
  whatIBuilt: string[];
  whatILearned: string[];
  whatIAchieved: string[];
  tasksDone: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  isCurrent?: boolean;
  gpa?: string;
  description: string;
  thesisTitle?: string;
  achievements?: string[];
  logoIcon: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: number; // percentage or rating out of 100
    rating: number; // 1-5 stars
    isPrimary?: boolean;
  }[];
}

export interface BankProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  librariesAndTools?: string[];
  metrics?: string;
  keyOutputs: string[];
  keyFeatures?: string[];
  status: 'Completed' | 'In Progress' | 'Production';
  date?: string;
  imageKey?: string;
  imageUrl?: string;
}

export interface ContactInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  aboutMe: string;
  languages: { name: string; proficiency: string }[];
  expertisePillars: string[];
}
