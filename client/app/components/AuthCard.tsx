"use client";

import Link from "next/link";
import React from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerHref: string;
  footerAction: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  footerText,
  footerHref,
  footerAction,
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-8 text-white">
      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-2xl">
        <Link href="/" className="text-sm text-blue-300 hover:text-blue-200">
          Back to home
        </Link>

        <div className="mt-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-gray-400">{subtitle}</p>
        </div>

        <div className="mt-6">{children}</div>

        <p className="mt-6 text-center text-sm text-gray-400">
          {footerText}{" "}
          <Link href={footerHref} className="font-semibold text-blue-300 hover:text-blue-200">
            {footerAction}
          </Link>
        </p>
      </div>
    </main>
  );
};

export default AuthCard;
