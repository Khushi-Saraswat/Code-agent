import AllCategories from "./components/AllCategories";
import SearchInput from "./components/searchInput";

const SearchFilters = ({ data }: any) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <AllCategories data={data} />
      </div>
    </div>
  );
};

export default SearchFilters;
