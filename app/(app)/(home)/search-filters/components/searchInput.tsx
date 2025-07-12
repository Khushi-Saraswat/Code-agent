import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

interface Props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
        <Input
          placeholder="Search products..."
          className="pl-8"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SearchInput;
