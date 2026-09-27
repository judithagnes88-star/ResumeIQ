import streamlit as st
import json
import os
import io
from config import APP_NAME, APP_DESCRIPTION, DEFAULT_ROLES, EXPERIENCE_LEVELS
from services.resume_parser import parse_resume_bytes
from services.gemini_service import analyze_resume_career_intelligence
from utils.text_utils import detect_quantification

st.set_page_config(
    page_title="ResumeIQ — Career Intelligence",
    page_icon="📄",
    layout="wide",
    initial_sidebar_state="expanded"
)

# High-fidelity Quiet Luxury Editorial Styling for Streamlit
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #2A211B;
        background-color: #F9F7F2;
    }
    
    .stApp {
        background-color: #F9F7F2;
    }
    
    /* Header Typography */
    .editorial-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #8C7D6F;
        margin-bottom: 4px;
    }
    
    .editorial-title {
        font-family: 'Lora', Georgia, serif;
        font-size: 32px;
        font-weight: 500;
        color: #2A211B;
        letter-spacing: -0.02em;
        margin-bottom: 6px;
    }
    
    .editorial-subtitle {
        font-size: 13.5px;
        color: #5A4E44;
        line-height: 1.6;
        margin-bottom: 24px;
        max-width: 800px;
    }
    
    /* Buttons */
    .stButton>button {
        background-color: #2A211B;
        color: #FAF7F2;
        border: 1px solid #2A211B;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        padding: 6px 16px;
        transition: all 0.15s ease;
    }
    .stButton>button:hover {
        background-color: #3D3027;
        border-color: #3D3027;
        color: #FAF7F2;
    }
    
    /* Cards & Containers */
    .editorial-card {
        background-color: #FFFDF9;
        border: 1px solid #E4DDD2;
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 16px;
    }
    
    /* Metrics */
    div[data-testid="stMetricValue"] {
        font-family: 'Lora', Georgia, serif;
        font-size: 28px;
        font-weight: 600;
        color: #2A211B;
    }
    div[data-testid="stMetricLabel"] {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #8C7D6F;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }
    
    /* Inputs & Textareas */
    .stTextInput input, .stTextArea textarea, .stSelectbox select {
        background-color: #FFFDF9;
        border: 1px solid #DDD5C7;
        border-radius: 6px;
        color: #2A211B;
        font-size: 13px;
    }
    .stTextInput input:focus, .stTextArea textarea:focus {
        border-color: #2A211B;
        box-shadow: none;
    }
    
    /* Sidebar */
    section[data-testid="stSidebar"] {
        background-color: #FAF7F2;
        border-right: 1px solid #E4DDD2;
    }
</style>
""", unsafe_allow_html=True)

# Helper function to load demo data safely
def load_golden_data():
    json_path = os.path.join(os.path.dirname(__file__), "demo_data.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "DEMO_ANALYSIS_DATA": None,
        "SAMPLE_RESUME_TEXT": "Candidate Technical Resume",
        "SAMPLE_JOB_DESCRIPTION": "Target Job Requirements"
    }

golden_store = load_golden_data()

# Session State Initialization
if "analysis_data" not in st.session_state:
    st.session_state.analysis_data = golden_store.get("DEMO_ANALYSIS_DATA")
if "resume_text" not in st.session_state:
    st.session_state.resume_text = golden_store.get("SAMPLE_RESUME_TEXT", "")
if "job_description" not in st.session_state:
    st.session_state.job_description = golden_store.get("SAMPLE_JOB_DESCRIPTION", "")
if "resume_name" not in st.session_state:
    st.session_state.resume_name = "Arjun_Sharma_Resume.pdf"

# Sidebar
with st.sidebar:
    st.markdown('<div class="editorial-label">Intelligence Engine</div>', unsafe_allow_html=True)
    st.markdown("### ResumeIQ")
    st.caption("Analytical Career Architecture")
    
    st.markdown("---")
    st.markdown("**WORKSPACES**")
    navigation = st.radio(
        "Navigation",
        [
            "Executive Overview",
            "Multi-Role Fit Radar",
            "Skill Gap & Roadmap",
            "Bullet Impact Rewriter",
            "ATS Parsing Audit",
            "JD Keyword Diff",
            "Career GPS Trajectory",
            "Recruiter 6-Sec Scan",
            "GitHub Consistency",
            "Explainable Attribution",
            "Scorecard & Fixes",
            "Interview Preparation",
            "Archival Export"
        ],
        label_visibility="collapsed"
    )
    
    st.markdown("---")
    st.markdown("**TARGET PARAMETERS**")
    target_role = st.selectbox("Target Role", DEFAULT_ROLES, index=3) # AI/ML Engineer
    experience_level = st.selectbox("Experience Level", EXPERIENCE_LEVELS, index=1) # Entry-level
    
    st.markdown("---")
    if st.button("Reset to Golden Demo", use_container_width=True):
        st.session_state.analysis_data = golden_store.get("DEMO_ANALYSIS_DATA")
        st.session_state.resume_text = golden_store.get("SAMPLE_RESUME_TEXT", "")
        st.session_state.job_description = golden_store.get("SAMPLE_JOB_DESCRIPTION", "")
        st.session_state.resume_name = "Arjun_Sharma_Resume.pdf"
        st.rerun()

# Top Banner
col_h1, col_h2 = st.columns([3, 1])
with col_h1:
    st.markdown('<div class="editorial-label">Audited Dossier</div>', unsafe_allow_html=True)
    st.markdown(f'<div class="editorial-title">{st.session_state.resume_name}</div>', unsafe_allow_html=True)
    st.markdown(f'<div class="editorial-subtitle">Targeting <strong>{target_role}</strong> ({experience_level}) · Comprehensive multi-pass evaluation</div>', unsafe_allow_html=True)

with col_h2:
    if st.button("Upload New Resume"):
        st.session_state.show_upload = not st.session_state.get("show_upload", False)

if st.session_state.get("show_upload", False):
    with st.expander("Upload & Analyze Custom Resume", expanded=True):
        u1, u2 = st.columns(2)
        with u1:
            uploaded = st.file_uploader("Upload PDF/DOCX/TXT", type=["pdf", "docx", "txt"])
            manual_text = st.text_area("Or Paste Plain Resume Text", height=150, value=st.session_state.resume_text)
        with u2:
            manual_jd = st.text_area("Target Job Description", height=220, value=st.session_state.job_description)
            gh_url = st.text_input("GitHub Profile URL (optional)", value="github.com/arjunsharma-dev")
        
        if st.button("Run Multi-Pass Analysis", use_container_width=True):
            file_name = "Custom_Resume.txt"
            extracted_text = manual_text
            if uploaded:
                file_name = uploaded.name
                parsed_file = parse_resume_bytes(uploaded.read(), uploaded.name)
                extracted_text = parsed_file.get("text", "")
            
            with st.spinner("Executing multi-pass analysis..."):
                analysis = analyze_resume_career_intelligence(
                    resume_text=extracted_text,
                    job_description=manual_jd,
                    target_role=target_role,
                    experience_level=experience_level,
                    github_url=gh_url,
                    resume_name=file_name
                )
                st.session_state.analysis_data = analysis
                st.session_state.resume_text = extracted_text
                st.session_state.job_description = manual_jd
                st.session_state.resume_name = file_name
                st.session_state.show_upload = False
                st.rerun()

data = st.session_state.analysis_data

# Workspace Content Rendering
if navigation == "Executive Overview":
    # 4 Score KPIs
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Overall Health", f"{data['overallHealthScore']}/100", f"+{data['overallHealthScore'] - data['beforeHealthScore']} potential")
    c2.metric("Target Role Fit", f"{data['scores']['roleFit']}%", target_role)
    c3.metric("ATS Readiness", f"{data['scores']['atsCompatibility']}%", "Single-column format")
    c4.metric("Skill Coverage", f"{data['scores']['skillCoverage']}%", f"{data['jdDiff']['presentCount']} of {data['jdDiff']['totalKeywords']} terms")
    
    st.markdown("---")
    
    # Executive Overview
    st.markdown('<div class="editorial-label">Executive Brief</div>', unsafe_allow_html=True)
    st.markdown(f'<div class="editorial-card">{data["summary"]["executiveOverview"]}</div>', unsafe_allow_html=True)
    
    # 2 Column: Strengths & Improvement Areas
    col_str, col_imp = st.columns(2)
    with col_str:
        st.markdown("**Demonstrated Strengths**")
        for s in data["summary"]["topStrengths"]:
            st.markdown(f"• {s}")
    with col_imp:
        st.markdown("**Priority Remediation Areas**")
        for a in data["summary"]["mainImprovementAreas"]:
            st.markdown(f"• {a}")

elif navigation == "Multi-Role Fit Radar":
    st.markdown('<div class="editorial-label">Specialization Fit Matrix</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Multi-Role Fit Distribution</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-subtitle">Evaluates candidate suitability across adjacent engineering roles to prevent pigeonholing.</div>', unsafe_allow_html=True)
    
    for r in data["roleFits"]:
        st.write(f"**{r['role']}** ({r['score']}%) — *{r['verdict']}*")
        st.progress(r['score'] / 100)
        c_m, c_g = st.columns(2)
        with c_m:
            st.caption(f"Matching Skills: {', '.join(r['matchingSkills'][:5])}")
        with c_g:
            st.caption(f"Missing Prerequisites: {', '.join(r['missingSkills'][:4])}")
        st.markdown("---")

elif navigation == "Skill Gap & Roadmap":
    st.markdown('<div class="editorial-label">Curriculum Progression</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Skill Gap & 4-Week Action Roadmap</div>', unsafe_allow_html=True)
    st.markdown(f'<div class="editorial-subtitle">Bridging candidate competencies for {target_role}.</div>', unsafe_allow_html=True)
    
    for week in data["learningRoadmap"]["weeks"]:
        st.markdown(f"### Week {week['weekNumber']}: {week['theme']}")
        st.markdown(f"*{week['description']}* (Estimated effort: {week['estimatedHours']} hrs)")
        
        c_sk, c_pj = st.columns(2)
        with c_sk:
            st.markdown("**Target Competencies:**")
            for sk in week["skills"]:
                st.markdown(f"- **{sk['skill']}**: {sk['importance']}")
        with c_pj:
            st.markdown(f"**Milestone Project:** {week['deliverable']}")
        st.markdown("---")

elif navigation == "Bullet Impact Rewriter":
    st.markdown('<div class="editorial-label">Precision Language & Impact</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Bullet Impact Rewriter</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-subtitle">Action Verb + Task + Technology + Metric + Result formula rewrites.</div>', unsafe_allow_html=True)
    
    for bullet in data["bullets"]:
        with st.container():
            st.markdown(f"**Impact Score:** {bullet['impactScore']} / 100 · Action Verb: `{bullet['actionVerb']}` · Metric: `{'Detected' if bullet['hasMetric'] else 'Missing'}`")
            col_b1, col_b2 = st.columns(2)
            with col_b1:
                st.caption("Original Candidate Phrasing")
                st.info(f"\"{bullet['original']}\"")
            with col_b2:
                st.caption("Suggested High-Impact Rewrite")
                st.success(f"\"{bullet['improvedVersion']}\"")
            st.caption(f"Engine Commentary: {bullet['explanation']}")
            st.markdown("---")

elif navigation == "ATS Parsing Audit":
    st.markdown('<div class="editorial-label">Parser Verification & Schema Audit</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Simulated ATS Parsing Audit</div>', unsafe_allow_html=True)
    st.metric("Structural Compatibility", f"{data['atsResult']['overallQualityScore']}%", "Standard single-column")
    
    col_a1, col_a2 = st.columns(2)
    with col_a1:
        st.markdown("**Original Resume Source Buffer**")
        st.text_area("Source Text", value=st.session_state.resume_text, height=400, disabled=True)
    with col_a2:
        st.markdown("**ATS Extracted Schema Records**")
        st.json({
            "detectedName": data['atsResult']['detectedName'],
            "detectedEmail": data['atsResult']['detectedEmail'],
            "detectedPhone": data['atsResult']['detectedPhone'],
            "detectedEducation": data['atsResult']['detectedEducation'],
            "skillsFound": len(data['atsResult']['detectedSkills']),
            "experienceEntities": len(data['atsResult']['detectedExperience'])
        })

elif navigation == "JD Keyword Diff":
    st.markdown('<div class="editorial-label">Semantic Alignment</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Job Description Keyword Diff</div>', unsafe_allow_html=True)
    st.markdown(f"Coverage: **{data['jdDiff']['presentCount']} / {data['jdDiff']['totalKeywords']}** ({data['jdDiff']['matchPercentage']}% match index)")
    
    for kw in data['jdDiff']['keywords']:
        st.write(f"• **{kw['keyword']}** ({kw['status'].upper()}): {kw['jdCount']}x JD / {kw['resumeCount']}x Resume — *{kw.get('suggestedAction', kw.get('contextSnippet', ''))}*")

elif navigation == "Career GPS Trajectory":
    st.markdown('<div class="editorial-label">Predictive Progression</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Career GPS Navigation</div>', unsafe_allow_html=True)
    
    for idx, step in enumerate(data['careerGPS']['trajectory']):
        st.markdown(f"### Stage {idx + 1}: {step['title']} ({step['timeframe']})")
        st.write(f"**Rationale:** {step['rationale']}")
        st.caption(f"Required Skills: {', '.join(step['requiredSkills'])}")
        st.caption(f"Suggested Project: {step['suggestedProject']}")
        st.markdown("---")

elif navigation == "Recruiter 6-Sec Scan":
    st.markdown('<div class="editorial-label">Eye-Tracking Heuristic</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Recruiter 6-Second Scan Simulation</div>', unsafe_allow_html=True)
    st.metric("Visual Hierarchy Score", f"{data['recruiterScan']['overallVisibilityScore']}%")
    
    for z in data['recruiterScan']['zones']:
        st.markdown(f"**{z['zoneName']}** ({z['percentageAttention']}% attention, {z['fixationTimeMs']}ms)")
        st.write(f"- Observation: {z['critique']}")
        st.write(f"- Recommendation: {z['recommendation']}")
        st.markdown("---")

elif navigation == "GitHub Consistency":
    st.markdown('<div class="editorial-label">Artifact Verification</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">GitHub & Public Artifact Consistency</div>', unsafe_allow_html=True)
    gh = data.get('githubConsistency')
    if gh:
        st.write(f"Verified profile: **@{gh.get('username', 'candidate')}** ({gh.get('overallConsistencyScore', 88)}% alignment)")
        for claim in gh.get('matchedClaims', []):
            st.write(f"Claim: *\"{claim['claim']}\"* → **{claim['verdict']}** ({claim['githubEvidence']})")
    else:
        st.info("No public GitHub profile queried yet.")

elif navigation == "Explainable Attribution":
    st.markdown('<div class="editorial-label">Algorithmic Attribution</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Explainable Score Attribution & Bias Audit</div>', unsafe_allow_html=True)
    exp = data['explainableAI']
    st.metric("Final Attributed Score", f"{exp['finalScore']}/100", f"Base: {exp['baseScore']}")
    
    col_pos, col_neg = st.columns(2)
    with col_pos:
        st.markdown("**Positive Factors**")
        for f in [x for x in exp['factors'] if x['contribution'] > 0]:
            st.write(f"+{f['contribution']} pts — **{f['factor']}**: {f['evidence']}")
    with col_neg:
        st.markdown("**Deductions & Gaps**")
        for f in [x for x in exp['factors'] if x['contribution'] < 0]:
            st.write(f"{f['contribution']} pts — **{f['factor']}**: {f['evidence']}")

elif navigation == "Scorecard & Fixes":
    st.markdown('<div class="editorial-label">Remediation Simulator</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Resume Health Scorecard</div>', unsafe_allow_html=True)
    st.metric("Health Score Growth", f"{data['overallHealthScore']} / 100", f"Baseline: {data['beforeHealthScore']}")
    
    for item in data['improvementSuggestions']:
        st.markdown(f"**+{item['expectedScoreGain']} pts** — {item['action']}")
        st.caption(f"Before: \"{item['beforeExample']}\" → After: \"{item['afterExample']}\"")
        st.markdown("---")

elif navigation == "Interview Preparation":
    st.markdown('<div class="editorial-label">Technical Defense</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Technical Interview Readiness</div>', unsafe_allow_html=True)
    
    for q in data['interviewPrep']:
        with st.expander(f"{q['category']} ({q['difficulty']}): {q['question']}"):
            st.write(f"**Interviewer Intent:** {q['intent']}")
            st.write(f"**Key Points to Cover:** {', '.join(q.get('keyPointsToCover', []))}")
            st.success(f"**Practice Response:** \"{q.get('practiceAnswer', '')}\"")

elif navigation == "Archival Export":
    st.markdown('<div class="editorial-label">Archival Export</div>', unsafe_allow_html=True)
    st.markdown('<div class="editorial-title">Export Dossier & Codebase</div>', unsafe_allow_html=True)
    
    json_str = json.dumps(data, indent=2)
    st.download_button(
        label="Download Full JSON Dossier",
        data=json_str,
        file_name=f"{st.session_state.resume_name}_dossier.json",
        mime="application/json"
    )
    
    md_content = f"""# ResumeIQ Dossier: {st.session_state.resume_name}
Target Role: {target_role} ({experience_level})
Health Score: {data['overallHealthScore']} / 100

## Strengths
{chr(10).join(['- ' + s for s in data['summary']['topStrengths']])}

## Improvement Areas
{chr(10).join(['- ' + a for a in data['summary']['mainImprovementAreas']])}
"""
    st.download_button(
        label="Download Markdown Report",
        data=md_content,
        file_name=f"{st.session_state.resume_name}_report.md",
        mime="text/markdown"
    )
