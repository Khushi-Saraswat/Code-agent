function CustomPagination(props) {
    const { currentPage, totalPages, onPageChange } = props;
  
    const handlePageClick = (pageNumber) => {
      onPageChange(pageNumber);
    };
  
    const renderPageItems = () => {
      const pageItems = [];
  
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <button
            key={i}
            className={`py-2 px-4 rounded ${
              i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
  
      return pageItems;
    };
  
    return (
      <div className="flex justify-center mt-4">
        <button
          className={`py-2 px-4 rounded mr-2 ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageItems()}
        <button
          className={`py-2 px-4 rounded ml-2 ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  }
  
  export default CustomPagination;
  