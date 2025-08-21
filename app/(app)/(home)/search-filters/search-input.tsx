"use client";
import React from "react";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import CategoriesSidebar from "./categories-sidebar";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
}
export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <CategoriesSidebar
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-800" />
        <input
          type="text"
          className="border p-2 rounded w-full pl-8 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          disabled={disabled}
        />
      </div>
      <Button
        variant="elevated"
        className="size-12 shrink-0 pl-2 pr-2 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon size={30} />
      </Button>
      {session.data?.user && (
        <Button asChild variant="elevated">
          <Link href="/library">
            <BookmarkCheckIcon className="mr-2" />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};
