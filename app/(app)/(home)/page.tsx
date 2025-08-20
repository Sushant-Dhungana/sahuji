"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Home() {
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions());
  return (
    <div>
      <h1>{JSON.stringify(categories.data, null, 2)}</h1>
    </div>
  );
}
