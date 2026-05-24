"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaHistory, 
  FaCode, 
  FaCalendarAlt, 
  FaChevronDown, 
  FaChevronRight, 
  FaBug, 
  FaChartLine, 
  FaDownload, 
  FaLightbulb, 
  FaShieldAlt, 
  FaSignOutAlt
} from "react-icons/fa";

// --- ReviewHistoryPanel Component ---

interface ReviewHistoryPanelProps {
  history: any[];
  onSelect: (review: any) => void;
  selectedId?: string;
}

export const ReviewHistoryPanel: React.FC<ReviewHistoryPanelProps> = ({ history, onSelect, selectedId }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('idToken');
    // Redirect to login page
    router.push("/register");
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
      <div className="border-b border-white/5 p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <FaHistory className="text-cyan-400" />
            <h2>Review History</h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">Manage and view your past audits</p>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-200"
          title="Logout"
        >
          <FaSignOutAlt />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {history.length > 0 ? (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`w-full flex flex-col gap-2 rounded-2xl border p-4 text-left transition-all ${
                selectedId === item.id 
                  ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/5" 
                  : "border-transparent bg-white/5 hover:bg-white/10 hover:border-white/10"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 font-semibold text-sm text-white">
                  <FaCode className="text-slate-500" />
                  <span className="truncate max-w-[120px]">{item.sourceName || "Untitled Snippet"}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  (item.qualityScore?.score || 0) > 70 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "bg-amber-500/20 text-amber-400"
                }`}>
                  {item.qualityScore?.score || "--"}%
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <FaCalendarAlt />
                {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "Recently"}
              </div>
            </button>
          ))
        ) : (
          <div className="flex h-40 flex-col items-center justify-center text-center">
            <p className="text-sm text-slate-500">No history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ReviewViewer Component ---

interface ReviewViewerProps {
  data: any;
  sourceName?: string;
}

const getDownloadFileName = (sourceName?: string) => {
  if (!sourceName || sourceName === "Pasted code") return "fixed-code.txt";

  const fileName = sourceName.split("/").pop() || "code.txt";
  return fileName.startsWith("fixed-") ? fileName : `fixed-${fileName}`;
};

export const ReviewViewer: React.FC<ReviewViewerProps> = ({ data, sourceName }) => {
  const [activeTab, setActiveTab] = useState<"review" | "fix">("review");
  const [open, setOpen] = useState<any>({ score: true, issues: true });
  const report = data?.reviewReport || data;
  const fixedCode = report?.fixedCode?.code || "";

  const downloadFixedCode = () => {
    if (!fixedCode) return;

    const blob = new Blob([fixedCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = getDownloadFileName(sourceName || report?.sourceName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (!report) return null;

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* Tab Switcher */}
      <div className="grid grid-cols-2 rounded-2xl border border-white/5 bg-slate-950/50 p-1.5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setActiveTab("review")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
            activeTab === "review"
              ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          <FaShieldAlt className="text-base" />
          Review
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("fix")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
            activeTab === "fix"
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          <FaCode className="text-base" />
          Fix Code
        </button>
      </div>

      {activeTab === "review" ? (
        <>
          {/* Quality Score Card */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
            <button onClick={() => setOpen({...open, score: !open.score})} className="flex w-full items-center justify-between p-6 transition hover:bg-white/5">
              <div className="flex items-center gap-3 text-sm font-black tracking-widest text-white/90">
                <FaChartLine className="text-cyan-400" /> QUALITY SCORE
              </div>
              {open.score ? <FaChevronDown className="text-slate-500" /> : <FaChevronRight className="text-slate-500" />}
            </button>
            {open.score && (
              <div className="grid grid-cols-1 gap-8 border-t border-white/5 p-8 lg:grid-cols-[200px_1fr]">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 p-6 text-center">
                  <div className="text-5xl font-black text-cyan-400">{report.qualityScore?.score ?? "--"}%</div>
                  <div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">Rating</div>
                    <div className="text-lg font-bold text-emerald-400">{report.qualityScore?.rating || "Pending"}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{report.summary}</p>
              </div>
            )}
          </div>

          {/* Issues Card */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
            <button onClick={() => setOpen({...open, issues: !open.issues})} className="flex w-full items-center justify-between p-6 transition hover:bg-white/5">
              <div className="flex items-center gap-3 text-sm font-black tracking-widest text-white/90">
                <FaBug className="text-rose-400" /> DETECTED ISSUES
              </div>
              {open.issues ? <FaChevronDown className="text-slate-500" /> : <FaChevronRight className="text-slate-500" />}
            </button>
            {open.issues && (
              <div className="space-y-4 border-t border-white/5 p-6">
                {report.issues?.length ? (
                  report.issues.map((iss: any, i: number) => (
                    <div key={i} className="group rounded-2xl border border-white/5 bg-slate-950/40 p-5 text-sm leading-relaxed transition-all hover:border-rose-500/20 hover:bg-rose-500/5">
                      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-rose-300">{iss.type}</span>
                        {iss.type} | Lines: {iss.lineStart}-{iss.lineEnd}
                      </div>
                      <div className="text-slate-200">{iss.issue}</div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
                    No issues returned by the reviewer.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {report.educationalResources?.resources?.map((res: any, i: number) => (
              <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-slate-950">
                <FaLightbulb /> {res.topic}
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 bg-slate-900/50 px-6 py-4">
            <div className="flex items-center gap-2 text-sm font-black tracking-widest text-emerald-400">
              <FaCode /> Suggested Fix
            </div>
            {fixedCode && (
              <button
                type="button"
                onClick={downloadFixedCode}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95"
              >
                <FaDownload /> Download Fix
              </button>
            )}
          </div>
          {fixedCode ? (
            <pre className="max-h-[60vh] overflow-auto p-6 text-sm leading-relaxed text-emerald-300/80 custom-scrollbar font-mono"><code>{fixedCode}</code></pre>
          ) : (
            <div className="p-10 text-center text-sm text-slate-500">No fixed code returned for this review.</div>
          )}
        </div>
      )}
    </div>
  );
};
