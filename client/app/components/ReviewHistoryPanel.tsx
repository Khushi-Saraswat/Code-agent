"use client";
import React from "react";
import { FaHistory, FaCode, FaCalendarAlt } from "react-icons/fa";

interface ReviewHistoryPanelProps {
  history: any[];
  onSelect: (review: any) => void;
  selectedId?: string;
}

const ReviewHistoryPanel: React.FC<ReviewHistoryPanelProps> = ({ history, onSelect, selectedId }) => {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
      <div className="border-b border-white/5 p-6">
        <div className="flex items-center gap-2 text-lg font-bold text-white">
          <FaHistory className="text-cyan-400" />
          <h2>Review History</h2>
        </div>
        <p className="mt-1 text-xs text-slate-400">Manage and view your past audits</p>
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

export default ReviewHistoryPanel;