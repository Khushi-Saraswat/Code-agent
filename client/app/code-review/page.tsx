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

const CodeReview = () => {
  const [code, setCode] = useState(`function sum() {
  return a + b;
}`);
  const [finalCode, setFinalCode] = useState(``);
  const [loading, setLoading] = useState(false);

  const reviewCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}`, {
        code,
      });
      setFinalCode(res.data);
    } catch (error) {
      console.error(error);
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
