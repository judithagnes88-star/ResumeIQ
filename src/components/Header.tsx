import React from 'react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onTryDemo: () => void;
  onOpenUpload: () => void;
  healthScore: number;
  isDemo: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onTryDemo,
  onOpenUpload,
  healthScore,
  isDemo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E4DDD2]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Subtitle */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif font-semibold text-xl tracking-tight text-[#2A211B]">
              ResumeIQ
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C7D6F] hidden sm:inline">
              Career Intelligence Dossier
            </span>
            {isDemo && (
              <span className="text-[10px] font-mono text-[#7D6F5E] bg-[#EFEAE0] border border-[#DDD5C7] px-2 py-0.5 rounded ml-1">
                Sample
              </span>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#5A4E44] pr-4 border-r border-[#E4DDD2]">
              <span className="text-[#8C7D6F] font-sans">Index</span>
              <span className="font-serif font-semibold text-base text-[#2A211B]">{healthScore}</span>
              <span className="text-[11px] text-[#8C7D6F]">/ 100</span>
            </div>

            <button
              onClick={onTryDemo}
              className="px-3.5 py-1.5 text-xs text-[#2A211B] bg-[#FFFDF9] hover:bg-[#F3EFE6] border border-[#DDD5C7] rounded-md transition-colors cursor-pointer shadow-xs font-medium"
            >
              Benchmark Demo
            </button>

            <button
              onClick={onOpenUpload}
              className="px-4 py-1.5 text-xs text-[#FAF7F2] bg-[#2A211B] hover:bg-[#3D3027] rounded-md transition-colors cursor-pointer font-medium shadow-sm"
            >
              Analyze Resume
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
