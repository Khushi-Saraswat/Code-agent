"use client"

import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import ReviewViewer from "./ReviewViewer";
import "highlight.js/styles/github-dark.css";

interface RightPanelProps {
  finalCode: string;
  reviewJson: any;
  repoTree?: any[];
  githubOwner?: string;
  githubRepo?: string;
  githubBranch?: string;
  selectedFilePath?: string;
  error: string | null;
  loading: boolean;
}

const RightPanel = ({
  finalCode,
  reviewJson,
  selectedFilePath,
  error,
  loading,
}: RightPanelProps): React.JSX.Element => {
  return (
    <section className="flex min-h-[520px] flex-1 flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-lg lg:min-h-0">
      <header className="flex-shrink-0 border-b border-gray-800 bg-gray-800/50 p-3 text-base font-bold text-blue-400 sm:p-4 sm:text-lg">
        AI AUDIT REPORT
      </header>
      <div className="custom-scrollbar flex-1 overflow-y-auto p-3 sm:p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 animate-pulse font-mono text-sm">Analyzing Vulnerabilities...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            <strong>System Error:</strong> {error}
          </div>
        ) : reviewJson ? (
          <ReviewViewer data={reviewJson} sourceName={selectedFilePath} />
        ) : finalCode ? (
          <Markdown rehypePlugins={[rehypeHighlight]}>{finalCode}</Markdown>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-600 italic text-sm">
            Enter code and click review to start audit, or load a GitHub repository tree.
          </div>
        )}
      </div>
    </section>
  );
};


export default RightPanel;
