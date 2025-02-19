import { db } from "@/lib/prisma";

export async function getRestaurantBySlugWithMenuCategoriesAndProducts(
  slug: string,
) {
  return await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });
}
