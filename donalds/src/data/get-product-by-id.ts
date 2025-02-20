import { db } from '@/lib/prisma';

export async function getProductById(id: string) {
  return await db.product.findUnique({
    where: { id },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });
}
