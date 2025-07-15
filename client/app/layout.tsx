import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Code Reviewer – Instant Code Feedback with AI",
  description:
    "Get instant, intelligent code reviews powered by AI. Analyze your code for bugs, improvements, and best practices in real-time.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} font-jetbrains antialiased`}>
        {children}
      </body>
    </html>
  );
}
