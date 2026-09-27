import React from 'react';

interface NavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

interface NavSection {
  title: string;
  items: {
    id: string;
    label: string;
  }[];
}

const navSections: NavSection[] = [
  {
    title: 'ANALYSIS',
    items: [
      { id: 'overview', label: 'Executive Overview' },
      { id: 'role-fit', label: 'Role Fit Heatmap' },
      { id: 'skill-gap', label: 'Skill Gap & Roadmap' },
      { id: 'jd-diff', label: 'JD Keyword Diff' },
    ],
  },
  {
    title: 'LANGUAGE & IMPACT',
    items: [
      { id: 'bullet-rewriter', label: 'Bullet Impact Rewriter' },
      { id: 'ats-sim', label: 'ATS Simulator' },
      { id: 'gamification', label: 'Health Scorecard' },
    ],
  },
  {
    title: 'CAREER TRAJECTORY',
    items: [
      { id: 'career-gps', label: 'Career GPS' },
      { id: 'learning-path', label: 'Learning Path' },
      { id: 'interview-prep', label: 'Interview Preparation' },
    ],
  },
  {
    title: 'DEEP VERIFICATION',
    items: [
      { id: 'recruiter-scan', label: 'Recruiter 6s Scan' },
      { id: 'consistency', label: 'GitHub Consistency' },
      { id: 'explainable-bias', label: 'Explainability & Bias' },
      { id: 'python-code', label: 'Export & Streamlit' },
    ],
  },
];

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="space-y-6 py-2">
      {navSections.map((section) => (
        <div key={section.title}>
          <div className="text-[10px] font-mono tracking-widest text-[#8C7D6F] uppercase px-3 mb-1.5 font-medium">
            {section.title}
          </div>
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#EFEAE0] text-[#2A211B] font-semibold border-l-2 border-[#2A211B] pl-2.5 shadow-xs'
                      : 'text-[#5A4E44] hover:text-[#2A211B] hover:bg-[#F4F0E6]'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A66B38]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};
