import { Category } from "@/payload-types";
import { ca } from "date-fns/locale";
import Link from "next/link";
import React from "react";

interface Props {
  category: any;
  isOpen: boolean;
  position: { top: any; left: any };
}

const SubcategoryMenu = ({ category, isOpen, position }: any) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      {/* invisible bridge to maintain hover */}
      <div className="h-3 w-60" />

      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category.subcategories?.map((subCategory: Category) => (
            <Link
              key={subCategory.slug}
              href="/"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-between underline font-medium"
            >
              {subCategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryMenu;
