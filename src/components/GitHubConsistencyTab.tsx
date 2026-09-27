import React, { useState } from 'react';
import { GitHubConsistencyResult } from '../types';

interface GitHubConsistencyTabProps {
  githubData?: GitHubConsistencyResult;
  defaultUsername?: string;
}

export const GitHubConsistencyTab: React.FC<GitHubConsistencyTabProps> = ({
  githubData,
  defaultUsername = 'arjunsharma-dev',
}) => {
  const [data, setData] = useState<GitHubConsistencyResult | undefined>(githubData);
  const [usernameInput, setUsernameInput] = useState<string>(data?.username || defaultUsername);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!usernameInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/github-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUrl: usernameInput.trim() }),
      });

      if (!res.ok) throw new Error('Failed to query public GitHub profile');
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error querying public profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Workspace Header */}
      <div>
        <div className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#8C7D6F] mb-1.5">
          Public Artifact Verification
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-serif font-medium text-[#2A211B] tracking-tight">
          GitHub & Public Artifact Consistency
        </h1>
        <p className="text-sm text-[#5A4E44] mt-1.5 max-w-2xl leading-relaxed">
          Cross-references resume claims against public repositories, primary languages, and recent activity using the GitHub REST API.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4DDD2]">
          <div>
            <label className="text-xs font-semibold text-[#2A211B] block mb-1.5">
              Public GitHub Username
            </label>
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                placeholder="username"
                className="px-3.5 py-1.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-md text-xs text-[#2A211B] w-52 focus:outline-none focus:border-[#2A211B] transition-colors"
              />
              <button
                onClick={handleAudit}
                disabled={loading || !usernameInput.trim()}
                className="px-4 py-1.5 bg-[#2A211B] hover:bg-[#3D3027] text-[#FAF7F2] rounded-md text-xs font-medium transition-colors cursor-pointer disabled:opacity-40 shadow-xs"
              >
                {loading ? 'Checking...' : 'Audit Profile'}
              </button>
            </div>
          </div>

          <div className="text-xs text-[#8C7D6F] max-w-sm sm:text-right font-mono text-[11px]">
            Policy: Unsubstantiated claims are characterized neutrally as <em className="text-[#5A4E44]">"Limited public evidence found"</em>.
          </div>
        </div>

        {errorMsg && (
          <div className="pt-3 text-xs text-[#A44C40]">
            {errorMsg}
          </div>
        )}
      </div>

      {data && (
        <div className="space-y-6">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs border-b border-[#E4DDD2] pb-6">
            <div>
              <span className="text-[#8C7D6F] uppercase tracking-wider text-[10px] font-mono block">Profile Handle</span>
              <span className="font-serif text-lg font-semibold text-[#2A211B] mt-0.5 block">@{data.username}</span>
              <span className="text-[#5A4E44] text-[11px] mt-0.5 block">{data.publicRepoCount} public repositories</span>
            </div>

            <div>
              <span className="text-[#8C7D6F] uppercase tracking-wider text-[10px] font-mono block">Consistency Score</span>
              <span className="font-serif text-lg font-semibold text-[#2A211B] mt-0.5 block">{data.overallConsistencyScore}% Alignment</span>
              <span className="text-[#5A4E44] text-[11px] mt-0.5 block">Cross-referenced against commit activity</span>
            </div>

            <div>
              <span className="text-[#8C7D6F] uppercase tracking-wider text-[10px] font-mono block">Audit Verdict</span>
              <span className="font-serif text-lg font-semibold text-[#5E7052] mt-0.5 block">
                {data.profileFound ? 'Profile Active' : 'Unconfirmed'}
              </span>
              <span className="text-[#5A4E44] text-[11px] mt-0.5 block">{data.neutralSummary || 'Foundational alignment validated'}</span>
            </div>
          </div>

          {/* Consistency Findings List */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F]">
              Discrepancy & Corroboration Report ({data.matchedClaims?.length || 0})
            </div>

            <div className="space-y-3">
              {(data.matchedClaims || []).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md p-4 space-y-2 text-xs shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-[#2A211B]">
                      Resume Claim: "{item.claim}"
                    </div>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded shrink-0 ${
                        item.verdict === 'Consistent'
                          ? 'text-[#5E7052] bg-[#F2F5F0] border border-[#D5DDD2]'
                          : 'text-[#A66B38] bg-[#FAF5EE] border border-[#EADBCE]'
                      }`}
                    >
                      {item.verdict}
                    </span>
                  </div>

                  <div className="text-[#5A4E44] leading-relaxed">
                    <strong className="text-[#2A211B] font-medium">Public Evidence:</strong> {item.githubEvidence}
                  </div>

                  <div className="text-[#8C7D6F] text-[11px]">
                    <strong className="text-[#5A4E44]">Commentary:</strong> {item.commentary}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Languages */}
          {data.topLanguages && data.topLanguages.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#E4DDD2]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C7D6F]">
                Verified Repository Languages
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {data.topLanguages.map((tl, i) => (
                  <div
                    key={i}
                    className="bg-[#FFFDF9] border border-[#E4DDD2] rounded-md px-3 py-1.5 flex items-center gap-2 shadow-2xs"
                  >
                    <span className="font-medium text-[#2A211B]">{tl.language}</span>
                    <span className="text-[#8C7D6F] font-mono text-[11px] bg-[#FAF7F2] border border-[#DDD5C7] px-1.5 py-0.2 rounded">{tl.count} repos</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
