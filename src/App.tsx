import React, { useState } from 'react';
import { DEMO_ANALYSIS_DATA, SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION } from './demoData';
import { FullAnalysisData } from './types';
import { parseResumeLocally } from './services/resumeAnalyzer';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OverviewTab } from './components/OverviewTab';
import { RoleFitTab } from './components/RoleFitTab';
import { SkillGapTab } from './components/SkillGapTab';
import { AtsSimulatorTab } from './components/AtsSimulatorTab';
import { JdDiffTab } from './components/JdDiffTab';
import { BulletRewriterTab } from './components/BulletRewriterTab';
import { CareerGpsTab } from './components/CareerGpsTab';
import { GitHubConsistencyTab } from './components/GitHubConsistencyTab';
import { RecruiterScanTab } from './components/RecruiterScanTab';
import { ExplainableAiTab } from './components/ExplainableAiTab';
import { GlowUpCardTab } from './components/GlowUpCardTab';
import { InterviewPrepTab } from './components/InterviewPrepTab';
import { PythonStreamlitCodeTab } from './components/PythonStreamlitCodeTab';
import { UploadModal } from './components/UploadModal';

export function App() {
  const [data, setData] = useState<FullAnalysisData>(DEMO_ANALYSIS_DATA);
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDemo, setIsDemo] = useState<boolean>(true);
  const [resumeText, setResumeText] = useState<string>(SAMPLE_RESUME_TEXT);
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JOB_DESCRIPTION);

  const handleTryDemo = () => {
    setData(DEMO_ANALYSIS_DATA);
    setResumeText(SAMPLE_RESUME_TEXT);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    setIsDemo(true);
    setCurrentTab('overview');
  };

  const handleAnalyze = async (payload: {
    resumeText: string;
    jobDescription: string;
    targetRole: string;
    experienceLevel: string;
    githubUrl?: string;
    linkedinUrl?: string;
    resumeName: string;
    fileBase64?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Analysis request failed');
      }

      const result: FullAnalysisData = await response.json();
      setData(result);
      setResumeText(result.atsResult?.rawParsedText || payload.resumeText);
      setJobDescription(payload.jobDescription);
      setIsDemo(false);
      setIsUploadOpen(false);
      setCurrentTab('overview');
    } catch (err) {
      console.warn('Analysis error, utilizing robust local parser:', err);
      const fallbackData = parseResumeLocally(
        payload.resumeText || 'Candidate Technical Resume',
        payload.targetRole,
        payload.experienceLevel,
        payload.jobDescription,
        payload.resumeName
      );
      setData(fallbackData);
      setResumeText(payload.resumeText);
      setJobDescription(payload.jobDescription);
      setIsDemo(false);
      setIsUploadOpen(false);
      setCurrentTab('overview');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2A211B] antialiased selection:bg-[#EAE2D5] selection:text-[#2A211B]">
      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onTryDemo={handleTryDemo}
        onOpenUpload={() => setIsUploadOpen(true)}
        healthScore={data.overallHealthScore}
        isDemo={isDemo}
      />

      {/* Main Analytical Layout */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Understated Slim Sidebar */}
          <aside className="md:col-span-3 sticky top-20">
            <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />
          </aside>

          {/* Main Workspace Viewport */}
          <main className="md:col-span-9 min-w-0 pb-16">
            {currentTab === 'overview' && (
              <OverviewTab data={data} onNavigate={setCurrentTab} />
            )}
            {currentTab === 'role-fit' && (
              <RoleFitTab roleFits={data.roleFits} defaultRole={data.targetRole} />
            )}
            {currentTab === 'skill-gap' && (
              <SkillGapTab
                skillGaps={data.skillGaps}
                roadmap={data.learningRoadmap}
                targetRole={data.targetRole}
              />
            )}
            {currentTab === 'jd-diff' && (
              <JdDiffTab jdDiff={data.jdDiff} jobDescription={jobDescription} />
            )}
            {currentTab === 'bullet-rewriter' && (
              <BulletRewriterTab
                bullets={data.bullets}
                quantification={data.quantification}
                toneAndSeniority={data.toneAndSeniority}
                targetRole={data.targetRole}
              />
            )}
            {currentTab === 'ats-sim' && (
              <AtsSimulatorTab atsResult={data.atsResult} originalText={resumeText} />
            )}
            {currentTab === 'gamification' && (
              <GlowUpCardTab data={data} />
            )}
            {currentTab === 'career-gps' && (
              <CareerGpsTab careerGPS={data.careerGPS} />
            )}
            {currentTab === 'learning-path' && (
              <SkillGapTab
                skillGaps={data.skillGaps}
                roadmap={data.learningRoadmap}
                targetRole={data.targetRole}
              />
            )}
            {currentTab === 'interview-prep' && (
              <InterviewPrepTab
                questions={data.interviewQuestions}
                targetRole={data.targetRole}
              />
            )}
            {currentTab === 'recruiter-scan' && (
              <RecruiterScanTab recruiterScan={data.recruiterScan} />
            )}
            {currentTab === 'consistency' && (
              <GitHubConsistencyTab
                githubData={data.githubAnalysis}
                defaultUsername={data.githubAnalysis?.username || 'arjunsharma-dev'}
              />
            )}
            {currentTab === 'explainable-bias' && (
              <ExplainableAiTab
                explainableAI={data.explainableAI}
                biasChecks={data.biasChecks}
              />
            )}
            {currentTab === 'python-code' && (
              <PythonStreamlitCodeTab data={data} />
            )}
          </main>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
