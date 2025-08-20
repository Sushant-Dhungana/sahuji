import { Category } from "@/payload-types";
import { CustomCategory } from "../types";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
interface Props {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
  position: { top: number; left: number };
}

export const SubCategoryMenu = ({ category, isOpen, position }: Props) => {
  console.log("SubCategoryMenu Props:", { category, isOpen, position });
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#f5f5f5";

  return (
    <div
      className="fixed z-100 bg-white shadow-lg rounded-md p-2"
      style={{ top: position.top, left: position.left, backgroundColor }}
    >
      {/* invisible bridge to prevent flickering */}
      <div className="h-3 w-60  " />
      <div
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] -translate-x-[2px] -translate-y-[2px]"
        style={{ backgroundColor }}
      >
        {category.subcategories.map((subcategory: Category) => (
          <Link
            key={subcategory.slug}
            href={`/${category.slug}/${subcategory.slug}`}
            className=" w-full text-left p-2 hover:bg-gray-200 cursor-pointer justify-between flex items-center text-sm font-medium"
          >
            {subcategory.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
