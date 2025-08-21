import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
  activeCategoryName?: string | null;
  activeCategory?: string | null;
  activeSubcategoryName?: string | null;
}
const BreadcrumbNavigation = ({
  activeCategory,
  activeCategoryName,
  activeSubcategoryName,
}: Props) => {
  if (!activeCategoryName || activeCategory === "all") return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-sm font-medium underline text-primary"
              >
                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary font-medium text-sm">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-sm font-medium text-primary">
                {activeSubcategoryName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNavigation;
