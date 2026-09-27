import React, { useState } from 'react';
import { InterviewQuestion } from '../types';

interface InterviewPrepTabProps {
  questions: InterviewQuestion[];
  targetRole: string;
}

export const InterviewPrepTab: React.FC<InterviewPrepTabProps> = ({ questions, targetRole }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string>(questions[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', 'Technical', 'Project-based', 'Role-specific', 'Behavioral'];

  const filteredQuestions = questions.filter((q) => {
    if (filterCategory === 'all') return true;
    return q.category === filterCategory;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Interview Readiness & Defense
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Technical Interview Preparation
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Questions tailored to your resume projects and identified gaps for {targetRole}, with interviewer intent analysis and sample answers.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-1.5 text-xs border-b border-[#E4DDD2] pb-3">
        <span className="text-[#8C7D6F] font-mono mr-2 text-[11px]">CATEGORY:</span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCategory(c)}
            className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              filterCategory === c
                ? 'bg-[#2A211B] text-[#FAF7F2] font-medium shadow-2xs'
                : 'text-[#5A4E44] hover:text-[#2A211B] hover:bg-[#EFEAE0]'
            }`}
          >
            {c === 'all' ? 'All Questions' : c}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md overflow-hidden shadow-2xs"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? '' : q.id)}
                className="p-5 flex items-baseline justify-between gap-4 cursor-pointer select-none text-xs hover:bg-[#FAF7F2] transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#8C7D6F] font-mono text-[10px]">
                    <span className="uppercase tracking-wider font-semibold">{q.category}</span>
                    <span>·</span>
                    <span>{q.difficulty}</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#2A211B] leading-snug">
                    {q.question}
                  </h3>
                </div>

                <span className="text-xs text-[#8C7D6F] font-mono shrink-0">
                  {isExpanded ? 'Collapse ↑' : 'Inspect ↓'}
                </span>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-0 border-t border-[#E4DDD2] text-xs space-y-4 bg-[#FFFDF9]">
                  {/* Interviewer Intent */}
                  <div className="pt-3.5">
                    <span className="text-[#8C7D6F] font-mono text-[10px] uppercase tracking-wider block mb-1">
                      Interviewer Intent
                    </span>
                    <p className="text-[#5A4E44] leading-relaxed">{q.intent}</p>
                  </div>

                  {/* Core Technical Points */}
                  <div>
                    <span className="text-[#8C7D6F] font-mono text-[10px] uppercase tracking-wider block mb-1.5">
                      Key Technical Competencies to Highlight
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(q.keyPointsToCover || []).map((point, i) => (
                        <span
                          key={i}
                          className="bg-[#EFEAE0] border border-[#DDD5C7] text-[#2A211B] px-2 py-0.5 rounded text-[11px] font-mono"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sample Answer */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-[#8C7D6F] font-mono text-[10px] uppercase tracking-wider">
                        High-Impact Sample Answer
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(q.id, q.practiceAnswer);
                        }}
                        className="text-xs text-[#2A211B] hover:text-[#A66B38] underline underline-offset-4 cursor-pointer font-medium"
                      >
                        {copiedId === q.id ? '✓ Copied' : 'Copy Sample Answer'}
                      </button>
                    </div>
                    <div className="p-3.5 bg-[#FAF7F2] border border-[#E4DDD2] rounded text-[#2A211B] leading-relaxed">
                      "{q.practiceAnswer}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
