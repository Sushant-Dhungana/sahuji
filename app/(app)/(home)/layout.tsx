import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Category } from "@/payload-types";

import Footer from "./footer";
import { Navbar } from "./Navbar";
import { SearchFilters } from "./search-filters";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, //load level of nested data populate sub categories
    pagination: false,

    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      //because of depth one we can infer "doc" will be a type of category
      ...(doc as Category),
    })),
  }));
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
