import { db } from "@/lib/prisma";

export async function getRestaurantBySlug(slug: string) {
  return await db.restaurant.findUnique({
    where: { slug },
  });
}
