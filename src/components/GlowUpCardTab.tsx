import React, { useState } from 'react';
import { FullAnalysisData } from '../types';

interface GlowUpCardTabProps {
  data: FullAnalysisData;
}

export const GlowUpCardTab: React.FC<GlowUpCardTabProps> = ({ data }) => {
  const [currentScore, setCurrentScore] = useState<number>(data.overallHealthScore);
  const [appliedFixes, setAppliedFixes] = useState<number[]>([0, 1]);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleFix = (index: number) => {
    if (appliedFixes.includes(index)) {
      setAppliedFixes(appliedFixes.filter((i) => i !== index));
      setCurrentScore((prev) => Math.max(data.beforeHealthScore, prev - data.improvementSuggestions[index].expectedScoreGain));
    } else {
      setAppliedFixes([...appliedFixes, index]);
      setCurrentScore((prev) => Math.min(100, prev + data.improvementSuggestions[index].expectedScoreGain));
    }
  };

  const copyCardText = () => {
    const text = `ResumeIQ Analysis: Health score improved from ${data.beforeHealthScore} to ${currentScore}/100. Role fit for ${data.targetRole}: ${data.scores.roleFit}%. Verified through multi-pass career intelligence.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Health Modeling & Projection
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Resume Health Scorecard
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Dynamic scoring simulator showing projected health score growth as specific editorial and technical fixes are implemented.
        </p>
      </div>

      {/* Score Simulator Strip */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#E4DDD2]">
          <div>
            <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-1.5">
              Projected Health Score
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-base text-[#8C7D6F] line-through font-mono">
                {data.beforeHealthScore}
              </span>
              <span className="text-[#8C7D6F]">→</span>
              <span className="font-serif text-5xl font-semibold text-[#2A211B]">
                {currentScore}
              </span>
              <span className="text-sm text-[#8C7D6F]">/ 100</span>
              <span className="text-xs text-[#5E7052] font-medium ml-2 bg-[#F2F5F0] border border-[#D5DDD2] px-2 py-0.5 rounded">
                +{currentScore - data.beforeHealthScore} points gained
              </span>
            </div>
          </div>
          <div className="text-xs text-[#5A4E44]">
            Status: <span className="text-[#2A211B] font-medium">{appliedFixes.length} of {data.improvementSuggestions.length} fixes active</span>
          </div>
        </div>

        {/* Health Breakdown Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-6 text-xs">
          {data.healthBreakdown.map((item, i) => (
            <div key={i}>
              <div className="text-[#8C7D6F] text-[11px] mb-1 font-mono uppercase">{item.category}</div>
              <div className="font-serif text-xl font-semibold text-[#2A211B]">{item.score}%</div>
              <div className="text-[11px] text-[#5A4E44] mt-0.5 truncate">{item.quickFix}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Improvement Checklist */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#8C7D6F] mb-3">
          Remediation Fixes (Click to Toggle Projection)
        </div>

        <div className="space-y-3">
          {data.improvementSuggestions.map((item, idx) => {
            const isApplied = appliedFixes.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => toggleFix(idx)}
                className={`p-4 rounded-md border transition-colors cursor-pointer text-xs ${
                  isApplied
                    ? 'border-[#2A211B] bg-[#FFFDF9] shadow-xs'
                    : 'border-[#E4DDD2] bg-[#FFFDF9]/60 hover:border-[#CFC4B4]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isApplied}
                      onChange={() => {}}
                      className="mt-0.5 accent-[#2A211B]"
                    />
                    <div>
                      <div className="font-medium text-[#2A211B]">{item.action}</div>
                      <p className="text-[#5A4E44] mt-0.5 leading-relaxed text-[11px]">
                        Change "{item.beforeExample}" → "{item.afterExample}"
                      </p>
                    </div>
                  </div>
                  <span className="text-[#5E7052] font-mono font-semibold whitespace-nowrap bg-[#F2F5F0] border border-[#D5DDD2] px-2 py-0.5 rounded text-[11px]">
                    +{item.expectedScoreGain} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shareable Dossier Card */}
      <div className="bg-[#FAF7F2] border border-[#E4DDD2] rounded-md p-6 space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F]">
            Shareable Summary Dossier
          </div>
          <button
            onClick={copyCardText}
            className="text-xs text-[#2A211B] hover:text-[#A66B38] underline underline-offset-4 cursor-pointer font-medium transition-colors"
          >
            {copied ? '✓ Copied to clipboard' : 'Copy Summary Text'}
          </button>
        </div>
        <p className="text-xs text-[#5A4E44] font-mono bg-[#FFFDF9] p-4 rounded border border-[#E4DDD2] leading-relaxed">
          ResumeIQ Analysis: Health score improved from {data.beforeHealthScore} to {currentScore}/100. Role fit for {data.targetRole}: {data.scores.roleFit}%. Verified through multi-pass career intelligence.
        </p>
      </div>
    </div>
  );
};
