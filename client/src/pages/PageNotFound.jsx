import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <button
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          className="my-4 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
