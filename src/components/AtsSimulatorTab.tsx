import React from 'react';
import { ATSParsingResult } from '../types';
import { SAMPLE_RESUME_TEXT } from '../demoData';

interface AtsSimulatorTabProps {
  atsResult: ATSParsingResult;
  originalText?: string;
}

export const AtsSimulatorTab: React.FC<AtsSimulatorTabProps> = ({ atsResult, originalText }) => {
  const resumeRaw = originalText || SAMPLE_RESUME_TEXT;

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Parser Verification & Schema Audit
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Simulated ATS Parsing Audit
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Simulates how applicant tracking systems parse raw document buffers, contact details, section hierarchies, and candidate entities.
        </p>
      </div>

      {/* Parsing Score & Issues Header */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#E4DDD2]">
          <div>
            <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-1">
              ATS Structural Compatibility
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-3xl font-semibold text-[#2A211B]">
                {atsResult.overallQualityScore}%
              </span>
              <span className="text-xs text-[#5E7052] font-medium bg-[#F2F5F0] border border-[#D5DDD2] px-2 py-0.5 rounded">
                High structural fidelity
              </span>
            </div>
          </div>
          <div className="text-xs text-[#5A4E44]">
            Layout: <span className="text-[#2A211B] font-medium">Standard single-column text</span>
          </div>
        </div>

        {/* Restrained Issues List */}
        <div className="pt-4 space-y-2.5">
          {atsResult.parsingIssues.map((issue, idx) => (
            <div
              key={idx}
              className="text-xs flex items-baseline gap-2.5 text-[#5A4E44]"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                  issue.severity === 'warning' ? 'bg-[#A66B38]' : 'bg-[#5E7052]'
                }`}
              />
              <div>
                <span className="text-[#2A211B] font-semibold">{issue.message}:</span>{' '}
                <span>{issue.advice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Two-Column Document Analysis Layout */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Original Resume */}
          <div>
            <div className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#8C7D6F] mb-2.5 flex items-center justify-between">
              <span>Original Resume Text</span>
              <span className="text-[#8C7D6F]">Source Buffer</span>
            </div>
            <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 max-h-[500px] overflow-y-auto shadow-2xs">
              <pre className="text-xs text-[#5A4E44] font-mono whitespace-pre-wrap leading-relaxed">
                {resumeRaw}
              </pre>
            </div>
          </div>

          {/* Right: ATS Extracted Fields */}
          <div>
            <div className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#8C7D6F] mb-2.5 flex items-center justify-between">
              <span>ATS Extracted Records</span>
              <span className="text-[#5E7052]">Parsed Schema</span>
            </div>

            <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 max-h-[500px] overflow-y-auto space-y-4 text-xs shadow-2xs">
              <div className="pb-3 border-b border-[#E4DDD2]">
                <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-1">
                  Candidate Name Detected
                </div>
                <div className="font-serif text-base font-semibold text-[#2A211B]">
                  {atsResult.detectedName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#E4DDD2]">
                <div>
                  <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-0.5">
                    Email
                  </div>
                  <div className="text-[#2A211B] truncate font-mono text-[11px]">
                    {atsResult.detectedEmail}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-0.5">
                    Phone
                  </div>
                  <div className="text-[#2A211B] truncate font-mono text-[11px]">
                    {atsResult.detectedPhone}
                  </div>
                </div>
              </div>

              <div className="pb-3 border-b border-[#E4DDD2]">
                <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-1">
                  Education Extracted
                </div>
                {atsResult.detectedEducation.map((ed, i) => (
                  <div key={i} className="text-[#2A211B] leading-relaxed">
                    {ed}
                  </div>
                ))}
              </div>

              <div className="pb-3 border-b border-[#E4DDD2]">
                <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-1.5">
                  Experience Entities ({atsResult.detectedExperience.length})
                </div>
                <ul className="space-y-1.5 text-[#5A4E44]">
                  {atsResult.detectedExperience.map((exp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#8C7D6F] text-xs">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-1.5">
                  Recognized Skills ({atsResult.detectedSkills.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.detectedSkills.map((sk, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-[#2A211B] bg-[#EFEAE0] border border-[#DDD5C7] px-2 py-0.5 rounded"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical Footnote */}
      <div className="text-xs text-[#8C7D6F] border-t border-[#E4DDD2] pt-4 font-mono">
        <strong>Evaluation note:</strong> Simulated ATS parsing preview based on standard optical character and structural line recognition. Actual enterprise software (Workday, Taleo, iCIMS) parses text stream sequences into relational database rows.
      </div>
    </div>
  );
};
