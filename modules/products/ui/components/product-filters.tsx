"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";

interface ProductFilterProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export const ProductFilter = ({
  title,
  className,
  children,
}: ProductFilterProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon;
  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="h-4 w-4" />
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };
  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        <button className="underline" onClick={() => {}} type="button">
          Clear
        </button>
      </div>
      <ProductFilter title="price">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
};
