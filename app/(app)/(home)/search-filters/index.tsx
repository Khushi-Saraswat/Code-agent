import AllCategories from "./components/AllCategories";
import SearchInput from "./components/searchInput";

const SearchFilters = ({ data }: any) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <AllCategories data={data} />
    </div>
  );
};

export default SearchFilters;
