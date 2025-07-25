import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Brain, FileText } from 'lucide-react';
import TabNavigation from './components/TabNavigation';
import FileUpload from './components/FileUpload';
import ResumeAnalysisDisplay from './components/ResumeAnalysisDisplay';
import HistoryTable from './components/HistoryTable';
import Modal from './components/Modal';
import { uploadAndAnalyzeResume } from './services/resumeService';
import { ResumeAnalysis } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysis | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<ResumeAnalysis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file only');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);
    setCurrentAnalysis(null);
    
    try {
      const result = await uploadAndAnalyzeResume(file);
      
      if (result.success && result.data) {
        setCurrentAnalysis(result.data);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (analysis: ResumeAnalysis) => {
    setSelectedHistoryItem(analysis);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHistoryItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Analyzer</h1>
                <p className="text-gray-600">AI-powered resume analysis and feedback</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>PDF files supported</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Analyze Your Resume with AI
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Upload your PDF resume and get instant AI-powered analysis with personalized feedback, 
                skill recommendations, and improvement suggestions to boost your career prospects.
              </p>
            </div>
            
            <FileUpload onFileSelect={handleFileUpload} isLoading={isLoading} />
            
            {currentAnalysis && !isLoading && (
              <div className="animate-in slide-in-from-bottom-4">
                <ResumeAnalysisDisplay analysis={currentAnalysis} />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Resume Analysis History
              </h2>
              <p className="text-lg text-gray-600">
                Browse through all previously analyzed resumes with detailed insights and feedback.
              </p>
            </div>
            
            <HistoryTable onViewDetails={handleViewDetails} />
          </div>
        )}
      </main>

      {/* Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Analysis Details - ${selectedHistoryItem?.personalDetails.name || 'Resume'}`}
      >
        {selectedHistoryItem && (
          <ResumeAnalysisDisplay analysis={selectedHistoryItem} />
        )}
      </Modal>
    </div>
  );
}

export default App;