import React, { useState } from 'react';
import { RoleFitItem } from '../types';

interface RoleFitTabProps {
  roleFits: RoleFitItem[];
  defaultRole: string;
}

export const RoleFitTab: React.FC<RoleFitTabProps> = ({ roleFits }) => {
  const [selectedRoleName, setSelectedRoleName] = useState<string>(
    roleFits[0]?.role || 'Backend Developer'
  );

  const selectedRole = roleFits.find((r) => r.role === selectedRoleName) || roleFits[0];

  // Restrained Minimalist Radar Math
  const numAxes = roleFits.length;
  const radius = 95;
  const centerX = 130;
  const centerY = 120;

  const points = roleFits.map((r, i) => {
    const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
    const distance = (r.score / 100) * radius;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y, angle, ...r };
  });

  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Multi-Role Career Alignment Matrix
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Role Fit Distribution
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Rather than reducing qualifications to a single arbitrary score, this matrix maps verified technical experience across multiple specialized software engineering domains.
        </p>
      </div>

      {/* Grid: Clean Horizontal Bars + Subtle Restrained Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Horizontal Bars */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-2">
            Target Specializations
          </div>

          <div className="space-y-3">
            {roleFits.map((r) => {
              const isSelected = selectedRoleName === r.role;
              return (
                <div
                  key={r.role}
                  onClick={() => setSelectedRoleName(r.role)}
                  className={`p-4 rounded-md border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#2A211B] bg-[#FFFDF9] shadow-xs'
                      : 'border-[#E4DDD2] bg-[#FFFDF9]/60 hover:border-[#CFC4B4]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-[#2A211B]">{r.role}</span>
                    <span className="font-mono text-[#2A211B] font-semibold">{r.score}%</span>
                  </div>

                  <div className="w-full bg-[#EFEAE0] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-[#2A211B]' : 'bg-[#8C7D6F]'
                      }`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-[#8C7D6F] pt-1">
            Click any role above to inspect matching evidence and identified gaps.
          </p>
        </div>

        {/* Restrained Radar Chart */}
        <div className="lg:col-span-5 bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 flex flex-col items-center shadow-2xs">
          <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-3 w-full text-left">
            Footprint Geometry
          </div>

          <div className="relative w-full max-w-[260px] aspect-[4/3] flex items-center justify-center">
            <svg viewBox="0 0 260 240" className="w-full h-full overflow-visible">
              {/* Concentric subtle rings */}
              {[0.25, 0.5, 0.75, 1.0].map((level, idx) => (
                <circle
                  key={idx}
                  cx={centerX}
                  cy={centerY}
                  r={radius * level}
                  fill="none"
                  stroke="#E4DDD2"
                  strokeWidth="0.8"
                />
              ))}

              {/* Radial Spoke lines */}
              {points.map((p, i) => {
                const outerX = centerX + radius * Math.cos(p.angle);
                const outerY = centerY + radius * Math.sin(p.angle);
                return (
                  <line
                    key={i}
                    x1={centerX}
                    y1={centerY}
                    x2={outerX}
                    y2={outerY}
                    stroke="#E4DDD2"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Polygon */}
              <polygon
                points={polygonPath}
                fill="rgba(42, 33, 27, 0.08)"
                stroke="#2A211B"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Points & Labels */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={selectedRoleName === p.role ? '4' : '2.5'}
                    fill={selectedRoleName === p.role ? '#A66B38' : '#6A5F54'}
                  />
                  <text
                    x={centerX + (radius + 16) * Math.cos(p.angle)}
                    y={centerY + (radius + 14) * Math.sin(p.angle)}
                    textAnchor="middle"
                    className="text-[10px] fill-[#5A4E44] font-sans"
                  >
                    {p.role.split(' ')[0]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="text-[11px] text-[#8C7D6F] text-center mt-3 font-mono">
            Selected: <span className="text-[#2A211B] font-semibold">{selectedRole.role}</span> ({selectedRole.score}%)
          </div>
        </div>
      </div>

      {/* Selected Role Detailed Evidence Panel */}
      <div className="border-t border-[#E4DDD2] pt-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F]">
              Evidence Evaluation
            </div>
            <h2 className="font-serif text-xl font-medium text-[#2A211B] mt-0.5">
              {selectedRole.role} — {selectedRole.score}% Alignment
            </h2>
          </div>
          <div className="text-xs text-[#5A4E44]">
            Classification: <span className="text-[#2A211B] font-medium">{selectedRole.score >= 80 ? 'High Fit' : selectedRole.score >= 65 ? 'Moderate Fit' : 'Foundation'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Matching Skills */}
          <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 shadow-2xs">
            <div className="font-medium text-[#2A211B] mb-2.5 flex items-center justify-between">
              <span>Matching Skills</span>
              <span className="text-[#5E7052] font-mono text-[11px] bg-[#F2F5F0] border border-[#D5DDD2] px-1.5 py-0.2 rounded">{selectedRole.matchingSkills.length}</span>
            </div>
            <div className="space-y-1.5 text-[#5A4E44]">
              {(selectedRole.matchingSkills || []).map((s: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#5E7052] font-semibold text-xs">•</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 shadow-2xs">
            <div className="font-medium text-[#2A211B] mb-2.5 flex items-center justify-between">
              <span>Missing Prerequisites</span>
              <span className="text-[#A44C40] font-mono text-[11px] bg-[#FAF3F2] border border-[#EAD0CC] px-1.5 py-0.2 rounded">{(selectedRole.missingSkills || []).length}</span>
            </div>
            <div className="space-y-1.5 text-[#5A4E44]">
              {(selectedRole.missingSkills || []).map((s: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#A44C40] font-semibold text-xs">•</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Improvements */}
          <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 shadow-2xs">
            <div className="font-medium text-[#2A211B] mb-2.5">
              Targeted Portfolio Enhancements
            </div>
            <ul className="space-y-2 text-[#5A4E44]">
              {(selectedRole.recommendedImprovements || []).map((imp: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#A66B38] text-xs mt-0.5">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Experience & Projects Footnotes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5A4E44] border-t border-[#E4DDD2] pt-4">
          <div>
            <span className="font-medium text-[#2A211B] block mb-1">Directly Relevant Projects</span>
            <ul className="list-disc pl-4 space-y-1">
              {selectedRole.relevantProjects && selectedRole.relevantProjects.length > 0 ? (
                selectedRole.relevantProjects.map((p: string, i: number) => <li key={i}>{p}</li>)
              ) : (
                <li className="text-[#8C7D6F] italic">No projects explicitly tagged for this specialization</li>
              )}
            </ul>
          </div>
          <div>
            <span className="font-medium text-[#2A211B] block mb-1">Directly Relevant Experience</span>
            <ul className="list-disc pl-4 space-y-1">
              {selectedRole.relevantExperience && selectedRole.relevantExperience.length > 0 ? (
                selectedRole.relevantExperience.map((e: string, i: number) => <li key={i}>{e}</li>)
              ) : (
                <li className="text-[#8C7D6F] italic">Foundational experience detected</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
