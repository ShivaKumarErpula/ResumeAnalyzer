export interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolio?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  duration?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
}

export interface AIFeedback {
  rating: number;
  summary: string;
  improvementAreas: string[];
  suggestedSkills: string[];
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  uploadDate: string;
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  skills: Skills;
  aiFeedback: AIFeedback;
  rawText?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: ResumeAnalysis;
}