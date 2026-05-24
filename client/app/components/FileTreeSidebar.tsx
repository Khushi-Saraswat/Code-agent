"use client";

import React, { useState, useMemo } from "react";
import { FaChevronRight, FaChevronDown, FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";

interface RepoTreeItem {
  path: string;
  entryType: "Directory" | "File";
  type?: string;
  size?: number;
}

interface TreeNode {
  name: string;
  path: string;
  type: "folder" | "file";
  children: TreeNode[];
  size?: number;
}

interface FileTreeSidebarProps {
  tree: RepoTreeItem[];
  onFileClick: (fileUrl: string) => void;
  owner: string;
  repo: string;
  branch: string;
}

const buildTree = (items: RepoTreeItem[]): TreeNode[] => {
  const nodeMap: Map<string, TreeNode> = new Map();

  items.forEach((item) => {
    const parts = item.path.split("/").filter(Boolean);
    let currentPath = "";

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isLast = index === parts.length - 1;
      const isFile = (item.entryType === "File" || item.type === "blob") && isLast;

      if (!nodeMap.has(currentPath)) {
        nodeMap.set(currentPath, {
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          children: [],
          size: isFile ? item.size : undefined,
        });
      } else if (isFile) {
        const existingNode = nodeMap.get(currentPath);
        if (existingNode) {
          existingNode.type = "file";
          existingNode.size = item.size;
        }
      }

      if (currentPath.includes("/")) {
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
        const parent = nodeMap.get(parentPath);
        const current = nodeMap.get(currentPath);

        if (parent && current && !parent.children.some((child) => child.path === current.path)) {
          parent.children.push(current);
        }
      }
    });
  });

  const topLevel = Array.from(nodeMap.values()).filter((node) => !node.path.includes("/"));
  return topLevel.sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
};

const TreeNodeComponent: React.FC<{
  node: TreeNode;
  onFileClick: (fileUrl: string) => void;
  owner: string;
  repo: string;
  branch: string;
  level?: number;
}> = ({ node, onFileClick, owner, repo, branch, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children.length > 0;

  const buildGithubUrl = (path: string) => {
    const encodedPath = path
      .split("/")
      .map(encodeURIComponent)
      .join("/");
    return `https://github.com/${owner}/${repo}/blob/${branch}/${encodedPath}`;
  };

  const handleFileClick = () => {
    if (node.type === "file") {
      onFileClick(buildGithubUrl(node.path));
    }
  };

  const paddingLeft = `${level * 16}px`;

  return (
    <div key={node.path}>
      <div
        style={{ paddingLeft }}
        className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-700 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors"
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          if (node.type === "file") handleFileClick();
        }}
      >
        {node.type === "folder" ? (
          <>
            {hasChildren && isOpen ? (
              <FaChevronDown className="w-3 h-3 flex-shrink-0 text-gray-500" />
            ) : (
              <FaChevronRight className="w-3 h-3 flex-shrink-0 text-gray-600" />
            )}
            {isOpen ? (
              <FaFolderOpen className="w-4 h-4 flex-shrink-0 text-yellow-500" />
            ) : (
              <FaFolder className="w-4 h-4 flex-shrink-0 text-yellow-600" />
            )}
          </>
        ) : (
          <>
            <div className="w-3 h-3 flex-shrink-0" />
            <FaFile className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" />
          </>
        )}
        <span className="flex-1 truncate">{node.name}</span>
        {node.size !== undefined && <span className="text-xs text-gray-500">{(node.size / 1024).toFixed(1)}KB</span>}
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children
            .sort((a, b) => {
              if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
              return a.name.localeCompare(b.name);
            })
            .map((child) => (
              <TreeNodeComponent
                key={child.path}
                node={child}
                onFileClick={onFileClick}
                owner={owner}
                repo={repo}
                branch={branch}
                level={level + 1}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const FileTreeSidebar: React.FC<FileTreeSidebarProps> = ({ tree, onFileClick, owner, repo, branch }) => {
  const treeNodes = useMemo(() => buildTree(tree), [tree]);

  if (!treeNodes.length) {
    return (
      <div className="flex max-h-80 w-full flex-col overflow-hidden border-b border-gray-800 bg-gray-900 lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r">
        <div className="p-4 border-b border-gray-800">
          <div className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-1">Explorer</div>
          <div className="text-sm text-gray-400 truncate">{owner}/{repo}</div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 text-center text-gray-500 text-sm">
          No files found. Load a repository first.
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-h-80 w-full flex-col overflow-hidden border-b border-gray-800 bg-gray-900 lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r">
      <div className="p-4 border-b border-gray-800 flex-shrink-0">
        <div className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-1">Explorer</div>
        <div className="text-sm text-gray-300 truncate font-mono">{owner}/{repo}</div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {treeNodes.map((node) => (
          <TreeNodeComponent
            key={node.path}
            node={node}
            onFileClick={onFileClick}
            owner={owner}
            repo={repo}
            branch={branch}
          />
        ))}
      </div>
      <div className="p-3 border-t border-gray-800 text-xs text-gray-500 flex-shrink-0">
        {tree.length} items
      </div>
    </div>
  );
};

export default FileTreeSidebar;
