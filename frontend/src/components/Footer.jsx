import { FaGithub, FaLinkedin, FaUserCircle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const footerData = [
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

  return (
    <footer className="w-full bg-gray-800 text-white px-6 py-4 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src="/logo.png" alt="logo" className="h-10 w-auto" />
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400">
          © 2025 All Rights Reserved — Developed by{" "}
          <span className="text-white">Abdul Ali</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          {footerData.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
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
