from pydantic import BaseModel, Field
from typing import List, Optional

class RoleFitItem(BaseModel):
    role: str
    score: int = Field(ge=0, le=100)
    matchingSkills: List[str]
    missingSkills: List[str]
    relevantProjects: List[str]
    relevantExperience: List[str]
    recommendedImprovements: List[str]

class SkillGapModel(BaseModel):
    skill: str
    category: str
    status: str
    importance: str
    whyItMatters: str
    currentEvidence: str
    recommendedLearning: str

class BulletModel(BaseModel):
    id: str
    original: str
    actionVerb: str
    actionVerbText: Optional[str] = None
    hasMetric: bool
    metricDetected: Optional[str] = None
    hasResult: bool
    resultDetected: Optional[str] = None
    hasTechnology: bool
    techDetected: Optional[str] = None
    impactScore: int = Field(ge=0, le=100)
    improvedVersion: str
    explanation: str

class CareerStepModel(BaseModel):
    title: str
    timeframe: str
    plausibility: str
    rationale: str
    requiredSkills: List[str]
    currentGaps: List[str]
    suggestedProject: str
    suggestedExperience: str

class InterviewQuestionModel(BaseModel):
    id: str
    category: str
    question: str
    difficulty: str
    intent: str
    practiceAnswer: str
    keyPointsToCover: List[str]

class LearningWeekModel(BaseModel):
    week: int
    theme: str
    skillsCovered: List[str]
    beginnerResource: dict
    practiceProject: dict
    expectedOutcome: str

class AnalysisResponseModel(BaseModel):
    overallHealthScore: int = Field(ge=0, le=100)
    beforeHealthScore: int = Field(ge=0, le=100)
    scores: dict
    roleFits: List[RoleFitItem]
    skillGaps: List[SkillGapModel]
    bullets: List[BulletModel]
    careerGPS: dict
    biasChecks: List[dict]
    explainableAI: dict
    interviewQuestions: List[InterviewQuestionModel]
    learningRoadmap: List[LearningWeekModel]
