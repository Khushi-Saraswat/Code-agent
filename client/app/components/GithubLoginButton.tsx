"use client";
import React, { JSX } from "react";
import { FaGithub } from "react-icons/fa6";

interface GithubLoginButtonProps {
  onClick: () => void;
}

const GithubLoginButton = ({ onClick }: GithubLoginButtonProps): JSX.Element => {
  return (
        <button
      onClick={onClick}
      className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-slate-100 hover:shadow-lg hover:shadow-cyan-400/20 active:scale-[0.98]"
    >
      <FaGithub className="text-xl transition-transform group-hover:scale-110" />
      Continue with GitHub
    </button>

  );
};

export default GithubLoginButton;