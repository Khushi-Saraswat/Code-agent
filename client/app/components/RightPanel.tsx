import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "highlight.js/styles/github-dark.css";

interface RightPanelProps {
  finalCode: string;
  loading: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ finalCode, loading }) => {
  return (
    <section className="w-full md:w-1/2 flex flex-col bg-gray-900 rounded-xl shadow-lg">
      <header className="text-lg font-semibold p-4 border-b border-gray-800 bg-gray-800">
        Code Review
      </header>
      <div
        className="flex-1 overflow-y-auto p-4 prose prose-invert max-w-none"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full text-white">
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-gray-300">Generating review...</p>
            </div>
          </div>
        ) : finalCode ? (
          <Markdown rehypePlugins={[rehypeHighlight]}>{finalCode}</Markdown>
        ) : (
          <p className="text-gray-400 italic">
            Your AI review will appear here.
          </p>
        )}
      </div>
    </section>
  );
};

export default RightPanel;
