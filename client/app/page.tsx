import Link from "next/link";
import Footer from "./components/Footer";
import { homeData } from "./constant/data";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white flex flex-col items-center justify-between overflow-hidden relative">
      {/* Particle Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.3),_transparent_70%)] animate-pulse-slow"></div>
      </div>

      <header className="text-center pt-16 sm:pt-20 lg:pt-28 pb-10 sm:pb-14 z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-gradient-shift">
          AI Code Reviewer
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
          Revolutionize your coding with AI-powered reviews, instant feedback,
          and seamless integration for unparalleled code quality.
        </p>
      </header>

      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mb-16 z-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
          Why AI Code Reviewer?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {homeData?.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none hover:ring focus:ring-blue-500 cursor-pointer"
              tabIndex={0}
              aria-label={`Feature: ${feature.title}`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-blue-300 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-tight">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mb-16 z-10">
        <Link
          href="/code-review"
          className="inline-block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white font-semibold text-lg py-3.5 px-8 sm:px-12 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
          aria-label="Start using AI Code Reviewer"
        >
          Code Smarter Now
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
