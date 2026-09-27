import React from 'react';
import { JDDifKeyword } from '../types';

interface JdDiffTabProps {
  jdDiff: {
    matchPercentage: number;
    presentCount: number;
    totalKeywords: number;
    keywords: JDDifKeyword[];
  };
  jobDescription?: string;
}

export const JdDiffTab: React.FC<JdDiffTabProps> = ({ jdDiff }) => {
  const presentKeywords = jdDiff.keywords.filter((k) => k.status === 'present');
  const relatedKeywords = jdDiff.keywords.filter((k) => k.status === 'related');
  const missingKeywords = jdDiff.keywords.filter((k) => k.status === 'missing');

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Semantic Vocabulary Alignment
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Job Description Keyword Diff
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Keyword diff audit comparing target posting expectations against candidate resume text without artificial keyword stuffing.
        </p>
      </div>

      {/* Coverage Summary Row */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#E4DDD2]">
          <div>
            <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-1">
              Core Keyword Match Coverage
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-3xl font-semibold text-[#2A211B]">
                {jdDiff.presentCount} / {jdDiff.totalKeywords}
              </span>
              <span className="text-xs text-[#5A4E44] font-medium">
                ({jdDiff.matchPercentage}% match index)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#5A4E44]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5E7052]" />
              {presentKeywords.length} Present
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A66B38]" />
              {relatedKeywords.length} Partial
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A44C40]" />
              {missingKeywords.length} Missing
            </span>
          </div>
        </div>

        {/* Anti-Stuffing Advisory */}
        <div className="pt-4 text-xs text-[#5A4E44] leading-relaxed">
          <strong className="text-[#2A211B] font-medium">Authenticity principle:</strong> Never copy-paste keywords merely to beat filters. Only include technologies and competencies you can confidently discuss and substantiate in technical interviews.
        </div>
      </div>

      {/* Clean Developer Diff Tool Layout */}
      <div className="border border-[#E4DDD2] rounded-md overflow-hidden bg-[#FFFDF9] shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F4F0E6] text-[#5A4E44] border-b border-[#E4DDD2]">
            <tr>
              <th className="py-3 px-4 font-semibold text-[#2A211B]">Target Keyword</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Occurrences (JD / Resume)</th>
              <th className="py-3 px-4 font-medium">Context & Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4DDD2]">
            {jdDiff.keywords.map((k, idx) => {
              const isPresent = k.status === 'present';
              const isRelated = k.status === 'related';

              return (
                <tr key={idx} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#2A211B] whitespace-nowrap">
                    {k.keyword}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded ${
                        isPresent
                          ? 'text-[#5E7052] bg-[#F2F5F0] border border-[#D5DDD2]'
                          : isRelated
                          ? 'text-[#A66B38] bg-[#FAF5EE] border border-[#EADBCE]'
                          : 'text-[#A44C40] bg-[#FAF3F2] border border-[#EAD0CC]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPresent
                            ? 'bg-[#5E7052]'
                            : isRelated
                            ? 'bg-[#A66B38]'
                            : 'bg-[#A44C40]'
                        }`}
                      />
                      {isPresent ? 'Present' : isRelated ? 'Partial' : 'Missing'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#8C7D6F] font-mono text-[11px] whitespace-nowrap">
                    {k.jdCount}x JD / {k.resumeCount}x Resume
                  </td>
                  <td className="py-3.5 px-4 text-[#5A4E44] max-w-sm leading-relaxed">
                    {k.suggestedAction || k.contextSnippet}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
