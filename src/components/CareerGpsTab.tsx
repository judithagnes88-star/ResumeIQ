import React from 'react';
import { CareerGPSStep } from '../types';

interface CareerGpsTabProps {
  careerGPS: {
    currentProfile: string;
    trajectory: CareerGPSStep[];
  };
}

export const CareerGpsTab: React.FC<CareerGpsTabProps> = ({ careerGPS }) => {
  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Predictive Career Trajectory
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Career GPS Navigation
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Plausible engineering progression sequence mapped from verified academic, internship, and project competencies.
        </p>
      </div>

      {/* Baseline Strip */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs shadow-2xs">
        <div>
          <span className="text-[#8C7D6F] font-mono uppercase tracking-wider text-[10px] block mb-0.5">Current Baseline Profile</span>
          <span className="font-serif text-lg font-medium text-[#2A211B] block">{careerGPS.currentProfile}</span>
        </div>
        <div className="text-[#8C7D6F] font-mono text-[11px]">
          Trajectory Projection Engine
        </div>
      </div>

      {/* Vertical Career Path */}
      <div className="relative pl-7 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[1px] before:bg-[#DDD5C7]">
        {careerGPS.trajectory.map((step, idx) => (
          <div key={idx} className="relative">
            {/* Timeline Node */}
            <div className="absolute -left-[24px] top-1.5 w-4 h-4 rounded-full bg-[#FFFDF9] border-2 border-[#2A211B] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A66B38]" />
            </div>

            {/* Step Content */}
            <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3.5 border-b border-[#E4DDD2]">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#2A211B]">{step.title}</h3>
                  <div className="text-xs text-[#8C7D6F] mt-1 font-mono">
                    {step.timeframe} · Plausibility: <span className="text-[#2A211B] font-semibold">{step.plausibility}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#8C7D6F]">
                  Stage 0{idx + 1}
                </div>
              </div>

              {/* Rationale */}
              <div className="text-xs text-[#5A4E44] leading-relaxed">
                <strong className="text-[#2A211B] font-medium">Trajectory rationale:</strong> {step.rationale}
              </div>

              {/* 4 Metadata Blocks: Skills Needed, Current Gaps, Suggested Project, Suggested Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-1">
                <div>
                  <span className="text-[#8C7D6F] font-mono text-[10px] uppercase tracking-wider block mb-1.5">
                    Skills Needed
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {step.requiredSkills.map((sk, i) => (
                      <span key={i} className="text-[#2A211B] bg-[#EFEAE0] border border-[#DDD5C7] px-2 py-0.5 rounded text-[11px] font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[#8C7D6F] font-mono text-[10px] uppercase tracking-wider block mb-1.5">
                    Current Prerequisites
                  </span>
                  <ul className="space-y-1 text-[#5A4E44]">
                    {step.currentGaps.map((g, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A66B38]" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[#8C7D6F] font-mono text-[10px] uppercase tracking-wider block mb-1.5">
                    Suggested Next Project
                  </span>
                  <p className="text-[#5A4E44] leading-relaxed">
                    {step.suggestedProject}
                  </p>
                </div>

                <div>
                  <span className="text-[#8C7D6F] font-mono text-[10px] uppercase tracking-wider block mb-1.5">
                    Recommended Milestone
                  </span>
                  <p className="text-[#5A4E44] leading-relaxed">
                    {step.suggestedExperience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
