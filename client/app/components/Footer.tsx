"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { footerData } from "../constant/data";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-slate-950/80 px-6 py-5 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-md transition hover:opacity-85"
          aria-label="Go to home page"
        >
          <img src="/logo.png" alt="AI Code Reviewer logo" className="h-10 w-auto" />
        </button>

        <div className="text-center text-slate-400">
          © 2026 All Rights Reserved - Developed by{" "}
          <span className="text-white">Khushi Saraswat</span>
        </div>

        <div className="flex gap-4 text-lg">
          {footerData?.map((item, i) => (
            <Link
              key={i}
              href={item.to}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition hover:text-cyan-300"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
