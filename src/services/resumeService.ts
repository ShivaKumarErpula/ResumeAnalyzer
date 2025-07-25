import { supabase } from '../lib/supabase';
import { ResumeAnalysis, UploadResponse } from '../types';

// Mock AI analysis function (in production, this would call Google Gemini API)
const mockAIAnalysis = (fileName: string): ResumeAnalysis => {
  const mockData: ResumeAnalysis = {
    id: crypto.randomUUID(),
    fileName,
    uploadDate: new Date().toISOString(),
    personalDetails: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1-555-0123",
      linkedin: "https://linkedin.com/in/johnsmith",
      portfolio: "https://johnsmith.dev"
    },
    summary: "Experienced software developer with 5+ years in full-stack web development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and mentoring junior developers.",
    workExperience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Software Developer",
        duration: "2021 - Present",
        description: "Led development of microservices architecture serving 100k+ users. Built React applications and Node.js APIs. Mentored 3 junior developers."
      },
      {
        company: "StartupCorp",
        position: "Full Stack Developer",
        duration: "2019 - 2021",
        description: "Developed MVP from scratch using React and Express. Implemented authentication, payment processing, and real-time features."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        year: "2019",
        gpa: "3.8"
      }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce solution with React, Node.js, and PostgreSQL",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        duration: "3 months"
      },
      {
        name: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        technologies: ["React", "Socket.io", "MongoDB", "Express"],
        duration: "2 months"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023"
      },
      {
        name: "React Professional Certification",
        issuer: "Meta",
        date: "2022"
      }
    ],
    skills: {
      technical: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "MongoDB", "AWS", "Docker", "Git"],
      soft: ["Leadership", "Problem Solving", "Communication", "Team Collaboration", "Project Management"]
    },
    aiFeedback: {
      rating: 8.5,
      summary: "Strong technical background with good project diversity. Resume shows clear progression and leadership experience.",
      improvementAreas: [
        "Add quantifiable achievements and metrics",
        "Include more specific technical accomplishments",
        "Consider adding volunteer work or open source contributions",
        "Expand on leadership and mentoring experiences"
      ],
      suggestedSkills: [
        "Kubernetes for container orchestration",
        "GraphQL for API development",
        "Python for data analysis",
        "DevOps practices and CI/CD",
        "Machine Learning fundamentals"
      ]
    }
  };

  return mockData;
};

export const uploadAndAnalyzeResume = async (file: File): Promise<UploadResponse> => {
  try {
    // Simulate file processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock PDF text extraction and AI analysis
    const analysis = mockAIAnalysis(file.name);
    
    // Save to database
    const { data, error } = await supabase
      .from('resume_analyses')
      .insert([{
        file_name: analysis.fileName,
        upload_date: analysis.uploadDate,
        personal_details: analysis.personalDetails,
        summary: analysis.summary,
        work_experience: analysis.workExperience,
        education: analysis.education,
        projects: analysis.projects,
        certifications: analysis.certifications,
        skills: analysis.skills,
        ai_feedback: analysis.aiFeedback
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Resume analyzed successfully!',
      data: { ...analysis, id: data.id }
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: 'Failed to analyze resume. Please try again.'
    };
  }
};

export const getResumeHistory = async (): Promise<ResumeAnalysis[]> => {
  try {
    const { data, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .order('upload_date', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      fileName: item.file_name,
      uploadDate: item.upload_date,
      personalDetails: item.personal_details,
      summary: item.summary,
      workExperience: item.work_experience,
      education: item.education,
      projects: item.projects,
      certifications: item.certifications,
      skills: item.skills,
      aiFeedback: item.ai_feedback
    }));
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};