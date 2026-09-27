import React, { useState } from 'react';
import { SkillGapItem, LearningWeek } from '../types';

interface SkillGapTabProps {
  skillGaps: SkillGapItem[];
  roadmap: LearningWeek[];
  targetRole: string;
}

export const SkillGapTab: React.FC<SkillGapTabProps> = ({ skillGaps, roadmap, targetRole }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Languages', 'Frameworks', 'Databases', 'Cloud & DevOps'];

  const filteredSkills = skillGaps.filter((s) => {
    return filterCategory === 'all' || s.category === filterCategory;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Competency Matrix & Remediation
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Skill Gap Analysis
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Comprehensive comparison between verified competencies in your resume and market expectations for {targetRole}.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-1.5 text-xs border-b border-[#E4DDD2] pb-3">
        <span className="text-[#8C7D6F] font-mono mr-2 text-[11px]">CATEGORY:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#2A211B] text-[#FAF7F2] font-medium shadow-2xs'
                : 'text-[#5A4E44] hover:text-[#2A211B] hover:bg-[#EFEAE0]'
            }`}
          >
            {cat === 'all' ? 'All Skills' : cat}
          </button>
        ))}
      </div>

      {/* Clean Table: Header #F4F0E6, Body #FFFDF9, Border #E4DDD2 */}
      <div className="border border-[#E4DDD2] rounded-md overflow-hidden bg-[#FFFDF9] shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F4F0E6] text-[#5A4E44] border-b border-[#E4DDD2]">
            <tr>
              <th className="py-3 px-4 font-semibold text-[#2A211B]">Skill</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Observed Evidence</th>
              <th className="py-3 px-4 font-medium">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4DDD2]">
            {filteredSkills.map((item, idx) => {
              const isStrong = item.status === 'Strong';
              const isPartial = item.status === 'Partial';

              return (
                <tr key={idx} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#2A211B] whitespace-nowrap">
                    {item.skill}
                  </td>
                  <td className="py-3.5 px-4 text-[#8C7D6F] whitespace-nowrap font-mono text-[11px]">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded ${
                        isStrong
                          ? 'text-[#5E7052] bg-[#F2F5F0] border border-[#D5DDD2]'
                          : isPartial
                          ? 'text-[#A66B38] bg-[#FAF5EE] border border-[#EADBCE]'
                          : 'text-[#A44C40] bg-[#FAF3F2] border border-[#EAD0CC]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isStrong
                            ? 'bg-[#5E7052]'
                            : isPartial
                            ? 'bg-[#A66B38]'
                            : 'bg-[#A44C40]'
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5A4E44] max-w-xs leading-relaxed">
                    {item.currentEvidence}
                  </td>
                  <td className="py-3.5 px-4 text-[#2A211B] max-w-xs leading-relaxed">
                    {item.recommendedLearning}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Learning Path - Editorial Timeline */}
      <div className="border-t border-[#E4DDD2] pt-10">
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Remediation Curriculum
        </div>
        <h2 className="font-serif text-2xl font-medium text-[#2A211B] tracking-tight mb-2">
          4-Week Accelerated Learning Path
        </h2>
        <p className="text-xs text-[#5A4E44] max-w-2xl leading-relaxed mb-8">
          A structured roadmap targeting missing competencies with direct project deliverables and verified documentation links.
        </p>

        <div className="space-y-8">
          {roadmap.map((week) => (
            <div
              key={week.week}
              className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-8 border-b border-[#E4DDD2] last:border-b-0"
            >
              {/* Week Number & Theme */}
              <div className="md:col-span-4">
                <div className="font-mono text-xs text-[#A66B38] font-semibold mb-1">
                  WEEK 0{week.week}
                </div>
                <div className="font-serif font-medium text-lg text-[#2A211B] leading-snug">
                  {week.theme}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {week.skillsCovered.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-[#5A4E44] bg-[#EFEAE0] border border-[#DDD5C7] px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resource & Practice Project */}
              <div className="md:col-span-8 space-y-3 text-xs">
                <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 shadow-2xs">
                  <span className="text-[#8C7D6F] text-[11px] font-mono uppercase block mb-1">Authoritative Documentation</span>
                  <div className="font-medium text-[#2A211B]">{week.beginnerResource.title}</div>
                  {week.beginnerResource.url && (
                    <a
                      href={week.beginnerResource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A66B38] hover:text-[#2A211B] underline underline-offset-4 text-[11px] mt-1.5 inline-block font-medium transition-colors"
                    >
                      Open curriculum link ↗
                    </a>
                  )}
                </div>

                <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 shadow-2xs">
                  <span className="text-[#8C7D6F] text-[11px] font-mono uppercase block mb-1">Project Milestone Deliverable</span>
                  <div className="font-medium text-[#2A211B]">{week.practiceProject.name}</div>
                  <p className="text-[#5A4E44] text-[11px] mt-1.5 leading-relaxed">
                    {week.practiceProject.description}
                  </p>
                </div>

                <div className="text-[11px] text-[#5A4E44] pt-1">
                  <strong className="text-[#2A211B] font-medium">Outcome Goal:</strong> {week.expectedOutcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
