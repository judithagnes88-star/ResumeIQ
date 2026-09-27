export interface RoleFitScore {
  role: string;
  score: number; // 0-100
  matchingSkills: string[];
  missingSkills: string[];
  relevantProjects: string[];
  relevantExperience: string[];
  recommendedImprovements: string[];
}

export type RoleFitItem = RoleFitScore;

export type SkillStatus = 'Strong' | 'Present' | 'Partial' | 'Missing' | 'Recommended';

export interface SkillGapItem {
  skill: string;
  category: 'Languages' | 'Frameworks' | 'Cloud & DevOps' | 'Databases' | 'Core Concepts' | 'Tools';
  status: SkillStatus;
  importance: 'High' | 'Medium' | 'Low';
  whyItMatters: string;
  currentEvidence: string;
  recommendedLearning: string;
}

export interface BulletImpact {
  id: string;
  original: string;
  actionVerb: 'Strong' | 'Moderate' | 'Weak';
  actionVerbText?: string;
  hasMetric: boolean;
  metricDetected?: string;
  hasResult: boolean;
  resultDetected?: string;
  hasTechnology: boolean;
  techDetected?: string;
  impactScore: number; // 0-100
  improvedVersion: string;
  explanation: string;
}

export interface QuantificationItem {
  text: string;
  hasMetrics: boolean;
  detectedMetrics: string[];
  suggestions: string[];
}

export interface ATSSectionCheck {
  sectionName: string;
  present: boolean;
  readabilityScore: number;
  extractedSnippet: string;
  issues: string[];
}

export interface ATSParsingResult {
  overallQualityScore: number; // e.g. 87%
  detectedName: string;
  detectedEmail: string;
  detectedPhone: string;
  detectedEducation: string[];
  detectedExperience: string[];
  detectedProjects: string[];
  detectedSkills: string[];
  detectedCertifications: string[];
  rawParsedText: string;
  parsingIssues: {
    type: 'formatting' | 'tables' | 'columns' | 'fonts' | 'missing_section';
    severity: 'critical' | 'warning' | 'info';
    message: string;
    advice: string;
  }[];
}

export interface JDDifKeyword {
  keyword: string;
  status: 'present' | 'related' | 'missing';
  jdCount: number;
  resumeCount: number;
  contextSnippet?: string;
  suggestedAction: string;
}

export interface RecruiterScanZone {
  zoneName: string;
  attentionLevel: 'HIGH ATTENTION' | 'MEDIUM ATTENTION' | 'LOW ATTENTION';
  fixationTimeMs: number;
  percentageAttention: number;
  critique: string;
  recommendation: string;
}

export interface CareerGPSStep {
  title: string;
  timeframe: string;
  plausibility: 'High' | 'Moderate' | 'Emerging';
  rationale: string;
  requiredSkills: string[];
  currentGaps: string[];
  suggestedProject: string;
  suggestedExperience: string;
}

export interface GitHubRepoAnalysis {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  relevanceToResume: string;
}

export interface GitHubConsistencyResult {
  username: string;
  profileFound: boolean;
  publicRepoCount: number;
  topLanguages: { language: string; count: number }[];
  matchedClaims: {
    claim: string;
    githubEvidence: string;
    verdict: 'Consistent' | 'Needs stronger evidence' | 'Limited public evidence found';
    commentary: string;
  }[];
  overallConsistencyScore: number;
  neutralSummary: string;
}

export interface BiasItem {
  category: 'Age / DOB' | 'Photo / Appearance' | 'Marital Status' | 'Gender / Pronouns' | 'Address / Location' | 'Unnecessary Personal Info';
  detectedText: string;
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ExplainableFactor {
  factor: string;
  category: 'Skills' | 'Projects' | 'Experience' | 'Keywords' | 'Quantification' | 'Formatting';
  contribution: number; // e.g. +22 or -14
  evidence: string;
}

export interface MultiPassConsensus {
  passA: { name: string; score: number; focus: string };
  passB: { name: string; score: number; focus: string };
  passC: { name: string; score: number; focus: string };
  consensusScore: number;
  agreementPercentage: number;
  varianceNote: string;
  keyDebatePoints: string[];
}

export interface InterviewQuestion {
  id: string;
  category: 'Technical' | 'Behavioral' | 'Project-based' | 'Role-specific' | 'Resume-based';
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  intent: string;
  practiceAnswer: string;
  keyPointsToCover: string[];
}

export interface LearningWeek {
  week: number;
  theme: string;
  skillsCovered: string[];
  beginnerResource: {
    title: string;
    type: 'Documentation' | 'Free Course' | 'Hands-on Lab' | 'Tutorial';
    url?: string;
  };
  practiceProject: {
    name: string;
    description: string;
    deliverable: string;
  };
  expectedOutcome: string;
}

export interface ResumeHealthMetric {
  category: 'ATS' | 'Impact' | 'Keywords' | 'Readability' | 'Role Fit' | 'Consistency' | 'Evidence';
  score: number;
  weight: number;
  status: 'excellent' | 'good' | 'needs_work';
  quickFix: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface MilestoneBadge {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface FullAnalysisData {
  resumeName: string;
  targetRole: string;
  experienceLevel: 'Intern' | 'Entry-level' | 'Junior' | 'Mid-level' | 'Senior';
  overallHealthScore: number; // 0-100
  beforeHealthScore: number;
  summary: {
    topStrengths: string[];
    mainImprovementAreas: string[];
    recommendedNextActions: string[];
  };
  scores: {
    atsCompatibility: number;
    roleFit: number;
    keywordCoverage: number;
    achievementStrength: number;
    readability: number;
    skillCoverage: number;
    experienceAlignment: number;
  };
  roleFits: RoleFitScore[];
  skillGaps: SkillGapItem[];
  atsResult: ATSParsingResult;
  jdDiff: {
    matchPercentage: number;
    presentCount: number;
    totalKeywords: number;
    keywords: JDDifKeyword[];
  };
  bullets: BulletImpact[];
  quantification: {
    quantifiedPercentage: number;
    totalBullets: number;
    quantifiedBullets: number;
    items: QuantificationItem[];
  };
  toneAndSeniority: {
    selectedLevel: string;
    assessment: 'Too Junior' | 'Appropriate' | 'Too Senior';
    explanation: string;
    examples: { original: string; reason: string; suggested: string }[];
  };
  careerGPS: {
    currentProfile: string;
    trajectory: CareerGPSStep[];
  };
  githubAnalysis?: GitHubConsistencyResult;
  biasChecks: BiasItem[];
  explainableAI: {
    baseScore: number;
    finalScore: number;
    factors: ExplainableFactor[];
    heuristicDisclaimer: string;
  };
  recruiterScan: {
    overallVisibilityScore: number;
    zones: RecruiterScanZone[];
    scanSimulationDisclaimer: string;
  };
  consensus: MultiPassConsensus;
  interviewQuestions: InterviewQuestion[];
  learningRoadmap: LearningWeek[];
  healthBreakdown: ResumeHealthMetric[];
  badges: AchievementBadge[];
  improvementSuggestions: {
    category: string;
    action: string;
    beforeExample: string;
    afterExample: string;
    expectedScoreGain: number;
  }[];
}
