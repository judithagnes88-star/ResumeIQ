import React, { useState } from 'react';
import { FullAnalysisData } from '../types';
import { jsPDF } from 'jspdf';

interface PythonStreamlitCodeTabProps {
  data: FullAnalysisData;
}

export const PythonStreamlitCodeTab: React.FC<PythonStreamlitCodeTabProps> = ({ data }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('ResumeIQ — Career Intelligence Report', 14, 20);

    doc.setFontSize(10);
    doc.text(`Candidate: ${data.resumeName}`, 14, 30);
    doc.text(`Target Role: ${data.targetRole} (${data.experienceLevel})`, 14, 36);
    doc.text(`Resume Health Score: ${data.overallHealthScore} / 100`, 14, 42);

    doc.setFontSize(12);
    doc.text('Performance Summary:', 14, 52);
    doc.setFontSize(9);
    doc.text(`- Role Fit: ${data.scores.roleFit}%`, 16, 60);
    doc.text(`- ATS Readiness: ${data.scores.atsCompatibility}%`, 16, 66);
    doc.text(`- Skill Coverage: ${data.scores.skillCoverage}%`, 16, 72);
    doc.text(`- Impact Density: ${data.scores.achievementStrength}%`, 16, 78);

    doc.setFontSize(12);
    doc.text('Demonstrated Strengths:', 14, 90);
    doc.setFontSize(9);
    data.summary.topStrengths.forEach((s, idx) => {
      doc.text(`• ${s.slice(0, 90)}`, 16, 98 + idx * 6);
    });

    doc.setFontSize(12);
    doc.text('Priority Action Items:', 14, 130);
    doc.setFontSize(9);
    data.summary.mainImprovementAreas.forEach((a, idx) => {
      doc.text(`• ${a.slice(0, 90)}`, 16, 138 + idx * 6);
    });

    doc.save(`${data.resumeName.replace(/\.[^/.]+$/, '')}_ResumeIQ_Report.pdf`);
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${data.resumeName}_analysis.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportMarkdown = () => {
    const md = `# ResumeIQ Analysis: ${data.resumeName}
**Target Role:** ${data.targetRole} (${data.experienceLevel})
**Health Score:** ${data.overallHealthScore}/100

## Score Breakdown
- Role Fit: ${data.scores.roleFit}%
- ATS Readiness: ${data.scores.atsCompatibility}%
- Skill Coverage: ${data.scores.skillCoverage}%
- Impact Density: ${data.scores.achievementStrength}%

## Observed Strengths
${data.summary.topStrengths.map((s) => `- ${s}`).join('\n')}

## Recommended Actions
${data.summary.mainImprovementAreas.map((a) => `- ${a}`).join('\n')}
`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.resumeName}_report.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const pythonSnippet = `# ResumeIQ Streamlit Application Runner
import streamlit as st
from services.resume_parser import parse_resume_bytes
from services.gemini_service import analyze_resume_career_intelligence

st.set_page_config(page_title="ResumeIQ", layout="wide")
st.title("Resume Intelligence")

uploaded_file = st.file_uploader("Upload Resume", type=["pdf", "docx", "txt"])
if uploaded_file:
    parsed = parse_resume_bytes(uploaded_file.read(), uploaded_file.name)
    st.write(f"Parsed {parsed['wordCount']} words from {parsed['fileName']}")
`;

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Archival & Codebase Integration
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Export Dossier & Python Codebase
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Download structured reports or run the Python Streamlit architecture in your local developer environment.
        </p>
      </div>

      {/* Export Options */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 space-y-4 shadow-2xs">
        <div>
          <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-1">
            Export Archival Report
          </div>
          <p className="text-xs text-[#5A4E44]">
            Generate an archival document of the current multi-pass evaluation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            onClick={exportPDF}
            className="px-4 py-2 bg-[#2A211B] hover:bg-[#3D3027] text-[#FAF7F2] rounded-md text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            Download PDF Report
          </button>
          <button
            onClick={exportJSON}
            className="px-4 py-2 bg-[#FFFDF9] hover:bg-[#F3EFE6] border border-[#DDD5C7] text-[#2A211B] rounded-md text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Export JSON
          </button>
          <button
            onClick={exportMarkdown}
            className="px-4 py-2 bg-[#FFFDF9] hover:bg-[#F3EFE6] border border-[#DDD5C7] text-[#2A211B] rounded-md text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Export Markdown
          </button>
        </div>
      </div>

      {/* VS Code & Local Run Instructions */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3.5 border-b border-[#E4DDD2]">
          <div>
            <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-0.5">
              VS Code Local Execution Guide
            </div>
            <h2 className="font-serif text-xl font-medium text-[#2A211B]">
              Running the Application in VS Code
            </h2>
          </div>
          <div className="text-xs text-[#5A4E44] font-mono">
            Default Port: <code className="bg-[#EFEAE0] border border-[#DDD5C7] px-2 py-0.5 rounded text-[#2A211B]">localhost:3000</code>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#FAF7F2] border border-[#E4DDD2] rounded-md space-y-2">
            <div className="font-semibold text-[#2A211B]">Method 1: Full-Stack React App (Recommended)</div>
            <p className="text-[#5A4E44] leading-relaxed">
              To launch the full web interface with the quiet editorial design, document parser, and all 13 interactive workspaces:
            </p>
            <pre className="p-2.5 bg-[#FFFDF9] border border-[#DDD5C7] rounded font-mono text-[11px] text-[#2A211B]">
npm install
npm run dev
            </pre>
            <span className="text-[#8C7D6F] text-[11px] block">Opens at http://localhost:3000</span>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#E4DDD2] rounded-md space-y-2">
            <div className="font-semibold text-[#2A211B]">Method 2: Python Streamlit App</div>
            <p className="text-[#5A4E44] leading-relaxed">
              If you run with Python in VS Code, execute the updated Streamlit app containing all analytical workspaces:
            </p>
            <pre className="p-2.5 bg-[#FFFDF9] border border-[#DDD5C7] rounded font-mono text-[11px] text-[#2A211B]">
pip install -r requirements.txt
streamlit run app.py
            </pre>
            <span className="text-[#8C7D6F] text-[11px] block">Opens at http://localhost:8501</span>
          </div>
        </div>
      </div>
    </div>
  );
};
