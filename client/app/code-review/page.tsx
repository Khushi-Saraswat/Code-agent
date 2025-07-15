"use client";

import { useEffect, useState } from "react";
import prism from "prismjs";
import axios from "axios";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "highlight.js/styles/github-dark.css";

import RightPanel from "../components/RightPanel";
import LeftPanel from "../components/LeftPanel";
import Footer from "../components/Footer";
import { backendURL } from "../constant/data";

const CodeReview: React.FC = () => {
  const [code, setCode] = useState<string>(`function sum() {
  return a + b;
}`);
  const [finalCode, setFinalCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const reviewCode = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.post<{ data: string }>(`${backendURL}`, {
        code,
      });

      // If your backend sends raw string directly:
      setFinalCode(typeof res.data === "string" ? res.data : res.data.data);
    } catch (error) {
      console.error("Code review error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    prism.highlightAll();
  }, [finalCode]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-950 text-white">
      <div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        <LeftPanel
          code={code}
          setCode={setCode}
          reviewCode={reviewCode}
          loading={loading}
        />
        <RightPanel finalCode={finalCode} loading={loading} />
      </div>
      <Footer />
    </main>
  );
};

export default CodeReview;
