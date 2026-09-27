import { FullAnalysisData } from './types';

export const SAMPLE_RESUME_TEXT = `ARJUN SHARMA
Bengaluru, India | +91 98765 43210 | arjun.sharma.dev@gmail.com
GitHub: github.com/arjunsharma-dev | LinkedIn: linkedin.com/in/arjun-sharma-ai
Date of Birth: 14/08/2003 | Marital Status: Single

PROFESSIONAL SUMMARY
Motivated Computer Science undergraduate specializing in Machine Learning and Backend Development. Strong background in Python, PyTorch, and REST API engineering. Looking for an AI/ML or Backend Developer role to build scalable intelligent applications.

EDUCATION
B.Tech in Computer Science & Engineering (CGPA: 8.7/10)
National Institute of Technology, Karnataka (NITK) | 2021 – 2025

TECHNICAL SKILLS
- Programming: Python, SQL, C++, JavaScript
- AI / ML: PyTorch, Scikit-learn, Pandas, NumPy, OpenCV, HuggingFace Transformers
- Backend: FastAPI, Flask, PostgreSQL, SQLite, RESTful APIs
- Cloud & Tools: Git, GitHub, Docker (Basic), Linux, Postman
- Soft Skills: Problem Solving, Technical Writing, Agile Collaboration

EXPERIENCE
Machine Learning Intern | TechNova Analytics, Bengaluru
May 2024 – July 2024
- Worked on a machine learning project for customer churn prediction.
- Developed data preprocessing pipelines in Python using Pandas and NumPy to clean over 150,000 raw customer records.
- Built a gradient boosted classification model achieving 89% accuracy, improving early retention detection.
- Assisted in containerizing inference scripts with Docker and deploying API endpoints via FastAPI.

Software Engineering Intern | CodeCraft Solutions (Remote)
Dec 2023 – Jan 2024
- Created a website dashboard for internal analytics tracking.
- Implemented backend REST endpoints in Flask connected to PostgreSQL database.
- Collaborated with senior engineers in bi-weekly sprints and resolved 14 Jira issues.

PROJECTS
1. SemanticSearch-AI: Dense Vector Retrieval Engine (Python, FastAPI, FAISS, PyTorch)
- Architected enterprise-scale AI infrastructure for multi-modal semantic document querying.
- Integrated sentence-transformers embedding model with FAISS vector index, reducing query response latency from 450ms to 78ms.
- Built asynchronous FastAPI backend serving over 1,200 requests per minute in load tests.
- Open-sourced on GitHub with 65 stars and 12 forks.

2. ChurnGuard: Customer Retention ML Microservice (Scikit-learn, FastAPI, Streamlit)
- Trained multiple classification algorithms (XGBoost, Random Forest) on telecom dataset.
- Generated SHAP feature explanations for customer risk scores.
- Deployed interactive Streamlit application for sales teams to simulate retention strategies.

3. Automated Invoice OCR Parser (OpenCV, Tesseract, Python, Regex)
- Extracted line items and total amounts from scanned PDF receipts.
- Wrote regex extractors for vendor GSTIN and date fields.

CERTIFICATIONS
- DeepLearning.AI: Machine Learning Specialization (Coursera)
- AWS Certified Cloud Practitioner (In Progress)
- HackerRank: Python (5-Star Verified Gold Badge)`;

export const SAMPLE_JOB_DESCRIPTION = `Job Title: Junior Backend / ML Engineer
Company: CloudScale AI Technologies
Location: Hybrid (Bengaluru) / Remote

About the Role:
We are seeking an ambitious Junior Backend / ML Engineer to join our core intelligence team. You will build and scale reliable microservices that serve machine learning models to thousands of enterprise users daily.

Key Responsibilities:
- Design, implement, and maintain high-performance RESTful APIs and background job workers in Python (FastAPI / Celery).
- Integrate ML models into production pipelines with robust monitoring, latency optimization, and validation.
- Design relational database schemas in PostgreSQL, optimize complex SQL queries, and implement Redis caching.
- Build automated CI/CD pipelines and package services into Docker containers for deployment on AWS ECS/EKS.
- Collaborate with frontend developers and data scientists in an agile environment to deliver customer-facing features.

Required Qualifications & Skills:
- B.S. or B.Tech in Computer Science, Data Science, or related technical field.
- Strong proficiency in Python, object-oriented design, and asynchronous programming (FastAPI or Django).
- Hands-on experience with SQL and relational databases (PostgreSQL preferred).
- Familiarity with Machine Learning workflows (PyTorch, Scikit-learn, model inference).
- Solid grasp of containerization with Docker and version control with Git.

Bonus Points:
- Experience with cloud platforms (AWS, GCP, or Azure).
- Familiarity with message brokers like Kafka, RabbitMQ, or Celery.
- Public GitHub projects showcasing clean architecture, test coverage, and documentation.`;

