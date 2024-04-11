import { useState } from "react";
import NewsList from "./Components/NewsList";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
  };

  // Array of categories
  const categories = [
    { name: "World", value: "world" },
    { name: "Business", value: "business" },
    { name: "Technology", value: "technology" },
    { name: "Sports", value: "sports" },
    { name: "Entertainment", value: "entertainment" },
  ];

  return (
    <>
      {/* <nav className="sticky top-0 z-50 bg-gray-100 p-4 mb-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="font-bold text-xl">
            News App
          </a>

          <button
            className="block lg:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
            </svg>
          </button>

          <div className="hidden lg:flex space-x-4">
            <div
              onClick={() => setShowCategories(!showCategories)}
              className="relative"
            >
              <button className="py-2 px-4 rounded bg-blue-500 text-white">
                Categories
              </button>

              {showCategories && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded">
                  <ul className="py-1">
                    {categories.map((cat) => (
                      <li key={cat.value}>
                        <button
                          className="block w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
                          onClick={() => handleCategoryClick(cat.value)}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-400 py-2 px-4 rounded-l"
                name="search"
              />
              <button className="py-2 px-4 bg-blue-500 text-white rounded-r">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav> */}

      <Navbar
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        handleSearch={handleSearch}
        handleCategoryClick={handleCategoryClick}
      />
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="">
            {/* <div className="md:w-1/3"> */}
            <h5 className="text-xl font-semibold mb-2">Categories</h5>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={() => handleCategoryClick(cat.value)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            {/* <div className="md:w-2/3"> */}
            <NewsList category={category} searchTerm={searchTerm} />
          </div>
        </div>
      </div>

      {/* <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <h5 className="text-xl font-semibold mb-2">Categories</h5>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={() => handleCategoryClick(cat.value)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <NewsList category={category} searchTerm={searchTerm} />
          </div>
        </div>
      </div> */}
    </>
  );
}

export default App;
