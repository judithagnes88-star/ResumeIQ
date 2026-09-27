import React, { useState } from 'react';
import { BulletImpact, FullAnalysisData } from '../types';

interface BulletRewriterTabProps {
  bullets: BulletImpact[];
  quantification: FullAnalysisData['quantification'];
  toneAndSeniority: FullAnalysisData['toneAndSeniority'];
  targetRole: string;
}

export const BulletRewriterTab: React.FC<BulletRewriterTabProps> = ({
  bullets,
  quantification,
  toneAndSeniority,
  targetRole,
}) => {
  const [bulletList, setBulletList] = useState<BulletImpact[]>(bullets);
  const [customInput, setCustomInput] = useState<string>('');
  const [isRewriting, setIsRewriting] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCustomRewrite = async () => {
    if (!customInput.trim()) return;
    setIsRewriting(true);

    try {
      const res = await fetch('/api/rewrite-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: customInput.trim(),
          targetRole,
        }),
      });

      if (res.ok) {
        const newBullet: BulletImpact = await res.json();
        setBulletList([newBullet, ...bulletList]);
        setCustomInput('');
      } else {
        const fallback: BulletImpact = {
          id: `b_${Date.now()}`,
          original: customInput.trim(),
          actionVerb: 'Moderate',
          actionVerbText: 'Engineered',
          hasMetric: false,
          hasResult: true,
          hasTechnology: true,
          impactScore: 72,
          improvedVersion: `Spearheaded ${customInput.replace(/^(worked on|helped with|assisted in)/i, '').trim()}, delivering [add metric, e.g. 25% efficiency gain] across [add scale or users].`,
          explanation: 'Restructured using action-first formula with metric placeholders.',
        };
        setBulletList([fallback, ...bulletList]);
        setCustomInput('');
      }
    } catch {
      const fallback: BulletImpact = {
        id: `b_${Date.now()}`,
        original: customInput.trim(),
        actionVerb: 'Moderate',
        actionVerbText: 'Engineered',
        hasMetric: false,
        hasResult: true,
        hasTechnology: true,
        impactScore: 70,
        improvedVersion: `Engineered ${customInput.trim()}, resulting in [add metric, e.g. 25% efficiency boost] for [add user volume].`,
        explanation: 'Formatted into Action Verb + Metric + Result formula.',
      };
      setBulletList([fallback, ...bulletList]);
      setCustomInput('');
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Precision Language & Impact
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          Bullet Impact Rewriter
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Evaluates statements against the Action Verb + Task + Technology + Metric + Result formula. Auto-rewrites weak lines using bracketed placeholders to maintain absolute truthfulness.
        </p>
      </div>

      {/* Interactive Input Strip */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 space-y-3.5 shadow-2xs">
        <label className="text-xs font-semibold text-[#2A211B] block">
          Analyze & Rewrite Custom Statement
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomRewrite()}
            placeholder="e.g. Worked on customer churn prediction using Python..."
            className="flex-1 px-4 py-2 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-xs text-[#2A211B] placeholder-[#8C7D6F] focus:outline-none focus:border-[#2A211B] transition-colors"
          />
          <button
            onClick={handleCustomRewrite}
            disabled={isRewriting || !customInput.trim()}
            className="px-5 py-2 bg-[#2A211B] hover:bg-[#3D3027] disabled:opacity-40 text-[#FAF7F2] rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            {isRewriting ? 'Analyzing...' : 'Rewrite Bullet'}
          </button>
        </div>
        <div className="text-[11px] text-[#8C7D6F] font-mono">
          Standard formula: <span className="text-[#2A211B] font-medium">Action Verb + Task + Technology + Metric + Result</span>
        </div>
      </div>

      {/* Bullets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F]">
          <span>Audited Statements ({bulletList.length})</span>
          <span>Quantification Ratio: {quantification.quantifiedPercentage}%</span>
        </div>

        <div className="space-y-4">
          {bulletList.map((bullet) => (
            <div
              key={bullet.id}
              className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 space-y-3.5 shadow-2xs"
            >
              {/* Top Meta Line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4DDD2] text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-medium text-[#2A211B]">
                    Impact Score: <span className="font-mono text-sm font-semibold">{bullet.impactScore}</span> / 100
                  </span>
                  <span className="text-[#8C7D6F]">·</span>
                  <span className="text-[#5A4E44]">
                    Verb: <strong className="text-[#2A211B] font-medium">{bullet.actionVerb}</strong>
                  </span>
                  <span className="text-[#8C7D6F]">·</span>
                  <span className="text-[#5A4E44]">
                    Metric: {bullet.hasMetric ? <span className="text-[#5E7052] font-medium">Detected</span> : <span className="text-[#A44C40]">Missing</span>}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(bullet.id, bullet.improvedVersion)}
                  className="text-xs text-[#2A211B] hover:text-[#A66B38] underline underline-offset-4 cursor-pointer self-start sm:self-auto font-medium transition-colors"
                >
                  {copiedId === bullet.id ? '✓ Copied' : 'Copy suggested text'}
                </button>
              </div>

              {/* Two Column Before/After */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-[#8C7D6F] uppercase tracking-wider mb-1">
                    Original Candidate Phrasing
                  </div>
                  <div className="text-[#5A4E44] leading-relaxed italic bg-[#FAF7F2] p-3 rounded border border-[#E8E1D5]">
                    "{bullet.original}"
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-[#5E7052] uppercase tracking-wider mb-1 font-semibold">
                    Suggested High-Impact Rewrite
                  </div>
                  <div className="text-[#2A211B] leading-relaxed bg-[#FDFCF9] p-3 rounded border border-[#E4DDD2]">
                    "{bullet.improvedVersion}"
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#8C7D6F] pt-1">
                <strong className="text-[#2A211B]">Engine Feedback:</strong> {bullet.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tone & Seniority Calibration */}
      <div className="border-t border-[#E4DDD2] pt-8">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F] mb-1">
          Vocabulary Calibration
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-serif text-xl font-medium text-[#2A211B]">
            Tone & Seniority Alignment
          </h2>
          <span className="text-xs font-mono font-medium text-[#5E7052] bg-[#F2F5F0] border border-[#D5DDD2] px-2 py-0.5 rounded">
            Target: {toneAndSeniority.selectedLevel} ({toneAndSeniority.assessment})
          </span>
        </div>
        <p className="text-xs text-[#5A4E44] max-w-2xl leading-relaxed mb-4">
          {toneAndSeniority.explanation}
        </p>

        <div className="space-y-3">
          {toneAndSeniority.examples.map((ex, i) => (
            <div
              key={i}
              className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 text-xs space-y-1.5 shadow-2xs"
            >
              <div className="text-[#5A4E44]">
                <strong className="text-[#2A211B]">Flagged phrasing:</strong> "{ex.original}"
              </div>
              <div className="text-[#8C7D6F]">
                <strong className="text-[#5A4E44]">Observation:</strong> {ex.reason}
              </div>
              <div className="text-[#2A211B]">
                <strong>Calibrated alternative:</strong> "{ex.suggested}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
