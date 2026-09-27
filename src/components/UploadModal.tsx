import React, { useState } from 'react';
import { SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION } from '../demoData';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (payload: {
    resumeText: string;
    jobDescription: string;
    targetRole: string;
    experienceLevel: string;
    githubUrl?: string;
    linkedinUrl?: string;
    resumeName: string;
    fileBase64?: string;
  }) => Promise<void>;
  isLoading: boolean;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyze,
  isLoading,
}) => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('Backend Developer');
  const [experienceLevel, setExperienceLevel] = useState<string>('Entry-level');
  const [githubUrl, setGithubUrl] = useState<string>('github.com/arjunsharma-dev');
  const [linkedinUrl, setLinkedinUrl] = useState<string>('linkedin.com/in/arjun-sharma-ai');
  const [fileName, setFileName] = useState<string>('');
  const [fileBase64, setFileBase64] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractionSuccess, setExtractionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setErrorMessage(null);
    setExtractionSuccess(null);

    const isPdfOrDocx = /\.pdf$|\.docx$/i.test(file.name);

    if (isPdfOrDocx) {
      setIsExtracting(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64Data = event.target?.result as string;
          setFileBase64(base64Data);

          // Call backend parser to cleanly extract text from PDF/DOCX
          const res = await fetch('/api/parse-resume-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileBase64: base64Data,
              fileName: file.name,
            }),
          });

          const data = await res.json();
          if (res.ok && data.text) {
            setResumeText(data.text);
            setExtractionSuccess(`Extracted ${data.wordCount || data.text.split(/\s+/).length} words from ${file.name}`);
          } else {
            // If backend extraction had warning, still allow client fallback
            setErrorMessage(data.error || 'Could not parse document. Please copy and paste resume text below.');
          }
        } catch (err: any) {
          console.warn('Document extraction network error:', err);
          setErrorMessage('Could not extract text from document automatically. Please copy & paste plain text below.');
        } finally {
          setIsExtracting(false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Plain text or markdown
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = (event.target?.result as string) || '';
        setResumeText(text);
        setExtractionSuccess(`Loaded ${text.split(/\s+/).length} words from ${file.name}`);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME_TEXT);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    setTargetRole('Backend Developer');
    setExperienceLevel('Entry-level');
    setGithubUrl('github.com/arjunsharma-dev');
    setLinkedinUrl('linkedin.com/in/arjun-sharma-ai');
    setFileName('Arjun_Sharma_Resume.pdf');
    setFileBase64('');
    setExtractionSuccess('Populated sample candidate profile');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() && !fileBase64) {
      setErrorMessage('Please provide your resume text or upload a document.');
      return;
    }

    setErrorMessage(null);
    try {
      await onAnalyze({
        resumeText,
        fileBase64,
        jobDescription,
        targetRole,
        experienceLevel,
        githubUrl,
        linkedinUrl,
        resumeName: fileName || 'Uploaded_Resume.pdf',
      });
    } catch (submitErr: any) {
      setErrorMessage(submitErr?.message || 'Analysis could not be started. Please retry.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A211B]/40 backdrop-blur-[2px]">
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] shadow-2xl rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E4DDD2] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C7D6F] block mb-1">
              Candidate Evaluation Protocol
            </span>
            <h2 className="font-serif text-xl font-medium text-[#2A211B] tracking-tight">
              Analyze Resume Dossier
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#8C7D6F] hover:text-[#2A211B] px-2 py-1 rounded transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs">
          {errorMessage && (
            <div className="p-3 bg-[#FAF3F2] border border-[#D98A80] text-[#A44C40] rounded-md font-sans">
              {errorMessage}
            </div>
          )}

          {/* Quick Preload Demo */}
          <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#FAF7F2] border border-[#E8E1D5] rounded-md">
            <span className="text-[#5A4E44]">
              Want a benchmark first? Populate sample candidate & target JD.
            </span>
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-3 py-1 text-xs text-[#2A211B] bg-[#FFFDF9] hover:bg-[#F3EFE6] border border-[#DDD5C7] rounded font-medium cursor-pointer transition-colors shadow-xs"
            >
              Fill Sample Data
            </button>
          </div>

          {/* Role & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-[#2A211B] block mb-1.5">Target Engineering Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-[#2A211B] focus:outline-none focus:border-[#2A211B] transition-colors"
              >
                <option value="Backend Developer">Backend Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-[#2A211B] block mb-1.5">Target Seniority Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-[#2A211B] focus:outline-none focus:border-[#2A211B] transition-colors"
              >
                <option value="Intern">Intern / Student</option>
                <option value="Entry-level">Entry-level (0 – 2 yrs)</option>
                <option value="Junior">Junior (1 – 3 yrs)</option>
                <option value="Mid-level">Mid-level (3 – 5 yrs)</option>
                <option value="Senior">Senior (5+ yrs)</option>
              </select>
            </div>
          </div>

          {/* Upload Experience: Warm Beige Box */}
          <div>
            <label className="font-medium text-[#2A211B] block mb-1.5">
              Upload Resume Document
            </label>
            <div className="p-5 border border-dashed border-[#D2C8BA] rounded-md text-center bg-[#FAF7F2] hover:bg-[#F6F1E6] transition-colors">
              <div className="text-[#8C7D6F] text-xs mb-2.5">
                PDF, DOCX or TXT documents supported (parsed automatically)
              </div>
              <label className="inline-block px-4 py-2 bg-[#FFFDF9] hover:bg-[#EFEAE0] border border-[#DDD5C7] rounded-md text-xs text-[#2A211B] font-medium cursor-pointer transition-colors shadow-xs">
                {isExtracting ? 'Extracting document text...' : 'Select Document File'}
                <input
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={handleFileUpload}
                  disabled={isExtracting}
                  className="hidden"
                />
              </label>

              {isExtracting && (
                <div className="mt-2.5 text-xs text-[#A66B38] font-medium flex items-center justify-center gap-2">
                  <span className="animate-spin text-sm">⟳</span> Reading and parsing resume structure...
                </div>
              )}

              {extractionSuccess && !isExtracting && (
                <div className="mt-2.5 text-xs text-[#5E7052] font-medium">
                  ✓ {extractionSuccess}
                </div>
              )}
            </div>
          </div>

          {/* Resume Raw Text Preview & Direct Edit */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-medium text-[#2A211B]">
                Resume Content (Editable Plain Text)
              </label>
              {resumeText && (
                <span className="text-[11px] font-mono text-[#8C7D6F]">
                  {resumeText.split(/\s+/).filter(Boolean).length} words
                </span>
              )}
            </div>
            <textarea
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Resume text will appear here automatically when you select a file, or you can paste your resume text directly..."
              className="w-full p-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-xs text-[#2A211B] font-mono leading-relaxed focus:outline-none focus:border-[#2A211B] transition-colors"
            />
          </div>

          {/* Target JD */}
          <div>
            <label className="font-medium text-[#2A211B] block mb-1.5">
              Target Job Description (Optional but recommended for JD Keyword Diff)
            </label>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste specific job posting requirements to compute exact keyword coverage & learning roadmap..."
              className="w-full p-3 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-xs text-[#2A211B] font-mono leading-relaxed focus:outline-none focus:border-[#2A211B] transition-colors"
            />
          </div>

          {/* Social Links (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-[#5A4E44] block mb-1.5">GitHub Handle (Optional)</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="github.com/username or username"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-[#2A211B] focus:outline-none focus:border-[#2A211B] transition-colors"
              >
              </input>
            </div>
            <div>
              <label className="font-medium text-[#5A4E44] block mb-1.5">LinkedIn Handle (Optional)</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="linkedin.com/in/username"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-[#2A211B] focus:outline-none focus:border-[#2A211B] transition-colors"
              >
              </input>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E4DDD2] flex items-center justify-between">
            <span className="text-[11px] text-[#8C7D6F] font-mono">
              Deterministic ATS & Dual-Engine Verification
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-[#5A4E44] hover:text-[#2A211B] cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || isExtracting}
                className="px-5 py-2 bg-[#2A211B] hover:bg-[#3D3027] text-[#FAF7F2] font-medium rounded-md text-xs transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
              >
                {isLoading ? 'Running Intelligence Pass...' : 'Execute Analysis'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
