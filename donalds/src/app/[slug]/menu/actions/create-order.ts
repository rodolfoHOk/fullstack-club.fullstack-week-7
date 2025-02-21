"use server";

import { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export async function createOrder(input: CreateOrderInput) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  const total = productsWithPricesAndQuantities.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      restaurantId: restaurant.id,
      status: "PENDING",
      total,
    },
  });

  revalidatePath(`/${input.slug}/orders`);
  redirect(
    `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`,
  );
}
