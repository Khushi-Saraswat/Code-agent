"use client";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
  data: any;
}

const SearchInput = ({ disabled, data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
        <Input
          placeholder="Search products..."
          className="pl-8"
          disabled={disabled}
        />
      </div>

      {/* view all categories btn */}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
