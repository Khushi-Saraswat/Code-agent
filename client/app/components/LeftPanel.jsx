import prism from "prismjs";
import Editor from "react-simple-code-editor";
import { FaCopy } from "react-icons/fa";

const LeftPanel = ({ code, setCode, reviewCode, loading }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Code copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <section className="w-full md:w-1/2 flex flex-col bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <header className="text-lg font-semibold p-4 border-b border-gray-800 bg-gray-800 sticky top-0 z-10 flex justify-between items-center">
        <span>Code Editor</span>
        <button
          onClick={() => copyToClipboard(code)}
          className="text-gray-400 hover:text-white"
        >
          <FaCopy />
        </button>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={16}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            minHeight: "300px",
          }}
        />
      </div>
      <div className="p-3 border-t border-gray-800 bg-gray-800 flex items-end justify-end">
        <button
          onClick={reviewCode}
          disabled={loading}
          className={`w-full md:w-auto bg-blue-500 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 transition flex items-center justify-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : null}
          {loading ? "Reviewing..." : "Review Code"}
        </button>
      </div>
    </section>
  );
};

export default LeftPanel;
