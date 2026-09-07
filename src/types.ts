export interface SocialLink {
  id: string;
  platform: 'GitHub' | 'LinkedIn' | 'Twitter / X' | 'Email' | 'Discord' | 'Website' | 'Portfolio';
  url: string;
  username: string;
  iconName: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: 'Full Stack' | 'Frontend' | 'AI / Cloud' | 'AI / Local LLM' | 'AI / Agents' | 'Web3 / Security' | 'AI / Vision' | 'Mobile & Tools' | 'Open Source';
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  highlights: string[];
  metrics?: ProjectMetric[];
  architecture?: string[];
  year: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  years: string;
  icon?: string;
  isKeySkill?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  honors?: string;
  details?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  detailedBio: string[];
  location: string;
  email: string;
  phone?: string;
  availableForHire: boolean;
  avatarUrl: string;
  resumeUrl?: string;
  socials: SocialLink[];
  stats: {
    yearsOfExperience: string;
    completedProjects: string;
    codeCommits: string;
    happyCollaborators: string;
  };
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
}
