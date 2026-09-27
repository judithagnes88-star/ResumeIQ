import React, { useState } from 'react';
import { RecruiterScanZone } from '../types';

interface RecruiterScanTabProps {
  recruiterScan: {
    overallVisibilityScore: number;
    zones: RecruiterScanZone[];
    scanSimulationDisclaimer: string;
  };
}

export const RecruiterScanTab: React.FC<RecruiterScanTabProps> = ({ recruiterScan }) => {
  const [activeZone, setActiveZone] = useState<number>(0);
  const selectedZone = recruiterScan.zones[activeZone] || recruiterScan.zones[0];

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Cognitive Ergonomics & Visual Eye-Tracking
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Recruiter 6-Second Scan Simulation
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Heuristic visualization of visual scan paths (F-pattern and Z-pattern) during initial recruiter triage.
        </p>
      </div>

      {/* Header Metric Strip */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#E4DDD2]">
          <div>
            <div className="text-[11px] font-mono font-medium text-[#8C7D6F] uppercase tracking-wider mb-1">
              Visual Hierarchy Score
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-3xl font-semibold text-[#2A211B]">
                {recruiterScan.overallVisibilityScore}%
              </span>
              <span className="text-xs text-[#5A4E44]">
                (~5.3s estimated initial dwell time)
              </span>
            </div>
          </div>
          <div className="text-xs text-[#8C7D6F]">
            Attention distribution: <span className="text-[#2A211B] font-medium">Upper-third weighted</span>
          </div>
        </div>

        <div className="pt-3 text-xs text-[#8C7D6F] font-mono">
          {recruiterScan.scanSimulationDisclaimer}
        </div>
      </div>

      {/* Two Column Layout: Simulated Viewport Page on Left, Diagnostic Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Document Viewport representation */}
        <div className="lg:col-span-6 bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-3 flex items-center justify-between">
            <span>Visual Page Hierarchy (Click Zone)</span>
            <span className="text-[10px]">8.5" x 11" Canvas</span>
          </div>

          <div className="space-y-3">
            {recruiterScan.zones.map((zone, idx) => {
              const isSelected = activeZone === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveZone(idx)}
                  className={`p-4 rounded-md border transition-colors cursor-pointer text-xs ${
                    isSelected
                      ? 'border-[#2A211B] bg-[#FAF7F2] shadow-xs'
                      : 'border-[#E4DDD2] bg-[#FFFDF9] hover:border-[#CFC4B4]'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium text-[#2A211B] mb-1">
                    <span>{zone.zoneName}</span>
                    <span className="text-[11px] text-[#8C7D6F] font-mono">
                      {zone.percentageAttention}% ({zone.fixationTimeMs}ms)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5A4E44] line-clamp-2 leading-relaxed">
                    {zone.critique}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Zone Inspection */}
        <div className="lg:col-span-6 bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="pb-3 border-b border-[#E4DDD2]">
            <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-1">
              Active Zone Inspection
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#2A211B]">
              {selectedZone.zoneName}
            </h3>
            <div className="text-xs text-[#8C7D6F] mt-1 font-mono">
              Attention: <span className="text-[#2A211B] font-semibold">{selectedZone.attentionLevel}</span> · Dwell: {selectedZone.fixationTimeMs}ms
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider block mb-1">
                Visual Assessment
              </span>
              <p className="text-[#5A4E44] leading-relaxed">
                {selectedZone.critique}
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] border border-[#E4DDD2] rounded-md">
              <span className="text-[10px] font-mono text-[#2A211B] uppercase tracking-wider block mb-1 font-medium">
                High-Leverage Recommendation
              </span>
              <p className="text-[#5A4E44] leading-relaxed">
                {selectedZone.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
