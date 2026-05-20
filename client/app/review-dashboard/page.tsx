'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiCode, FiTrash2, FiBarChart2, FiList, FiFileText, FiArrowRight, FiLogOut } from 'react-icons/fi';
import { backendURL } from "../constant/data";

interface CodeReviewRequest {
  code: string;
  language: string;
}

interface CodeReviewResponse {
  sessionId: number;
  reviewReport: string;
  // Add other fields as per your backend's CodeReviewResponse DTO
}

interface ReviewHistoryDTO {
  sessionId: number;
  language: string;
  timestamp: string;
  score: number;
  summary: string;
}

interface DashboardStats {
  totalReviews: number;
  averageScore: number;
  totalFindings: number;
  languageDistribution: Record<string, number>;
}

const ReviewDashboardPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [codeToReview, setCodeToReview] = useState<string>('');
  const [language, setLanguage] = useState<string>('java');
  const [sessionId, setSessionId] = useState<string>('');
  const [reviewReport, setReviewReport] = useState<string | null>(null);
  const [history, setHistory] = useState<ReviewHistoryDTO[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>('');
  const [filteredSessions, setFilteredSessions] = useState<ReviewHistoryDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cleanBase = backendURL.endsWith('/') ? backendURL.slice(0, -1) : backendURL;
  const apiBase = cleanBase.replace("/api/review/submit", "");

  const makeAuthenticatedRequest = async (url: string, options?: RequestInit, authToken?: string) => {
    const activeToken = authToken || token;
    if (!activeToken) {
      setError('Authentication token not found. Please log in.');
      router.push('/login');
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBase}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`,
          ...options?.headers,
        },
      });
      setLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      console.error('API request failed:', err);
      return null;
    }
  };

  const fetchReviewHistory = async (authToken: string) => {
    const response = await makeAuthenticatedRequest('/api/review/history/all', {}, authToken);
    if (response) {
      const data: ReviewHistoryDTO[] = await response.json();
      setHistory(data);
      setFilteredSessions(data); // Initialize filtered sessions
    }
  };

  const fetchDashboardStats = async (authToken: string) => {
    const response = await makeAuthenticatedRequest('/api/review/history/stats', {}, authToken);
    if (response) {
      const data: DashboardStats = await response.json();
      setStats(data);
    }
  };

  const fetchSessionsByLanguage = async () => {
    if (!languageFilter) {
      setFilteredSessions(history); // Show all if no filter
      return;
    }
    const response = await makeAuthenticatedRequest(`/api/review/history/language/${languageFilter}`);
    if (response) {
      const data: ReviewHistoryDTO[] = await response.json();
      setFilteredSessions(data);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('idToken');
    if (!storedToken) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      setToken(storedToken);
      fetchReviewHistory(storedToken);
      fetchDashboardStats(storedToken);
    }
  }, [router]);

  const handleSubmitReview = async () => {
    const reqBody: CodeReviewRequest = { code: codeToReview, language };
    const response = await makeAuthenticatedRequest('/api/review/submit', {
      method: 'POST',
      body: JSON.stringify(reqBody),
    });
    if (response) {
      const result = await response.json();
      setReviewReport(result); // Assuming the backend returns the review report directly
      alert('Code review submitted successfully!');
      fetchReviewHistory(token!); // Refresh history
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('idToken');
    setToken(null);
    router.push('/login');
  };

  const fetchSessionReport = async () => {
    if (!sessionId) {
      setError('Please enter a Session ID.');
      return;
    }
    const response = await makeAuthenticatedRequest(`/api/review/${sessionId}/report`);
    if (response) {
      const report: CodeReviewResponse = await response.json();
      setReviewReport(report.reviewReport);
    }
  };

  const deleteReviewSession = async () => {
    if (!sessionId) {
      setError('Please enter a Session ID to delete.');
      return;
    }
    const response = await makeAuthenticatedRequest(`/api/review/${sessionId}`, {
      method: 'DELETE',
    });
    if (response) {
      alert(`Session ${sessionId} deleted successfully!`);
      setSessionId('');
      setReviewReport(null);
      fetchReviewHistory(token!); // Refresh history
    }
  };

  useEffect(() => {
    // Apply search filter whenever history, languageFilter, or searchQuery changes
    let currentFiltered = history;

    if (languageFilter) {
      currentFiltered = currentFiltered.filter(session => session.language.toLowerCase().includes(languageFilter.toLowerCase()));
    }

    if (searchQuery) {
      currentFiltered = currentFiltered.filter(session =>
        session.summary.toLowerCase().includes(searchQuery.toLowerCase()) || session.sessionId.toString().includes(searchQuery));
    }
    setFilteredSessions(currentFiltered);
  }, [history, languageFilter, searchQuery]);
  // Basic UI structure (you would enhance this significantly for a real dashboard)
  return (
    <div className="min-h-screen bg-[#08111f] text-white p-8">
    
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">AI Code Review Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600/10 text-rose-500 border border-rose-600/20 rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300 font-semibold text-sm"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>

      {loading && <p className="text-cyan-400">Loading...</p>}
      {error && <p className="text-rose-400">Error: {error}</p>}

      {/* Global Stats Cards */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
          <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Total Reviews</p>
          <p className="text-4xl font-bold text-cyan-400 mt-2">{stats?.totalReviews || 0}</p>
        </div>
        <div className="p-6 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
          <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Average Score</p>
          <p className="text-4xl font-bold text-emerald-400 mt-2">{stats?.averageScore ? `${stats.averageScore}%` : 'N/A'}</p>
        </div>
        <div className="p-6 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
          <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Total Findings</p>
          <p className="text-4xl font-bold text-rose-400 mt-2">{stats?.totalFindings || 0}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section: Submit and History */}
        <div className="lg:col-span-2 space-y-8">
         

          {reviewReport && (
            <section className="p-6 border border-white/10 rounded-lg bg-slate-900/30 animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-cyan-400"><FiFileText /> Review Report</h2>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 shadow-inner">
                <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono">{reviewReport}</pre>
              </div>
            </section>
          )}

          <section className="p-6 border border-white/10 rounded-lg bg-slate-900/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FiList /> Recent History</h2>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                className="p-3 rounded-md bg-slate-800 border border-slate-700 text-white grow"
                placeholder="Filter by language"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              />
              <button
                onClick={fetchSessionsByLanguage}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Filter
              </button>
            </div>

            {filteredSessions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 text-sm">
                      <th className="py-3 px-2">ID</th>
                      <th className="py-3 px-2">Language</th>
                      <th className="py-3 px-2">Score</th>
                      <th className="py-3 px-2">Summary</th>
                      <th className="py-3 px-2">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredSessions.map((session) => (
                      <tr key={session.sessionId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-2 text-cyan-400">#{session.sessionId}</td>
                        <td className="py-3 px-2 uppercase font-mono text-xs">{session.language}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded ${session.score >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {session.score}%
                          </span>
                        </td>
                        <td className="py-3 px-2 max-w-xs truncate text-slate-300">{session.summary}</td>
                        <td className="py-3 px-2 text-slate-500">{new Date(session.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-400 italic">No review history found or matching filter.</p>
            )}
          </section>
        </div>

        {/* Sidebar Section: Language Dist and Session Management */}
        <div className="space-y-8">
          <section className="p-6 border border-white/10 rounded-lg bg-slate-900/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiBarChart2 /> Language Distribution</h2>
            {stats?.languageDistribution ? (
              <div className="space-y-3">
                {Object.entries(stats.languageDistribution).map(([lang, count]) => {
                  const percentage = ((count / stats.totalReviews) * 100).toFixed(0);
                  return (
                    <div key={lang}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="uppercase font-mono">{lang}</span>
                        <span className="text-slate-400">{count} reviews ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Loading distribution...</p>
            )}
          </section>

          <section className="p-6 border border-white/10 rounded-lg bg-slate-900/30">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiFileText /> Session Management</h2>
            <input
              type="text"
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white mb-4"
              placeholder="Enter Session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={fetchSessionReport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                Get Report <FiFileText />
              </button>
              <button
                onClick={deleteReviewSession}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                Delete Session <FiTrash2 />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReviewDashboardPage;