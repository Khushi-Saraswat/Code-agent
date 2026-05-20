'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
import { homeData } from "./constant/data";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiGitPullRequest,
  FiShield,
  FiZap,
} from "react-icons/fi";


const stats = [
  { value: "2x", label: "faster review cycles" },
  { value: "24/7", label: "always-on feedback" },
  { value: "10+", label: "language patterns" },
];

const workflow = [
  {
    title: "Paste or upload code",
    description: "Drop a snippet into the reviewer and choose the language you are working with.",
    icon: <FiCode />,
  },
  {
    title: "AI scans risky areas",
    description: "The agent checks structure, bugs, readability, security issues, and improvement scope.",
    icon: <FiCpu />,
  },
  {
    title: "Ship with confidence",
    description: "Review clear suggestions, apply changes, and keep your codebase easier to maintain.",
    icon: <FiGitPullRequest />,
  },
];

const trustPoints = [
  "Security-first suggestions",
  "Readable explanations",
  "Beginner-friendly feedback",
  "Clean dashboard workflow",
];

const Home = () => {

  const router = useRouter();

  const handleCodeReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('idToken');
    if (token) {
      router.push("/code-review");
    } else {
      router.push("/register");
    }
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('idToken');
    if (token) {
      router.push("/review-dashboard");
    } else {
      router.push("/login");
    }
  };
  
  return (
    <div className="min-h-screen bg-[#08111f] text-white flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(14,165,233,0.18),_transparent_36%,_rgba(236,72,153,0.14)_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,_rgba(45,212,191,0.18),_transparent_32%),radial-gradient(circle_at_78%_28%,_rgba(168,85,247,0.16),_transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <header className="relative z-10 w-full">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/30">
              <FiShield />
            </span>
            <span>AI Code Reviewer</span>
          </Link>
          <div className="flex flex-wrap justify-end gap-3">
            <Link
              href="/register"
              className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Get Started
            </Link>
          
          </div>
        </nav>

        <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-sm text-cyan-100 shadow-lg shadow-cyan-950/20">
              <FiZap className="text-cyan-300" />
              Review smarter before your pull request
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Cleaner code reviews, powered by AI.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Catch bugs, improve readability, and understand what to fix with clear, practical feedback designed for real development flow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              
              <button // Changed from Link to button for programmatic navigation
                onClick={handleDashboardClick}
                className="inline-flex items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Open Dashboard
              </button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-2xl font-extrabold text-cyan-200 sm:text-3xl">{item.value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-slate-400">review.ts</span>
              </div>
              <div className="space-y-3 font-mono text-sm text-slate-300">
                <div><span className="text-purple-300">function</span> validatePullRequest(repo) {"{"}</div>
                <div className="pl-5 text-slate-400">const issues = scan(repo.diff);</div>
                <div className="pl-5 text-cyan-200">return issues.map(explainFix);</div>
                <div>{"}"}</div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
                    <FiCheckCircle /> Good structure detected
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Functions are focused, but one edge case needs null handling before merge.
                  </p>
                </div>
                <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4">
                  <div className="text-sm font-semibold text-amber-200">Suggested improvement</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Add validation before accessing nested fields to prevent runtime crashes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main className="relative z-10">
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              Why AI Code Reviewer?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              A focused review assistant for students, solo builders, and teams who want useful code feedback without waiting for another developer to be free.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeData?.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-slate-950/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.08]"
                tabIndex={0}
                aria-label={`Feature: ${feature.title}`}
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-cyan-300/10 text-2xl text-cyan-200 ring-1 ring-cyan-300/20 transition group-hover:scale-105">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl">A review flow that feels natural</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Keep the experience simple: add code, read the review, apply what matters, and move ahead with a cleaner branch.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm text-slate-200">
                    <FiCheckCircle className="shrink-0 text-emerald-300" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {workflow.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-lg border border-white/10 bg-slate-950/45 p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-cyan-300/10 text-xl text-cyan-200">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Step {index + 1}</div>
                    <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-6 sm:p-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to review your next commit?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Start with a small snippet today, then use the dashboard for deeper reviews as your project grows.
              </p>
            </div>
            <button
              onClick={handleCodeReviewClick}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
            >
              Get Started <FiArrowRight />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