export const DEMO_ANALYSIS_DATA: FullAnalysisData = {
  resumeName: "Arjun_Sharma_Resume.pdf",
  targetRole: "Backend Developer",
  experienceLevel: "Entry-level",
  overallHealthScore: 82,
  beforeHealthScore: 61,
  summary: {
    topStrengths: [
      "Robust core Python proficiency with both ML (PyTorch, Scikit-learn) and Backend (FastAPI, Flask) capabilities",
      "Demonstrated latency reduction project (450ms -> 78ms) with FAISS vector retrieval & load testing",
      "Clean educational pedigree in Computer Science (NITK) with verified HackerRank credentials",
      "Practical internship exposure building real data pipelines and API services"
    ],
    mainImprovementAreas: [
      "Missing critical production backend skills required by JD: Redis, Celery, and automated CI/CD",
      "Several resume bullets lack quantified business metrics (e.g. 'Created a website dashboard')",
      "Seniority tone mismatch: 'Architected enterprise-scale AI infrastructure' sounds disproportionate for an entry-level student",
      "Unnecessary personal data (Date of Birth, Marital Status) triggers unconscious bias flags"
    ],
    recommendedNextActions: [
      "Add Dockerfile & CI/CD workflow badges to top GitHub repositories to provide verifiable proof of DevOps claims",
      "Rewrite weak bullets to follow the Action Verb + Task + Tech + Metric + Result formula",
      "Remove Date of Birth and Marital Status from header",
      "Complete a weekend mini-project showcasing Redis caching with PostgreSQL on FastAPI"
    ]
  },
  scores: {
    atsCompatibility: 87,
    roleFit: 82,
    keywordCoverage: 76,
    achievementStrength: 78,
    readability: 91,
    skillCoverage: 80,
    experienceAlignment: 74
  },
  roleFits: [
    {
      role: "Backend Developer",
      score: 82,
      matchingSkills: ["Python", "FastAPI", "Flask", "RESTful APIs", "PostgreSQL", "SQLite", "Git", "Docker"],
      missingSkills: ["Redis", "Celery", "Kafka", "CI/CD", "AWS ECS"],
      relevantProjects: ["SemanticSearch-AI (FastAPI + Async)", "ChurnGuard ML Microservice"],
      relevantExperience: ["TechNova Analytics API Deployment", "CodeCraft Flask Endpoints"],
      recommendedImprovements: ["Add Redis caching layer to your FastAPI project", "Implement background workers using Celery"]
    },
    {
      role: "AI / ML Engineer",
      score: 79,
      matchingSkills: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "HuggingFace", "FastAPI", "Vector DB (FAISS)"],
      missingSkills: ["MLflow", "Dockerized Serving", "Model Monitoring", "Triton"],
      relevantProjects: ["SemanticSearch-AI", "ChurnGuard Classification", "Invoice OCR Parser"],
      relevantExperience: ["TechNova ML Intern (Churn classification with 89% accuracy)"],
      recommendedImprovements: ["Include model drift monitoring or MLflow experiment tracking"]
    },
    {
      role: "Data Analyst",
      score: 74,
      matchingSkills: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
      missingSkills: ["Power BI", "Tableau", "Advanced Excel", "dbt", "Snowflake"],
      relevantProjects: ["ChurnGuard Streamlit Dashboard", "Customer Preprocessing Pipelines"],
      relevantExperience: ["Cleaned 150k+ raw customer records at TechNova Analytics"],
      recommendedImprovements: ["Showcase interactive business dashboards with executive KPI summaries"]
    },
    {
      role: "Full Stack Developer",
      score: 68,
      matchingSkills: ["Python", "JavaScript", "REST APIs", "PostgreSQL", "HTML/CSS"],
      missingSkills: ["React / Next.js", "TypeScript", "Tailwind CSS", "State Management"],
      relevantProjects: ["CodeCraft Internal Analytics Dashboard"],
      relevantExperience: ["Flask backend integration with frontend UI"],
      recommendedImprovements: ["Build a full-stack project with modern React/TypeScript frontend connected to your FastAPI backend"]
    },
    {
      role: "Cloud / DevOps Engineer",
      score: 52,
      matchingSkills: ["Linux", "Git", "Docker (Basic)", "AWS (In progress)"],
      missingSkills: ["Kubernetes", "Terraform", "CI/CD (GitHub Actions)", "AWS EKS", "Prometheus"],
      relevantProjects: ["SemanticSearch-AI containerization"],
      relevantExperience: ["Assisted Docker container deployment at TechNova"],
      recommendedImprovements: ["Build complete GitHub Actions CI/CD pipeline deploying to AWS"]
    }
  ],
  skillGaps: [
    {
      skill: "Python",
      category: "Languages",
      status: "Strong",
      importance: "High",
      whyItMatters: "Primary language for backend services and AI workflows in the target team.",
      currentEvidence: "5-star verified HackerRank badge, 3 major repositories, 2 internships.",
      recommendedLearning: "Already strong. Focus on advanced concurrency (asyncio event loops)."
    },
    {
      skill: "FastAPI",
      category: "Frameworks",
      status: "Strong",
      importance: "High",
      whyItMatters: "Standard microservice framework specified directly in the Job Description.",
      currentEvidence: "Built asynchronous APIs serving 1,200 req/min in SemanticSearch-AI.",
      recommendedLearning: "Master dependency injection, middleware security, and OpenAPI documentation."
    },
    {
      skill: "PostgreSQL & SQL",
      category: "Databases",
      status: "Partial",
      importance: "High",
      whyItMatters: "Core relational persistence layer for enterprise client transactional data.",
      currentEvidence: "Listed in skills and mentioned in CodeCraft internship, but lacks query optimization details.",
      recommendedLearning: "Study indexing strategies, EXPLAIN ANALYZE execution plans, and transaction isolation levels."
    },
    {
      skill: "Docker",
      category: "Cloud & DevOps",
      status: "Partial",
      importance: "High",
      whyItMatters: "Essential for packaging microservices into portable production units.",
      currentEvidence: "Listed as 'Docker (Basic)' and assisting with containerizing inference scripts.",
      recommendedLearning: "Write multi-stage Dockerfiles, reduce image size, and orchestrate with docker-compose."
    },
    {
      skill: "Redis & Caching",
      category: "Databases",
      status: "Missing",
      importance: "High",
      whyItMatters: "Explicitly requested in JD for latency optimization and token rate limiting.",
      currentEvidence: "No mention of Redis, Memcached, or distributed cache in resume.",
      recommendedLearning: "Implement a Redis caching layer for the SemanticSearch vector queries."
    },
    {
      skill: "Celery / Message Queues",
      category: "Frameworks",
      status: "Missing",
      importance: "Medium",
      whyItMatters: "Handles long-running asynchronous tasks (PDF parsing, model retraining) outside the HTTP cycle.",
      currentEvidence: "Not found in resume projects or experience.",
      recommendedLearning: "Connect Celery with RabbitMQ or Redis broker to run background invoice OCR jobs."
    },
    {
      skill: "AWS & Cloud Services",
      category: "Cloud & DevOps",
      status: "Partial",
      importance: "Medium",
      whyItMatters: "Company hosts production workloads on AWS ECS and EKS.",
      currentEvidence: "AWS Certified Cloud Practitioner listed as 'In Progress'.",
      recommendedLearning: "Deploy your FastAPI container to AWS App Runner or ECS Fargate."
    }
  ],
  atsResult: {
    overallQualityScore: 87,
    detectedName: "Arjun Sharma",
    detectedEmail: "arjun.sharma.dev@gmail.com",
    detectedPhone: "+91 98765 43210",
    detectedEducation: [
      "B.Tech in Computer Science & Engineering (CGPA: 8.7/10), NIT Karnataka (2021 – 2025)"
    ],
    detectedExperience: [
      "Machine Learning Intern | TechNova Analytics, Bengaluru (May 2024 – July 2024)",
      "Software Engineering Intern | CodeCraft Solutions (Dec 2023 – Jan 2024)"
    ],
    detectedProjects: [
      "SemanticSearch-AI: Dense Vector Retrieval Engine",
      "ChurnGuard: Customer Retention ML Microservice",
      "Automated Invoice OCR Parser"
    ],
    detectedSkills: [
      "Python", "SQL", "C++", "JavaScript", "PyTorch", "Scikit-learn", "Pandas",
      "NumPy", "OpenCV", "HuggingFace", "FastAPI", "Flask", "PostgreSQL", "Docker", "Git"
    ],
    detectedCertifications: [
      "DeepLearning.AI: Machine Learning Specialization",
      "HackerRank: Python (5-Star Verified Gold Badge)"
    ],
    rawParsedText: "ARJUN SHARMA\nBengaluru, India | +91 98765 43210 | arjun.sharma.dev@gmail.com\n...",
    parsingIssues: [
      {
        type: "columns",
        severity: "info",
        message: "Single-column format detected",
        advice: "Great! Single-column layouts parse reliably across 99% of ATS engines without scrambled reading order."
      },
      {
        type: "formatting",
        severity: "warning",
        message: "Date of Birth and Marital Status included in header",
        advice: "Many global ATS parsers flag personal demographics as compliance liabilities. Move or delete these."
      },
      {
        type: "missing_section",
        severity: "info",
        message: "No dedicated Publications or Open Source section header",
        advice: "SemanticSearch-AI has 65 GitHub stars; consider highlighting an 'Open Source Contributions' subsection."
      }
    ]
  },
  jdDiff: {
    matchPercentage: 76,
    presentCount: 16,
    totalKeywords: 21,
    keywords: [
      { keyword: "Python", status: "present", jdCount: 4, resumeCount: 6, contextSnippet: "Strong proficiency in Python", suggestedAction: "Well covered with verifiable proof." },
      { keyword: "FastAPI", status: "present", jdCount: 3, resumeCount: 4, contextSnippet: "RESTful APIs in Python (FastAPI)", suggestedAction: "Strongly highlighted in projects and internships." },
      { keyword: "PostgreSQL", status: "present", jdCount: 2, resumeCount: 2, contextSnippet: "Relational database schemas in PostgreSQL", suggestedAction: "Present; add specific query tuning examples." },
      { keyword: "Docker", status: "related", jdCount: 2, resumeCount: 2, contextSnippet: "Package services into Docker containers", suggestedAction: "Change 'Docker (Basic)' to describe actual containerization tasks." },
      { keyword: "PyTorch", status: "present", jdCount: 1, resumeCount: 2, contextSnippet: "ML workflows (PyTorch, Scikit-learn)", suggestedAction: "Great alignment with target team's AI focus." },
      { keyword: "Scikit-learn", status: "present", jdCount: 1, resumeCount: 2, contextSnippet: "ML workflows (PyTorch, Scikit-learn)", suggestedAction: "Clearly backed by ChurnGuard project." },
      { keyword: "Git / GitHub", status: "present", jdCount: 2, resumeCount: 4, contextSnippet: "Version control with Git and public GitHub", suggestedAction: "Profile link present with repository stars." },
      { keyword: "RESTful APIs", status: "present", jdCount: 2, resumeCount: 3, contextSnippet: "High-performance RESTful APIs", suggestedAction: "Directly referenced in multiple experience items." },
      { keyword: "Redis", status: "missing", jdCount: 2, resumeCount: 0, contextSnippet: "Implement Redis caching for high throughput", suggestedAction: "Missing! If you have used Redis for sessions or caching, add it." },
      { keyword: "Celery", status: "missing", jdCount: 2, resumeCount: 0, contextSnippet: "Background job workers in Python (FastAPI / Celery)", suggestedAction: "Missing! Highlight asynchronous job queue knowledge." },
      { keyword: "AWS", status: "related", jdCount: 2, resumeCount: 1, contextSnippet: "Deployment on AWS ECS/EKS", suggestedAction: "Only mentioned as 'In Progress'. Build a small live deployment on AWS." },
      { keyword: "CI/CD", status: "missing", jdCount: 1, resumeCount: 0, contextSnippet: "Build automated CI/CD pipelines", suggestedAction: "Add GitHub Actions workflows to your repositories." },
      { keyword: "SQL Optimization", status: "related", jdCount: 1, resumeCount: 1, contextSnippet: "Optimize complex SQL queries", suggestedAction: "Mention indexing or EXPLAIN query optimization in project bullets." }
    ]
  },
  bullets: [
    {
      id: "b1",
      original: "Worked on a machine learning project for customer churn prediction.",
      actionVerb: "Weak",
      actionVerbText: "Worked on",
      hasMetric: false,
      hasResult: false,
      hasTechnology: false,
      impactScore: 32,
      improvedVersion: "Engineered an end-to-end customer churn prediction pipeline using Python and Scikit-learn, identifying high-risk churn patterns across [add sample size] accounts with [add percentage]% precision.",
      explanation: "'Worked on' is passive. Replace with dynamic action verbs and specify tech stack + business output."
    },
    {
      id: "b2",
      original: "Built a gradient boosted classification model achieving 89% accuracy, improving early retention detection.",
      actionVerb: "Strong",
      actionVerbText: "Built",
      hasMetric: true,
      metricDetected: "89% accuracy",
      hasResult: true,
      resultDetected: "improving early retention detection",
      hasTechnology: true,
      techDetected: "gradient boosted classification",
      impactScore: 88,
      improvedVersion: "Trained and deployed a gradient boosted classification model (XGBoost) achieving 89% test accuracy, accelerating early customer churn detection by [add time saved, e.g. 15 days].",
      explanation: "Excellent bullet! Has action verb, metric (89%), and tangible result. Adding time-to-detection enhances it further."
    },
    {
      id: "b3",
      original: "Created a website dashboard for internal analytics tracking.",
      actionVerb: "Weak",
      actionVerbText: "Created",
      hasMetric: false,
      hasResult: false,
      hasTechnology: false,
      impactScore: 38,
      improvedVersion: "Developed an internal telemetry analytics dashboard using Flask and PostgreSQL, providing [add number, e.g. 25+] team members real-time visibility into weekly sprint KPIs.",
      explanation: "Lacks metrics, tools used, and who used the dashboard. Specify audience size and core benefits."
    },
    {
      id: "b4",
      original: "Integrated sentence-transformers embedding model with FAISS vector index, reducing query response latency from 450ms to 78ms.",
      actionVerb: "Strong",
      actionVerbText: "Integrated",
      hasMetric: true,
      metricDetected: "from 450ms to 78ms (82% reduction)",
      hasResult: true,
      resultDetected: "latency reduction",
      hasTechnology: true,
      techDetected: "sentence-transformers, FAISS vector index",
      impactScore: 94,
      improvedVersion: "Engineered dense vector retrieval pipeline pairing HuggingFace Transformers with FAISS vector indexes, slashing query latency by 82% (450ms → 78ms) under concurrent load.",
      explanation: "Outstanding bullet! Concretely quantifies engineering impact using industry benchmark units (ms)."
    },
    {
      id: "b5",
      original: "Extracted line items and total amounts from scanned PDF receipts.",
      actionVerb: "Moderate",
      actionVerbText: "Extracted",
      hasMetric: false,
      hasResult: false,
      hasTechnology: false,
      impactScore: 45,
      improvedVersion: "Automated OCR extraction pipeline using OpenCV and Tesseract to parse receipt line items and vendor metadata, processing [add volume, e.g. 500+] documents with [add accuracy, e.g. 96]% field extraction accuracy.",
      explanation: "Action verb is decent, but misses scale, volume, and accuracy metrics."
    }
  ],
  quantification: {
    quantifiedPercentage: 50,
    totalBullets: 8,
    quantifiedBullets: 4,
    items: [
      {
        text: "Clean over 150,000 raw customer records",
        hasMetrics: true,
        detectedMetrics: ["150,000 records"],
        suggestions: ["Quantified scale is clear."]
      },
      {
        text: "Built a gradient boosted classification model achieving 89% accuracy",
        hasMetrics: true,
        detectedMetrics: ["89% accuracy"],
        suggestions: ["Good accuracy metric; consider adding business impact (e.g. churn prevention value)."]
      },
      {
        text: "Reducing query response latency from 450ms to 78ms",
        hasMetrics: true,
        detectedMetrics: ["450ms to 78ms", "1,200 req/min"],
        suggestions: ["Top tier quantification!"]
      },
      {
        text: "Worked on a machine learning project for customer churn prediction",
        hasMetrics: false,
        detectedMetrics: [],
        suggestions: ["Add dataset size", "Add model validation score", "Add features processed"]
      },
      {
        text: "Created a website dashboard for internal analytics tracking",
        hasMetrics: false,
        detectedMetrics: [],
        suggestions: ["Add daily active users", "Add query response time", "Add automated report frequency"]
      }
    ]
  },
  toneAndSeniority: {
    selectedLevel: "Entry-level",
    assessment: "Appropriate",
    explanation: "Overall tone is appropriately positioned for a promising graduating senior with internship experience. However, one specific bullet uses inflated executive framing ('Architected enterprise-scale AI infrastructure') which can raise skepticism with technical hiring managers.",
    examples: [
      {
        original: "Architected enterprise-scale AI infrastructure for multi-modal semantic document querying.",
        reason: "'Architected enterprise-scale infrastructure' implies staff-level distributed systems governance.",
        suggested: "Engineered a high-throughput semantic search service for multi-modal document retrieval."
      },
      {
        original: "Assisted in containerizing inference scripts with Docker",
        reason: "Appropriately humble and authentic representation of internship duties.",
        suggested: "Maintained: Great phrasing for entry-level engineering collaboration."
      }
    ]
  },
  careerGPS: {
    currentProfile: "Computer Science Undergraduate / Junior ML & Backend Developer",
    trajectory: [
      {
        title: "Current: ML / Backend Engineering Intern",
        timeframe: "Present",
        plausibility: "High",
        rationale: "Demonstrated through 2 completed internships and functional open-source microservices.",
        requiredSkills: ["Python", "FastAPI", "SQL", "Git", "Scikit-learn"],
        currentGaps: ["Production CI/CD", "Redis Caching"],
        suggestedProject: "Build an end-to-end vector search demo with live public URL",
        suggestedExperience: "Deliver features in an agile team repository"
      },
      {
        title: "Potential Next Role: Junior Backend / AI Engineer",
        timeframe: "0 – 1.5 Years",
        plausibility: "High",
        rationale: "Natural progression from current skill portfolio. Bridges model inference with robust API microservices.",
        requiredSkills: ["PostgreSQL optimization", "Docker", "AWS ECS", "Redis", "FastAPI"],
        currentGaps: ["Distributed task queues (Celery)", "Database connection pooling"],
        suggestedProject: "Deploy an asynchronous invoice parser API with Celery worker and Redis broker",
        suggestedExperience: "Own production endpoints handling user traffic with 99.9% uptime SLA"
      },
      {
        title: "Potential Career Direction: Mid-Level Backend / ML Systems Engineer",
        timeframe: "2 – 4 Years",
        plausibility: "Moderate",
        rationale: "Building on solid foundations, can progress to architecting data ingestion pipelines and low-latency model inference servers.",
        requiredSkills: ["Kubernetes", "Kafka / Event Streaming", "System Design", "Triton Inference Server"],
        currentGaps: ["Distributed systems architecture", "Observability (OpenTelemetry/Grafana)"],
        suggestedProject: "Event-driven microservices architecture using Apache Kafka and FastAPI",
        suggestedExperience: "Lead architectural migrations and mentor junior developers"
      },
      {
        title: "Long-Term Trajectory: Staff AI Infrastructure Engineer",
        timeframe: "5+ Years",
        plausibility: "Emerging",
        rationale: "High-value trajectory scaling generative AI systems, model serving infra, and real-time vector indexes across distributed clusters.",
        requiredSkills: ["GPU cluster orchestration (Slurm/Ray)", "Model quantization (vLLM/TensorRT-LLM)", "Cost optimization"],
        currentGaps: ["Low-level CUDA optimization", "Large-scale infrastructure budgeting"],
        suggestedProject: "Self-hosted quantized LLM serving cluster benchmarked against commercial APIs",
        suggestedExperience: "Drive infrastructure strategy for core product intelligence"
      }
    ]
  },
  githubAnalysis: {
    username: "arjunsharma-dev",
    profileFound: true,
    publicRepoCount: 14,
    topLanguages: [
      { language: "Python", count: 8 },
      { language: "Jupyter Notebook", count: 3 },
      { language: "TypeScript", count: 2 },
      { language: "C++", count: 1 }
    ],
    matchedClaims: [
      {
        claim: "Proficient in Python and FastAPI microservices",
        githubEvidence: "Found repository 'SemanticSearch-AI' with FastAPI routes, FAISS integration, and Dockerfile.",
        verdict: "Consistent",
        commentary: "Public code validates asynchronous endpoint implementation and proper project organization."
      },
      {
        claim: "Customer churn classification with Scikit-learn",
        githubEvidence: "Found repository 'ChurnGuard' with clean notebook and Streamlit dashboard.",
        verdict: "Consistent",
        commentary: "Evidence confirms modeling experiments, confusion matrix plots, and feature importance."
      },
      {
        claim: "Experienced with Docker containerization",
        githubEvidence: "Dockerfiles found in 2 repositories, but lack multi-stage builds or docker-compose files.",
        verdict: "Needs stronger evidence",
        commentary: "Basic Docker usage verified, but public evidence for complex production container setups is limited."
      },
      {
        claim: "AWS & Cloud Infrastructure expertise",
        githubEvidence: "No Terraform, CloudFormation, or AWS SDK scripts detected across public repositories.",
        verdict: "Limited public evidence found",
        commentary: "Consistent with candidate's own 'In Progress' certification status. Adding a small deployment repo would provide strong corroboration."
      }
    ],
    overallConsistencyScore: 84,
    neutralSummary: "Strong alignment between resume technical claims and public GitHub artifacts in Python and Machine Learning. Cloud infrastructure claims have limited public visibility, which is normal for an entry-level candidate."
  },
  biasChecks: [
    {
      category: "Age / DOB",
      detectedText: "Date of Birth: 14/08/2003",
      recommendation: "Consider removing your exact date of birth unless specifically mandated by regional government job forms. It can trigger unconscious age bias in private tech hiring.",
      riskLevel: "Medium"
    },
    {
      category: "Marital Status",
      detectedText: "Marital Status: Single",
      recommendation: "Marital status is irrelevant for software engineering competence and should be removed to maintain a standard international professional format.",
      riskLevel: "High"
    },
    {
      category: "Address / Location",
      detectedText: "Bengaluru, India",
      recommendation: "Appropriate city/country notation. Full street addresses are not needed and this clean summary is standard practice.",
      riskLevel: "Low"
    },
    {
      category: "Photo / Appearance",
      detectedText: "No photo embedded in resume",
      recommendation: "Excellent practice! Omitting photographs prevents appearance bias and improves ATS compliance in US/UK/tech hiring pipelines.",
      riskLevel: "Low"
    }
  ],
  explainableAI: {
    baseScore: 50,
    finalScore: 82,
    factors: [
      { factor: "Strong Python & FastAPI Evidence", category: "Skills", contribution: 18, evidence: "Demonstrated across 2 projects and TechNova internship." },
      { factor: "Quantified Latency Reduction (450ms -> 78ms)", category: "Quantification", contribution: 12, evidence: "High-impact metric validating performance tuning skills." },
      { factor: "Targeted CS Degree (NITK) with 8.7 CGPA", category: "Education" as any, contribution: 8, evidence: "Strong technical pedigree in CS fundamentals." },
      { factor: "Clean Single-Column ATS Format", category: "Formatting", contribution: 6, evidence: "Standard fonts, clean section headers, no complex nested tables." },
      { factor: "Open Source Engagement (65 GitHub Stars)", category: "Projects", contribution: 5, evidence: "Demonstrates community validation of code quality." },
      { factor: "Missing Production Redis / Caching Layer", category: "Keywords", contribution: -5, evidence: "Explicitly requested in JD for scaling backend APIs." },
      { factor: "Lack of Celery / Message Queue Evidence", category: "Skills", contribution: -4, evidence: "Job description requires background worker coordination." },
      { factor: "Unquantified Internship Dashboard Bullet", category: "Quantification", contribution: -4, evidence: "'Created a website dashboard' lacks measurable impact metrics." },
      { factor: "Exaggerated Seniority Phrasing", category: "Experience", contribution: -4, evidence: "'Architected enterprise infrastructure' creates skepticism." }
    ],
    heuristicDisclaimer: "Note: Feature contribution values are generated as an explanatory heuristic to provide transparency into scoring weights, not as a proprietary black-box ranking."
  },
  recruiterScan: {
    overallVisibilityScore: 88,
    zones: [
      {
        zoneName: "Header & Identity (Top 15%)",
        attentionLevel: "HIGH ATTENTION",
        fixationTimeMs: 1250,
        percentageAttention: 24,
        critique: "Candidate name and contact channels are prominent. However, Date of Birth and Marital Status occupy prime upper-fold visual real estate.",
        recommendation: "Replace marital status and DOB with a 1-line professional title: 'Junior Backend & Machine Learning Engineer'."
      },
      {
        zoneName: "Technical Skills Matrix (Upper Third)",
        attentionLevel: "HIGH ATTENTION",
        fixationTimeMs: 1400,
        percentageAttention: 28,
        critique: "Well-structured categorization (Programming, AI/ML, Backend, Cloud & Tools). Recruiter immediately spots Python, FastAPI, and PyTorch.",
        recommendation: "Elevate SQL to the top of programming skills to directly match database-heavy JD requirements."
      },
      {
        zoneName: "Recent Internship: TechNova (Middle Third)",
        attentionLevel: "HIGH ATTENTION",
        fixationTimeMs: 1350,
        percentageAttention: 26,
        critique: "The 89% accuracy metric and 150k records stand out on a quick diagonal glance.",
        recommendation: "Make the first bullet stronger so the immediate anchor is an engineering action verb."
      },
      {
        zoneName: "Project Highlights: SemanticSearch (Lower Middle)",
        attentionLevel: "MEDIUM ATTENTION",
        fixationTimeMs: 850,
        percentageAttention: 14,
        critique: "The numbers '450ms to 78ms' and '1,200 req/min' catch the eye during a secondary scan.",
        recommendation: "Add direct GitHub repo link next to the project title for immediate click-through."
      },
      {
        zoneName: "Certifications & Education (Bottom)",
        attentionLevel: "LOW ATTENTION",
        fixationTimeMs: 450,
        percentageAttention: 8,
        critique: "Usually verified only after initial qualification filter passes.",
        recommendation: "Current bottom placement is standard and effective."
      }
    ],
    scanSimulationDisclaimer: "6-second recruiter scan simulation — heuristic visualization based on F-pattern and Z-pattern scanning research. Does not guarantee individual recruiter behavior."
  },
  consensus: {
    passA: { name: "Technical Relevance Pass", score: 84, focus: "Evaluates exact programming language, framework, and algorithmic stack match" },
    passB: { name: "Impact & Quantification Pass", score: 79, focus: "Penalizes passive verbs and unquantified responsibility statements" },
    passC: { name: "ATS & Structure Reliability Pass", score: 83, focus: "Audits semantic section hierarchy, reading order, and parser safety" },
    consensusScore: 82,
    agreementPercentage: 94,
    varianceNote: "High consensus across all three analytical passes (variance < 5 points). Greatest variation arose in impact scoring due to 2 unquantified bullets.",
    keyDebatePoints: [
      "All passes agreed that Python and FastAPI capabilities are strong matches for the role.",
      "Pass B docked 5 additional points because 3 out of 8 bullets lack measurable business outcomes.",
      "Consensus agrees on an overall readiness rating of 82/100 for an Entry-level Backend/ML role."
    ]
  },
  interviewQuestions: [
    {
      id: "q1",
      category: "Technical",
      question: "How did you optimize FAISS vector index retrieval in SemanticSearch-AI to achieve a 78ms response latency?",
      difficulty: "Hard",
      intent: "Tests understanding of approximate nearest neighbors (ANN), index types (Flat vs IVF-PQ), and async memory management.",
      practiceAnswer: "In SemanticSearch-AI, the initial exact L2 index was causing high latency on large embeddings. I switched to an IndexIVFFlat structure with nlist=100 Voronoi cells. During search, probing nprobe=10 cells balanced recall at 97% while dropping retrieval time from 450ms to 78ms. Additionally, I handled inference through an asynchronous FastAPI threadpool to prevent blocking the event loop.",
      keyPointsToCover: ["IVF partitioning vs Flat index", "nprobe recall vs speed trade-off", "Async non-blocking execution"]
    },
    {
      id: "q2",
      category: "Project-based",
      question: "In your ChurnGuard project, why did you choose XGBoost over a standard Logistic Regression, and how did you interpret SHAP values for business users?",
      difficulty: "Medium",
      intent: "Validates practical modeling judgment, handling non-linear interactions, and explaining AI outputs to non-technical stakeholders.",
      practiceAnswer: "Customer churn data features complex non-linear interactions (e.g. tenure combined with monthly spend drops) that linear models fail to capture without extensive manual feature cross-products. XGBoost handled missing indicators and non-linear boundaries natively, giving an 89% AUC-ROC compared to 72% for Logistic Regression. For business users, I plotted SHAP summary waterfall charts showing which exact features (e.g., support ticket frequency) pushed individual customer churn risk past the intervention threshold.",
      keyPointsToCover: ["Non-linear interaction handling", "AUC-ROC comparison", "Translating SHAP into business retention actions"]
    },
    {
      id: "q3",
      category: "Role-specific",
      question: "The JD requires Redis caching and background worker tasks. How would you design a rate limiter and asynchronous batch processor for our API?",
      difficulty: "Hard",
      intent: "Assesses architecture skills for JD's missing skills (Redis, Celery, distributed queues).",
      practiceAnswer: "For rate limiting, I would implement a token bucket algorithm in Redis using Lua scripts or Redis cell to ensure atomicity across concurrent worker pods. For long-running batch inference (like processing bulk PDFs), the FastAPI endpoint would immediately generate a task UUID, enqueue the payload into a Celery task queue with a Redis broker, and return a 202 Accepted response. The client polls a /status/{task_id} endpoint or receives a webhook notification when processing completes.",
      keyPointsToCover: ["Atomic Redis operations (Lua scripts)", "HTTP 202 Accepted asynchronous pattern", "Celery worker decoupled from web server"]
    },
    {
      id: "q4",
      category: "Behavioral",
      question: "Tell me about a time during your CodeCraft internship when you encountered an unexpected bug or blocking dependency during a sprint.",
      difficulty: "Medium",
      intent: "Evaluates communication, debugging composure, and agile team collaboration.",
      practiceAnswer: "During a bi-weekly sprint at CodeCraft, a schema migration in PostgreSQL failed in our staging environment because of an unindexed foreign key lock on a high-volume table. Instead of rushing a hotfix, I documented the reproduction steps in Jira, communicated the block to my sprint mentor during daily standup, and used EXPLAIN ANALYZE to identify the missing index. We applied a concurrent index creation script, unblocking 3 dependent team members within 3 hours.",
      keyPointsToCover: ["Clear communication in daily standup", "Root cause analysis with EXPLAIN ANALYZE", "Zero-downtime concurrent indexing"]
    }
  ],
  learningRoadmap: [
    {
      week: 1,
      theme: "Redis Caching & Latency Optimization",
      skillsCovered: ["Redis data structures", "FastAPI Redis middleware", "Cache invalidation strategies"],
      beginnerResource: {
        title: "Redis University: RU101 Introduction to Redis Data Structures",
        type: "Free Course",
        url: "https://university.redis.com"
      },
      practiceProject: {
        name: "FastAPI Cache Layer for Vector Queries",
        description: "Add a 5-minute TTL Redis caching layer to the SemanticSearch-AI endpoint to cache identical query embeddings.",
        deliverable: "Working Docker Compose file with Redis + FastAPI and benchmark showing sub-10ms response on cached queries."
      },
      expectedOutcome: "Closes the critical Redis gap flagged by the target Job Description with tangible code."
    },
    {
      week: 2,
      theme: "Asynchronous Background Processing with Celery",
      skillsCovered: ["Celery task queues", "RabbitMQ / Redis as message broker", "Task status polling"],
      beginnerResource: {
        title: "FastAPI Official Guide: Background Tasks & Celery Workers",
        type: "Documentation"
      },
      practiceProject: {
        name: "Async Receipt OCR Worker",
        description: "Decouple the Invoice OCR Parser into a Celery worker that processes uploaded PDFs in the background without blocking HTTP threads.",
        deliverable: "API returning 202 Accepted with polling endpoint for OCR text results."
      },
      expectedOutcome: "Demonstrates production architecture for compute-heavy ML pipelines."
    },
    {
      week: 3,
      theme: "Relational Query Tuning & Database Indexing",
      skillsCovered: ["PostgreSQL EXPLAIN ANALYZE", "B-Tree vs GIN indexes", "SQLAlchemy async sessions"],
      beginnerResource: {
        title: "Use The Index, Luke! A Guide to Database Performance for Developers",
        type: "Free Course"
      },
      practiceProject: {
        name: "Customer Analytics Query Optimizer",
        description: "Benchmark 5 complex multi-table JOINs and aggregation queries over 200,000 synthetic customer records with optimized indexing.",
        deliverable: "Markdown report comparing execution times before and after index tuning."
      },
      expectedOutcome: "Solidifies PostgreSQL capabilities from 'Partial' to 'Strong'."
    },
    {
      week: 4,
      theme: "Docker Containerization & GitHub Actions CI/CD",
      skillsCovered: ["Multi-stage Dockerfiles", "GitHub Actions test runner", "Docker hub automated push"],
      beginnerResource: {
        title: "Docker Curriculum: A Hands-on Guide for Beginners",
        type: "Hands-on Lab"
      },
      practiceProject: {
        name: "Automated CI/CD Pipeline for Microservice",
        description: "Create a GitHub Actions workflow that runs pytest, validates flake8/black formatting, and builds a lightweight Alpine Docker image.",
        deliverable: "Passing CI badge on your GitHub repository."
      },
      expectedOutcome: "Provides verifiable public proof of DevOps and CI/CD capabilities on GitHub."
    }
  ],
  healthBreakdown: [
    { category: "ATS", score: 87, weight: 15, status: "excellent", quickFix: "Remove DOB and marital status to reach 95%." },
    { category: "Role Fit", score: 82, weight: 25, status: "good", quickFix: "Add Redis and Celery skills to match backend JD." },
    { category: "Impact", score: 78, weight: 20, status: "good", quickFix: "Add metrics to the 4 unquantified bullets." },
    { category: "Keywords", score: 76, weight: 15, status: "good", quickFix: "Incorporate Celery, CI/CD, and Redis in projects." },
    { category: "Readability", score: 91, weight: 10, status: "excellent", quickFix: "Clean typography and hierarchy." },
    { category: "Consistency", score: 84, weight: 15, status: "good", quickFix: "Pin public repositories matching resume claims on GitHub." }
  ],
  badges: [
    { id: "b1", title: "ATS Optimized", description: "Single-column format with standard semantic section headers", unlocked: true, icon: "CheckCircle" },
    { id: "b2", title: "Latency Buster", description: "Quantified performance improvement in milliseconds", unlocked: true, icon: "Zap" },
    { id: "b3", title: "Target Role Aligned", description: "Over 80% role fit match with target career direction", unlocked: true, icon: "Crosshair" },
    { id: "b4", title: "Verified Public Code", description: "Consistent evidence found in public GitHub repositories", unlocked: true, icon: "Github" },
    { id: "b5", title: "Full Impact Master", description: "All bullets follow Action Verb + Metric + Result formula", unlocked: false, icon: "Award" }
  ],
  improvementSuggestions: [
    {
      category: "Bullet Impact",
      action: "Transform weak 'Worked on' bullet to quantified achievement",
      beforeExample: "Worked on a machine learning project for customer churn prediction.",
      afterExample: "Engineered an end-to-end customer churn prediction pipeline using Python and Scikit-learn, identifying high-risk churn patterns across 150k+ records with 89% precision.",
      expectedScoreGain: 5
    },
    {
      category: "Seniority Tone",
      action: "Tone down disproportionate executive phrasing to avoid skepticism",
      beforeExample: "Architected enterprise-scale AI infrastructure for multi-modal semantic document querying.",
      afterExample: "Engineered a high-throughput semantic search service using FAISS and HuggingFace, reducing query latency from 450ms to 78ms.",
      expectedScoreGain: 3
    },
    {
      category: "Fairness & Compliance",
      action: "Remove demographic details that risk unconscious bias",
      beforeExample: "Date of Birth: 14/08/2003 | Marital Status: Single",
      afterExample: "Bengaluru, India | +91 98765 43210 | arjun.sharma.dev@gmail.com | github.com/arjunsharma-dev",
      expectedScoreGain: 4
    },
    {
      category: "Keyword Alignment",
      action: "Add Redis caching context to vector search project",
      beforeExample: "Built asynchronous FastAPI backend serving over 1,200 requests per minute.",
      afterExample: "Built asynchronous FastAPI backend with Redis query caching, serving over 1,200 requests per minute under peak load.",
      expectedScoreGain: 4
    }
  ]
};
