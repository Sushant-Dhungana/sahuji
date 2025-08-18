import { SearchIcon } from "lucide-react";

interface Props {
  disabled?: boolean;
}
export const SearchInput = ({ disabled }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-800" />
        <input
          type="text"
          className="border p-2 rounded w-full pl-8 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          disabled={disabled}
        />
      </div>
    </div>
  );
};
