"use client";

import React, { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { FaCheckCircle, FaCopy, FaExclamationCircle, FaPlay } from "react-icons/fa";

interface LeftPanelProps {
  code: string;
  setCode: (code: string) => void;
  reviewCode: () => void;
  loading: boolean;
  selectedFilePath?: string;
}

const LeftPanel = ({ code, setCode, reviewCode, loading, selectedFilePath }: LeftPanelProps) => {
  const [copyMessage, setCopyMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const language = useMemo(() => {
    const extension = selectedFilePath?.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "java":
        return "java";
      case "py":
        return "python";
      case "json":
        return "json";
      case "html":
        return "html";
      case "css":
        return "css";
      case "md":
        return "markdown";
      default:
        return "javascript";
    }
  }, [selectedFilePath]);

  const showCopyMessage = (type: "success" | "error", text: string) => {
    setCopyMessage({ type, text });
    window.setTimeout(() => setCopyMessage(null), 2400);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyMessage("success", "Code copied beautifully");
    } catch (err) {
      console.error("Could not copy text: ", err);
      showCopyMessage("error", "Copy failed. Please try again.");
    }
  };

  return (
    <section className="relative flex min-h-[520px] flex-1 flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-lg lg:min-h-0">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 bg-gray-800 p-3 sm:p-4">
        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold sm:text-lg">Code Editor</div>
          {selectedFilePath && (
            <div className="mt-1 max-w-full truncate rounded bg-gray-700 px-2 py-1 text-xs font-normal text-gray-300 sm:max-w-[42vw]">
              {selectedFilePath}
            </div>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={() => copyToClipboard(code)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-700 text-gray-300 transition hover:bg-gray-700 hover:text-white"
            title="Copy code"
          >
            <FaCopy />
          </button>
          <button
            onClick={reviewCode}
            disabled={loading}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? (
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <FaPlay className="text-xs" />
            )}
            {loading ? "Reviewing..." : "Review Code"}
          </button>
        </div>
      </header>
      <div className="min-h-[440px] flex-1 overflow-hidden">
        <Editor
          value={code}
          onChange={(value: any) => setCode(value || "")}
          language={language}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: '"Fira Code", monospace',
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
          }}
        />
      </div>
      {copyMessage && (
        <div
          className={`absolute right-4 top-20 z-20 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-2xl backdrop-blur-md transition ${
            copyMessage.type === "success"
              ? "border-green-400/40 bg-green-500/15 text-green-100"
              : "border-red-400/40 bg-red-500/15 text-red-100"
          }`}
        >
          {copyMessage.type === "success" ? (
            <FaCheckCircle className="flex-shrink-0 text-green-300" />
          ) : (
            <FaExclamationCircle className="flex-shrink-0 text-red-300" />
          )}
          <span>{copyMessage.text}</span>
        </div>
      )}
    </section>
  );
};

export default LeftPanel;
