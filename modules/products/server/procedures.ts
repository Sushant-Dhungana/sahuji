import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod/v3";
import type { Where } from "payload";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });
        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            //because of depth one we can infer "doc" will be a type of category
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subCategories = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subCategories.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
        }
        where["category.slug"] = { in: parentCategory.slug, ...subCategories };
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, //load level of nested data populate categories and image
        where,
      });

      return data;
    }),
});
