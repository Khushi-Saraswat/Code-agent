import React from "react";

// Array of categories
const categories = [
  { name: "World", value: "world" },
  { name: "Business", value: "business" },
  { name: "Technology", value: "technology" },
  { name: "Sports", value: "sports" },
  { name: "Entertainment", value: "entertainment" },
];

const Navbar = ({showCategories,setShowCategories,handleSearch,handleCategoryClick}) => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-100 p-4 mb-4">
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
    </nav>
  );
};

export default Navbar;
