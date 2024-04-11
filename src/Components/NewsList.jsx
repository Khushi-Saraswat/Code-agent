// import { useState } from "react";
// import useNewsData from "../Hooks/useNewsData";
// import CustomPagination from "./CustomPagination";

// const NewsList = ({ category, searchTerm }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 4;

//   const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

//   const { newsData, loading, error } = useNewsData(category, searchTerm);

//   if (loading || error) {
//     return <div>{loading ? "Loading..." : error}</div>;
//   }

//   const totalArticles = newsData?.length;
//   const totalPages = Math.ceil(totalArticles / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentArticles = newsData.slice(startIndex, endIndex);

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {currentArticles?.map((article) => (
//           <div key={article.url}>
//             <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//               <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
//                 <img
//                   src={article.image}
//                   alt={article.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//                   {article.title}
//                 </h5>
//                 <p className="block font-sans overflow-y-auto	 text-base font-light leading-relaxed text-inherit antialiased">
//                   {article.description}
//                 </p>
//               </div>
//               <div className="p-6 pt-0">
//                 <a
//                   href={article.url}
//                   className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                   type="button"
//                   data-ripple-light="true"
//                 >
//                   Read More
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <CustomPagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={onPageChange}
//       />
//     </div>
//   );
// };

// export default NewsList;

import { useState } from "react";
import useNewsData from "../Hooks/useNewsData";
import CustomPagination from "./CustomPagination";

const NewsList = ({ category, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData, loading, error } = useNewsData(category, searchTerm);

  if (loading || error) {
    return <div>{loading ? "Loading..." : error}</div>;
  }

  const totalArticles = newsData?.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData?.slice(startIndex, endIndex);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentArticles?.map((article) => (
          <div key={article.url} className="card-wrapper">
            <div className="relative flex flex-col h-full rounded-xl bg-white bg-clip-border text-gray-700 shadow-md overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {article.title}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased overflow-y-auto">
                  {article?.description?.length > 100
                    ? article?.description?.slice(0, 100) + "..."
                    : article?.description}
                </p>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={article.url}
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-ripple-light="true"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default NewsList;
