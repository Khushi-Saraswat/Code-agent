"use client"; // Force Next.js App Router to handle this as a client component

import React, { useMemo, useState } from "react";
import { FaFile, FaGithub, FaCode } from "react-icons/fa";
import Editor from "@monaco-editor/react";

interface RepoTreeItem {
  path: string;
  entryType: "Directory" | "File";
  size?: number;
}

interface TreeNode {
  name: string;
  path: string;
  entryType: "Directory" | "File";
  size?: number;
  children: TreeNode[];
}

interface RepoTreeViewerProps {
  tree: RepoTreeItem[];
  owner: string;
  repo: string;
  branch: string;
}

const buildTree = (items: RepoTreeItem[]): TreeNode[] => {
  return items
    .filter((item) => item.entryType === "File")
    .map((item) => {
      const segments = item.path.split("/");
      return {
        name: segments[segments.length - 1],
        path: item.path,
        entryType: "File" as const,
        size: item.size,
        children: [] as TreeNode[],
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

const RepoTreeViewer: React.FC<RepoTreeViewerProps> = ({ tree, owner, repo, branch }) => {
  const treeNodes = useMemo(() => buildTree(tree), [tree]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const buildGithubUrl = (path: string) => {
    const base = `https://github.com/${owner}/${repo}`;
    return `${base}/blob/${branch}/${path}`;
  };

  const escapeHtml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const openFileListWindow = () => {
    // Check for window to guarantee safety in SSR environments
    if (typeof window === "undefined") return;

    const win = window.open("", "_blank", "width=900,height=800,scrollbars=yes");
    if (!win) return;

    const rows = treeNodes
      .map(
        (node) => `
          <div class="file-row">
            <div class="file-name">${escapeHtml(node.path)}</div>
            <a href="${buildGithubUrl(node.path)}" target="_blank" rel="noreferrer" class="file-link">Open on GitHub</a>
          </div>`
      )
      .join("");

    const html = `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>GitHub File List</title>
        <style>
          body { background:#0f172a; color:#e2e8f0; font-family:system-ui, sans-serif; margin:0; padding:24px; }
          h1 { margin-bottom:16px; font-size:1.4rem; color:#38bdf8; }
          .meta { margin-bottom:24px; color:#94a3b8; }
          .file-row { display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px; padding:14px 16px; border:1px solid rgba(148,163,184,0.16); border-radius:12px; margin-bottom:12px; background:rgba(15,23,42,0.88); }
          .file-name { flex:1 1 60%; min-width:220px; word-break:break-word; }
          .file-link { color:#7dd3fc; text-decoration:none; border:1px solid rgba(125,211,252,0.35); padding:8px 12px; border-radius:9999px; transition:background 0.2s; }
          .file-link:hover { background:rgba(56,189,248,0.14); }
          .footer { margin-top:24px; color:#94a3b8; font-size:0.95rem; }
        </style>
      </head>
      <body>
        <h1>GitHub file list for ${escapeHtml(owner)}/${escapeHtml(repo)}@${escapeHtml(branch)}</h1>
        <div class="meta">${treeNodes.length} files loaded from the repository tree.</div>
        ${rows}
        <div class="footer">Click any link to open the file directly on GitHub.</div>
      </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();
  };

  // Helper to infer code language based on file extensions
  const getLanguageFromPath = (path: string): string => {
    const ext = path.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "js": return "javascript";
      case "jsx": return "javascript";
      case "ts": return "typescript";
      case "tsx": return "typescript";
      case "py": return "python";
      case "md": return "markdown";
      case "json": return "json";
      case "css": return "css";
      case "html": return "html";
      default: return "plaintext";
    }
  };

  const renderNode = (node: TreeNode) => {
    return (
      <div key={node.path} className="flex items-center justify-between rounded-lg bg-gray-900 px-3 py-2 transition hover:bg-gray-800">
        <div className="flex items-center gap-2 text-sm text-gray-100">
          <FaFile className="text-sky-400" />
          <span>{node.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {node.size !== undefined && <span className="text-xs text-gray-400">{node.size} B</span>}
          
          <button
            type="button"
            onClick={() => setSelectedFile(node.path)}
            className="inline-flex items-center gap-1 rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-1 text-xs text-teal-300 hover:bg-teal-500/20"
          >
            <FaCode /> View Code
          </button>

          <a
            href={buildGithubUrl(node.path)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-xs text-blue-300 hover:bg-blue-500/20"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    );
  };

  if (!treeNodes.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900 p-6 text-center text-sm text-gray-400">
        No repository tree data available. Load a GitHub repository to explore files and folders.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* File Tree List Panel */}
      <div className="space-y-3 lg:col-span-1">
        <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-gray-400">GitHub Repository Explorer</div>
              <div className="text-sm text-gray-200">{owner}/{repo}@{branch}</div>
            </div>
            <button
              type="button"
              onClick={openFileListWindow}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20 w-full"
            >
              <FaGithub /> Open GitHub File List
            </button>
          </div>
        </div>
        <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
          {treeNodes.map((node) => renderNode(node))}
        </div>
      </div>

      {/* Monaco Editor Viewer Panel */}
      <div className="lg:col-span-2">
        {selectedFile ? (
          <div className="flex flex-col h-full rounded-xl border border-gray-700 bg-gray-900 overflow-hidden min-h-[500px]">
            <div className="border-b border-gray-700 bg-gray-950 px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-300">{selectedFile}</span>
              <button 
                onClick={() => setSelectedFile(null)} 
                className="text-xs text-gray-400 hover:text-gray-200"
              >
                Close Editor
              </button>
            </div>
            <div className="flex-1 w-full h-full">
              <Editor
                height="60vh"
                theme="vs-dark"
                path={selectedFile}
                language={getLanguageFromPath(selectedFile)}
                defaultValue={`// Fetching content for ${selectedFile}...`}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[500px] items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-6 text-center text-sm text-gray-500">
            Select a file to preview its code using Monaco Editor.
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoTreeViewer;
