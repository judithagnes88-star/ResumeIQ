import React from 'react';
import { FullAnalysisData } from '../types';

interface OverviewTabProps {
  data: FullAnalysisData;
  onNavigate: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data, onNavigate }) => {
  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs text-[#8C7D6F] font-mono">
          <span className="text-[#2A211B] font-medium">{data.resumeName}</span>
          <span>·</span>
          <span>Targeting {data.targetRole}</span>
          <span>·</span>
          <span>{data.experienceLevel}</span>
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Executive Career Intelligence
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Multi-pass evaluation across automated parser compatibility, technical role alignment, keyword representation, and quantified achievement density.
        </p>
      </div>

      {/* Primary Score & Horizontal Metric Row */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-lg p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#E4DDD2]">
          <div>
            <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-1.5">
              Candidate Health Index
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-5xl font-semibold text-[#2A211B] tracking-tight">
                {data.overallHealthScore}
              </span>
              <span className="text-base text-[#8C7D6F]">/ 100</span>
              <span className="text-xs text-[#5E7052] font-medium ml-2 bg-[#F2F5F0] border border-[#D5DDD2] px-2 py-0.5 rounded">
                +{data.overallHealthScore - data.beforeHealthScore} pts potential gain
              </span>
            </div>
          </div>
          <div className="text-xs text-[#5A4E44] sm:text-right">
            Status: <span className="text-[#2A211B] font-medium">Ready for recruiter review</span>
            <div className="text-[#8C7D6F] font-mono text-[11px] mt-0.5">3 independent evaluation passes verified</div>
          </div>
        </div>

        {/* Horizontal metrics strip with warm dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          <div>
            <div className="text-xs text-[#8C7D6F] mb-1">Role Fit Index</div>
            <div className="font-serif text-2xl font-semibold text-[#2A211B]">{data.scores.roleFit}%</div>
            <div className="text-[12px] text-[#5A4E44] mt-0.5">{data.targetRole}</div>
          </div>

          <div className="md:border-l md:border-[#E4DDD2] md:pl-6">
            <div className="text-xs text-[#8C7D6F] mb-1">ATS Readiness</div>
            <div className="font-serif text-2xl font-semibold text-[#2A211B]">{data.scores.atsCompatibility}%</div>
            <div className="text-[12px] text-[#5A4E44] mt-0.5">Single-column hierarchy</div>
          </div>

          <div className="border-t pt-4 sm:border-t-0 sm:pt-0 md:border-l md:border-[#E4DDD2] md:pl-6">
            <div className="text-xs text-[#8C7D6F] mb-1">Skill Coverage</div>
            <div className="font-serif text-2xl font-semibold text-[#2A211B]">{data.scores.skillCoverage}%</div>
            <div className="text-[12px] text-[#5A4E44] mt-0.5">{data.jdDiff.presentCount} of {data.jdDiff.totalKeywords} keywords</div>
          </div>

          <div className="border-t pt-4 sm:border-t-0 sm:pt-0 md:border-l md:border-[#E4DDD2] md:pl-6">
            <div className="text-xs text-[#8C7D6F] mb-1">Impact Density</div>
            <div className="font-serif text-2xl font-semibold text-[#2A211B]">{data.scores.achievementStrength}%</div>
            <div className="text-[12px] text-[#5A4E44] mt-0.5">Action & metric ratio</div>
          </div>
        </div>
      </div>

      {/* Consensus Verification Panel */}
      <div className="border-t border-b border-[#E4DDD2] py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-3.5">
          <div className="font-medium text-[#2A211B]">
            Multi-Pass Verification Consensus ({data.consensus.agreementPercentage}% agreement)
          </div>
          <div className="text-[#8C7D6F] font-mono text-[11px]">
            Variance &lt; 5 points across analytical passes
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-3.5 shadow-2xs">
            <div className="text-[#8C7D6F] text-[11px] font-medium">{data.consensus.passA.name}</div>
            <div className="font-serif text-lg font-semibold text-[#2A211B] mt-0.5">{data.consensus.passA.score}%</div>
            <div className="text-[#5A4E44] text-[11px] mt-1">{data.consensus.passA.focus}</div>
          </div>
          <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-3.5 shadow-2xs">
            <div className="text-[#8C7D6F] text-[11px] font-medium">{data.consensus.passB.name}</div>
            <div className="font-serif text-lg font-semibold text-[#2A211B] mt-0.5">{data.consensus.passB.score}%</div>
            <div className="text-[#5A4E44] text-[11px] mt-1">{data.consensus.passB.focus}</div>
          </div>
          <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-3.5 shadow-2xs">
            <div className="text-[#8C7D6F] text-[11px] font-medium">{data.consensus.passC.name}</div>
            <div className="font-serif text-lg font-semibold text-[#2A211B] mt-0.5">{data.consensus.passC.score}%</div>
            <div className="text-[#5A4E44] text-[11px] mt-1">{data.consensus.passC.focus}</div>
          </div>
        </div>
      </div>

      {/* Editorial 2-Column: Strengths & Improvement Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Strengths */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-3.5 font-medium">
            Observed Strengths
          </div>
          <ul className="space-y-3.5">
            {data.summary.topStrengths.map((str, i) => (
              <li key={i} className="text-xs text-[#2A211B] flex items-start gap-3 leading-relaxed">
                <span className="text-[#5E7052] font-semibold text-sm leading-none mt-0.5">+</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onNavigate('role-fit')}
            className="mt-4.5 text-xs font-medium text-[#2A211B] hover:text-[#A66B38] underline underline-offset-4 cursor-pointer transition-colors"
          >
            Review multi-role fit distribution →
          </button>
        </div>

        {/* Priority Improvements */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-3.5 font-medium">
            High-Leverage Enhancements
          </div>
          <ul className="space-y-3.5">
            {data.summary.mainImprovementAreas.map((area, i) => (
              <li key={i} className="text-xs text-[#2A211B] flex items-start gap-3 leading-relaxed">
                <span className="text-[#A66B38] font-semibold text-sm leading-none mt-0.5">−</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onNavigate('bullet-rewriter')}
            className="mt-4.5 text-xs font-medium text-[#2A211B] hover:text-[#A66B38] underline underline-offset-4 cursor-pointer transition-colors"
          >
            Rewrite experience bullets with metrics →
          </button>
        </div>
      </div>

      {/* Next Actions Editorial Card */}
      <div className="bg-[#FAF7F2] border border-[#E4DDD2] rounded-lg p-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-2 font-medium">
          Recommended Action Sequence
        </div>
        <div className="space-y-3 mt-3">
          {data.summary.recommendedNextActions.map((action, i) => (
            <div key={i} className="flex items-start gap-3 text-xs text-[#2A211B]">
              <span className="font-mono text-[#8C7D6F] text-[11px]">{i + 1}.</span>
              <span className="leading-relaxed">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
