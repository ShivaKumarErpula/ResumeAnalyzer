import React from 'react';
import { ResumeAnalysis } from '../types';
import { User, Mail, Phone, Globe, Briefcase, GraduationCap, Code, Award, Target, TrendingUp } from 'lucide-react';

interface ResumeAnalysisDisplayProps {
  analysis: ResumeAnalysis;
}

const ResumeAnalysisDisplay: React.FC<ResumeAnalysisDisplayProps> = ({ analysis }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Results</h2>
          <div className={`px-4 py-2 rounded-full font-bold text-lg ${getRatingColor(analysis.aiFeedback.rating)}`}>
            {analysis.aiFeedback.rating}/10
          </div>
        </div>
        
        {/* Personal Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <User className="w-4 h-4 mr-3 text-gray-400" />
                <span className="font-medium">{analysis.personalDetails.name}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span>{analysis.personalDetails.email}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span>{analysis.personalDetails.phone}</span>
              </div>
              {analysis.personalDetails.linkedin && (
                <div className="flex items-center text-gray-700">
                  <Globe className="w-4 h-4 mr-3 text-gray-400" />
                  <a href={analysis.personalDetails.linkedin} className="text-blue-600 hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
          Work Experience
        </h3>
        <div className="space-y-4">
          {analysis.workExperience.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              <div className="flex flex-wrap items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                <span className="text-sm text-gray-500">{exp.duration}</span>
              </div>
              <p className="text-blue-700 font-medium mb-2">{exp.company}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-600" />
          Skills
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.technical.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.soft.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education & Projects */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
            Education
          </h3>
          <div className="space-y-3">
            {analysis.education.map((edu, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                <p className="text-blue-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            Key Projects
          </h3>
          <div className="space-y-4">
            {analysis.projects.slice(0, 2).map((project, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900">{project.name}</h4>
                <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          AI-Generated Feedback
        </h3>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">Overall Assessment</h4>
          <p className="text-gray-700">{analysis.aiFeedback.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Areas for Improvement</h4>
            <ul className="space-y-2">
              {analysis.aiFeedback.improvementAreas.map((area, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Suggested Skills to Learn</h4>
            <ul className="space-y-2">
              {analysis.aiFeedback.suggestedSkills.map((skill, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisDisplay;