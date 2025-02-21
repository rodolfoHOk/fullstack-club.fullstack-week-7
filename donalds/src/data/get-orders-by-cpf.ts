import { removeCpfPunctuation } from '@/app/[slug]/menu/helpers/cpf';
import { db } from '@/lib/prisma';

export async function getOrdersByCpf(cpf: string) {
  return await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
}
