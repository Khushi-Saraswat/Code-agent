import { FaGithub, FaLinkedin, FaUserCircle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

export const homeData = [
  {
    title: "Intelligent Analysis",
    description: "Advanced AI delivers precise, context-aware code reviews.",
    icon: "🧠",
  },
  {
    title: "Real-Time Insights",
    description: "Instant, actionable feedback to elevate your code.",
    icon: "⚡",
  },
  {
    title: "Broad Language Support",
    description: "Compatible with all major programming languages.",
    icon: "🌐",
  },
  {
    title: "Seamless Integration",
    description: "Effortlessly fits into your development pipeline.",
    icon: "🔄",
  },
];

export const backendURL =
  "https://ai-code-reviewer-seven-pearl.vercel.app/ai/code-review";

export const footerData = [
  {
    to: "https://facebook.com/abdulalisoomro2k23",
    icon: <FaSquareFacebook />,
  },
  {
    to: "https://github.com/developer-abdulali",
    icon: <FaGithub />,
  },
  {
    to: "https://linkedin.com/in/abdulali12",
    icon: <FaLinkedin />,
  },
  {
    to: "https://abdulali.vercel.app",
    icon: <FaUserCircle />,
  },
];
