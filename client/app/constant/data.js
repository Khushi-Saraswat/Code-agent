import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiActivity, FiCpu, FiGlobe, FiRefreshCw } from "react-icons/fi";

export const homeData = [
  {
    title: "Intelligent Analysis",
    description: "Advanced AI delivers precise, context-aware code reviews.",
    icon: <FiCpu />,
  },
  {
    title: "Real-Time Insights",
    description: "Instant, actionable feedback to elevate your code.",
    icon: <FiActivity />,
  },
  {
    title: "Broad Language Support",
    description: "Compatible with all major programming languages.",
    icon: <FiGlobe />,
  },
  {
    title: "Seamless Integration",
    description: "Effortlessly fits into your development pipeline.",
    icon: <FiRefreshCw />,
  },
];

export const backendURL = "http://localhost:8080/api/review/submit";

export const footerData = [
  {
    to: "https://github.com/Khushi-Saraswat",
    icon: <FaGithub />,
  },
  {
    to: "https://www.linkedin.com/in/khushi-saraswat1/",
    icon: <FaLinkedin />,
  },
];
