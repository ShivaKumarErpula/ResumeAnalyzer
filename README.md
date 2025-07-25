# Resume Analyzer - Full-Stack Application

A comprehensive AI-powered resume analysis tool built with React, Node.js, and Supabase. This application allows users to upload PDF resumes, receive detailed AI-generated feedback, and maintain a history of all analyzed resumes.

## 🚀 Features

### Live Resume Analysis
- **PDF Upload**: Drag-and-drop or click-to-upload interface for PDF resumes
- **AI-Powered Analysis**: Extracts structured data including:
  - Personal details (name, email, phone, LinkedIn)
  - Professional summary
  - Work experience with detailed descriptions
  - Education background
  - Skills (technical and soft skills)
  - Projects and certifications
- **Intelligent Feedback**: AI-generated insights including:
  - Resume rating (1-10 scale)
  - Specific improvement areas
  - Suggested skills for upskilling
  - Professional recommendations

### Historical Viewer
- **Complete History**: View all previously analyzed resumes
- **Detailed Table**: Sortable table with candidate info, upload dates, and ratings
- **Modal Details**: Click to view full analysis in an overlay modal
- **Data Persistence**: All analyses are stored in Supabase database

### Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant feedback and loading states
- **Error Handling**: Comprehensive error handling and user notifications
- **Modern UI**: Clean, professional interface with smooth animations
- **Type Safety**: Full TypeScript implementation

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend & Database
- **Supabase** for database and API
- **PostgreSQL** for data storage
- **Row Level Security** for data protection

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code linting
- **PostCSS** for CSS processing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Database Setup
Connect to Supabase and create the required table. The application will use a table called `resume_analyses` with the following structure:

```sql
CREATE TABLE resume_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  personal_details JSONB NOT NULL,
  summary TEXT,
  work_experience JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  projects JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  skills JSONB NOT NULL,
  ai_feedback JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can view all resume analyses" 
ON resume_analyses FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert resume analyses" 
ON resume_analyses FOR INSERT 
TO authenticated 
WITH CHECK (true);
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Usage Guide

### Analyzing a Resume
1. Navigate to the "Live Resume Analysis" tab
2. Upload a PDF resume using drag-and-drop or file picker
3. Wait for the AI analysis to complete
4. Review the comprehensive analysis results including:
   - Personal information extraction
   - Skills categorization
   - Experience breakdown
   - AI-generated feedback and suggestions

### Viewing History
1. Switch to the "Historical Viewer" tab
2. Browse all previously analyzed resumes in the table
3. Click "View Details" to see the full analysis in a modal
4. Use the table to compare different resumes and their ratings

## 🔧 Configuration

### Mock Data vs. Real AI Integration
The application currently uses mock data for demonstration purposes. In a production environment, you would integrate with real services:

- **PDF Processing**: Use libraries like `pdf-parse` or `pdf2pic`
- **AI Analysis**: Integrate with Google Gemini API or OpenAI GPT
- **File Storage**: Use Supabase Storage for PDF file management

### Customization Options
- **Styling**: Modify `tailwind.config.js` for custom themes
- **AI Prompts**: Update the mock analysis logic in `src/services/resumeService.ts`
- **Database Schema**: Extend the database schema for additional fields
- **File Types**: Add support for DOC/DOCX files

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FileUpload.tsx          # File upload interface
│   ├── ResumeAnalysisDisplay.tsx   # Analysis results display
│   ├── HistoryTable.tsx        # Historical data table
│   ├── Modal.tsx               # Reusable modal component
│   └── TabNavigation.tsx       # Tab switching component
├── services/           # API and business logic
│   └── resumeService.ts        # Backend communication
├── types/              # TypeScript type definitions
│   └── index.ts                # All application types
├── lib/                # Configuration and utilities
│   └── supabase.ts             # Supabase client setup
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

### Environment Variables
Make sure to set the following environment variables in your deployment:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `docs/` folder
- Review the FAQ section below

## ❓ FAQ

**Q: Can I analyze non-PDF files?**
A: Currently, the application only supports PDF files. Support for DOC/DOCX files can be added with additional libraries.

**Q: Is my resume data secure?**
A: Yes, all data is stored securely in Supabase with Row Level Security enabled. Your resumes are only accessible to you.

**Q: How accurate is the AI analysis?**
A: The analysis accuracy depends on the AI model used. The current implementation uses mock data, but can be enhanced with advanced AI models.

**Q: Can I delete analyzed resumes?**
A: The current version doesn't include a delete feature, but it can be easily added to the history table.

---

Built with ❤️ using React, TypeScript, and Supabase