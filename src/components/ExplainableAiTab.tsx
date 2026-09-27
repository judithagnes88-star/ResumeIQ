import React from 'react';
import { ExplainableFactor, BiasItem } from '../types';

interface ExplainableAiTabProps {
  explainableAI: {
    baseScore: number;
    finalScore: number;
    factors: ExplainableFactor[];
    heuristicDisclaimer: string;
  };
  biasChecks: BiasItem[];
}

export const ExplainableAiTab: React.FC<ExplainableAiTabProps> = ({
  explainableAI,
  biasChecks,
}) => {
  const positiveFactors = explainableAI.factors.filter((f) => f.contribution > 0);
  const negativeFactors = explainableAI.factors.filter((f) => f.contribution < 0);

  return (
    <div className="space-y-12">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Algorithmic Attribution & Governance
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Explainable Score Breakdown & Bias Audit
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Heuristic contribution decomposition demonstrating the positive and negative weights influencing candidate assessment, accompanied by demographic neutrality verification.
        </p>
      </div>

      {/* Attribution Score Summary */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#E4DDD2]">
          <div>
            <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-1">
              Net Heuristic Score
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-3xl font-semibold text-[#2A211B]">
                {explainableAI.finalScore}
              </span>
              <span className="text-xs text-[#8C7D6F] font-mono">
                / 100 (Base: {explainableAI.baseScore})
              </span>
            </div>
          </div>
          <div className="text-xs text-[#5A4E44]">
            Attribution model: <span className="text-[#2A211B] font-medium">Decomposed feature weights</span>
          </div>
        </div>

        <div className="pt-3 text-xs text-[#8C7D6F] font-mono">
          {explainableAI.heuristicDisclaimer}
        </div>
      </div>

      {/* 2-Column Strengths vs Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Strengths */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-3">
            Positive Weight Contributors
          </div>
          <div className="space-y-3">
            {positiveFactors.map((factor, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between font-medium text-[#2A211B] mb-1">
                  <span>{factor.factor}</span>
                  <span className="font-mono text-[#5E7052] font-semibold bg-[#F2F5F0] border border-[#D5DDD2] px-1.5 py-0.2 rounded text-[11px]">+{factor.contribution} pts</span>
                </div>
                <p className="text-[#5A4E44] text-[11px] leading-relaxed">
                  {factor.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-3">
            Deductions & Identified Gaps
          </div>
          <div className="space-y-3">
            {negativeFactors.map((factor, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between font-medium text-[#2A211B] mb-1">
                  <span>{factor.factor}</span>
                  <span className="font-mono text-[#A44C40] font-semibold bg-[#FAF3F2] border border-[#EAD0CC] px-1.5 py-0.2 rounded text-[11px]">{factor.contribution} pts</span>
                </div>
                <p className="text-[#5A4E44] text-[11px] leading-relaxed">
                  {factor.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bias Checks Section */}
      <div className="border-t border-[#E4DDD2] pt-8">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-1.5">
          Neutrality & Fair-Opportunity Verification
        </div>
        <h2 className="font-serif text-xl font-medium text-[#2A211B] mb-4">
          Demographic Bias Verification Report
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {biasChecks.map((item, i) => (
            <div
              key={i}
              className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2A211B]">{item.category}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                    item.riskLevel === 'Low'
                      ? 'text-[#5E7052] bg-[#F2F5F0] border border-[#D5DDD2]'
                      : 'text-[#A66B38] bg-[#FAF5EE] border border-[#EADBCE]'
                  }`}
                >
                  {item.riskLevel} Risk
                </span>
              </div>
              <p className="text-[#5A4E44] text-[11px] leading-relaxed">
                {item.recommendation || item.detectedText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
