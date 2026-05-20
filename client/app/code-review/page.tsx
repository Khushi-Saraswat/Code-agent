"use client";

// Hamesha package name "react" se hi import karein, global.d.ts se nahi!
import React, { useState, useEffect } from "react"; 

import axios from "axios";
import { RepoTreeItem } from "../types/RepoTreeItem";

declare global {
  interface Window {
    handleOpenFileUrl?: (fileUrl: string) => void;
    handleRepositoryLoaded?: (data: { tree: RepoTreeItem[]; owner: string; repo: string; branch: string }) => void;
  }
}

import Link from "next/link";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Footer from "../components/Footer";
import FileTreeSidebar from "../components/FileTreeSidebar";
import ReviewHistoryPanel from "../components/ReviewHistoryPanel";
//import { ReviewHistoryItem } from "review."
import { backendURL } from "../constant/data";
import { openHistoryStorageKey, reviewHistoryStorageKey } from "../utils/localAuth";


const CodeReview: React.FC = () => {
  const [code, setCode] = useState<string>(`// Paste your buggy code here...`);
  const [finalCode, setFinalCode] = useState<string>("");
  const [reviewJson, setReviewJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [repoTree, setRepoTree] = useState<RepoTreeItem[]>([]);
  const [repoOwner, setRepoOwner] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");
  const [repoBranch, setRepoBranch] = useState<string>("main");
  const [selectedFilePath, setSelectedFilePath] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  

    
  const reviewCode = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setReviewJson(null);
    setFinalCode("");

    try {
      const res = await axios.post(`${backendURL}`, { code }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });

      let payload = res.data;

      if (typeof payload === "string") {
        try {
          const cleanJson = payload.replace(/```json|```/g, "").trim();
          payload = JSON.parse(cleanJson);
        } catch {
          console.error("JSON Parse Error");
        }
      }

      if (payload && (payload.reviewReport || payload.summary)) {
        setReviewJson(payload);
         
      } else {
        //setReviewJson(null);
        const finalText =
          typeof payload === "string"
            ? payload
            : JSON.stringify(payload, null, 2);

        setFinalCode(finalText);
       
      }
    } catch (axiosError: any) {
      console.error("API Error:", axiosError);

      const msg =
        axiosError?.response?.data?.message ||
        "Server limit reached or Backend unreachable.";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const apiBase = backendURL.replace("/api/review/submit", "");

  const fetchFileContent = async (
    fileUrl: string
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${apiBase}/api/health/github/file-content`,
        {
          params: {
            fileUrl,
          },
          headers: {
            Authorization: token ? `Bearer ${token}` : ""
          }
        }
      );

      const content: string = res.data;

      console.log("📄 File Content:", content);

      return content;
    } catch (axiosError: any) {
      console.error("❌ File Content Error:", axiosError);

      const msg =
        axiosError?.response?.data?.error ||
        axiosError?.response?.data?.message ||
        "Failed to fetch file content.";

      setError(msg);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const getPathFromGitHubUrl = (fileUrl: string): string => {
    try {
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split("/");
      const blobIndex = pathParts.indexOf("blob");

      if (blobIndex === -1 || blobIndex + 2 >= pathParts.length) return "";

      return decodeURIComponent(pathParts.slice(blobIndex + 2).join("/"));
    } catch {
      return "";
    }
  };

  const handleOpenFileUrl = async (
    fileUrl: string
  ): Promise<void> => {
    console.log("🔓 handleOpenFileUrl called with:", fileUrl);

    const content = await fetchFileContent(fileUrl);

    if (content !== null) {
      console.log(
        "✅ File loaded successfully, setting code in editor"
      );

      setCode(content);
      setSelectedFilePath(getPathFromGitHubUrl(fileUrl));
    } else {
      console.error("❌ Failed to fetch file content");
    }
  };

  const handleRepositoryLoaded = (data: { tree: RepoTreeItem[]; owner: string; repo: string; branch: string }) => {
    console.log("📦 Repository loaded:", data);
    setRepoTree(data.tree);
    setRepoOwner(data.owner);
    setRepoName(data.repo);
    setRepoBranch(data.branch);
    setSelectedFilePath("");
  };

  

  useEffect(() => {
    const storedToken = localStorage.getItem('idToken');
    if (storedToken) setToken(storedToken);
    window.handleOpenFileUrl = handleOpenFileUrl;
    window.handleRepositoryLoaded = handleRepositoryLoaded;

    return () => {
      delete window.handleOpenFileUrl;
      delete window.handleRepositoryLoaded;
    };
  }, []);

  // Ensure we don't have double slashes if backendURL has a trailing slash
  const cleanBase = backendURL.endsWith('/') ? backendURL.slice(0, -1) : backendURL;
  const healthURL = cleanBase.replace("/api/review/submit", "/api/health");

  const openGitHubDetailsWindow = (): void => {
    const firebaseToken = token || localStorage.getItem('idToken');
    const win = window.open(
      "",
      "_blank",
      "width=520,height=520,scrollbars=yes"
    );

    if (!win) {
      alert(
        "Please allow popups for this site to open the GitHub details window."
      );
      return;
    }

    const html = `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8" />

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>GitHub Repository Details</title>

<style>

body{
  background:#0d1117;
  color:white;
  font-family:Arial, sans-serif;
  padding:30px;
}

input{
  width:100%;
  box-sizing:border-box;
  padding:12px;
  margin-top:10px;
  margin-bottom:20px;
  border-radius:8px;
  border:none;
}

button{
  width:100%;
  padding:12px 18px;
  border:none;
  border-radius:8px;
  cursor:pointer;
  font-weight:700;
}

.primary{
  background:#238636;
  color:white;
}

#status{
  margin-top:20px;
  line-height:1.5;
}

.hint{
  color:#8b949e;
  font-size:14px;
  margin-bottom:22px;
}

</style>

</head>

<body>

<h2>GitHub Repository Details</h2>

<p class="hint">Enter repository details. Files and folders will appear in the left sidebar of your editor.</p>

<input id="gh-owner" placeholder="Owner e.g. facebook" />

<input id="gh-repo" placeholder="Repo e.g. react" />

<input id="gh-branch" value="main" />

<input id="gh-token" placeholder="GitHub Token (Optional)" />

<button id="gh-load" class="primary">
  Load Repository Tree
</button>

<div id="status"></div>

<script>

const firebaseToken = ${JSON.stringify(firebaseToken)};

const healthUrl = ${JSON.stringify(healthURL)};

const ownerEl = document.getElementById('gh-owner');

const repoEl = document.getElementById('gh-repo');

const branchEl = document.getElementById('gh-branch');

const tokenEl = document.getElementById('gh-token');

const statusEl = document.getElementById('status');

function setStatus(msg,color='white'){
  statusEl.innerHTML =
    '<p style="color:'+color+'">'+msg+'</p>';
}

async function fetchFiles(){
  const owner = ownerEl.value.trim();

  const repo = repoEl.value.trim();

  const branch = branchEl.value.trim();

  const token = tokenEl.value.trim();

  if(!owner || !repo || !branch){
    setStatus('Please fill all required fields','red');
    return;
  }

  setStatus('Loading repository tree...','#58a6ff');

  try{

    const headers = {
      'Authorization': firebaseToken ? 'Bearer ' + firebaseToken : ''
    };

    if(token){
      // Agar user ne GitHub token diya hai toh use alag header mein bhej sakte hain
      // ya backend requirement ke hisab se modify kar sakte hain
      headers['X-GitHub-Token'] = token;
    }

    const url =
      healthUrl +
      '/repo-details/' + 
      encodeURIComponent(owner) +
      '/' +
      encodeURIComponent(repo) +
      '/' +
      encodeURIComponent(branch);

    const res = await fetch(url,{headers});

    if(!res.ok){
      let errorDetail = '';
      try {
          const errData = await res.json();
          errorDetail = errData.message || errData.error || '';
      } catch(e) {}
      
      throw new Error(
        'Server returned ' + res.status + (errorDetail ? ': ' + errorDetail : '. Check backend logs.')
      );
    }

    const data = await res.json();

    const files = data.filter(
      item =>
        item.type === 'blob' ||
        item.entryType === 'File'
    );

    if(!files.length){
      setStatus('No files found','orange');
      return;
    }

    setStatus(
      files.length +
      ' files loaded. You can select files from the editor sidebar now.',
      '#3fb950'
    );

    if (window.opener && window.opener.handleRepositoryLoaded) {
      window.opener.handleRepositoryLoaded({
        tree: data,
        owner,
        repo,
        branch,
      });
      window.close();
    } else {
      setStatus(
        'Could not communicate with parent window.',
        'red'
      );
    }

  }catch(err){

    console.error(err);

    setStatus(
      err.message || 'Something went wrong',
      'red'
    );

  }

}

document
  .getElementById('gh-load')
  .addEventListener('click', fetchFiles);

</script>

</body>

</html>
`;

    win.document.write(html);
    win.document.close();
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-950 text-white">
      <div className="flex flex-wrap justify-end gap-3 border-b border-gray-800 p-3 sm:p-4">
        <Link
          href="/review-dashboard"
          className="rounded-md border border-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-800 transition"
        >
          Dashboard
        </Link>
      
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
          onClick={openGitHubDetailsWindow}
        >
          📦 Load Repository
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
       

        {/* File Tree Sidebar */}
        {repoTree.length > 0 && (
          <FileTreeSidebar
            tree={repoTree}
            owner={repoOwner}
            repo={repoName}
            branch={repoBranch}
            onFileClick={handleOpenFileUrl}
           // token={token}
          />
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-3 sm:p-4 xl:flex-row xl:overflow-hidden">
          <LeftPanel
            code={code}
            setCode={setCode}
            reviewCode={reviewCode}
            loading={loading}
            selectedFilePath={selectedFilePath}
          />

          <RightPanel
            finalCode={finalCode}
            reviewJson={reviewJson}
            loading={loading}
            error={error}
            selectedFilePath={selectedFilePath}
          />
        </div>
      </div>

      <Footer />

    </main>
  );
};

export default CodeReview;
