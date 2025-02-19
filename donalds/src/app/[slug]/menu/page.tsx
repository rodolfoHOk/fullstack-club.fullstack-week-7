import { notFound } from "next/navigation";

import { getRestaurantBySlugWithMenuCategoriesAndProducts } from "@/data/get-restaurant-by-slug-with-menu-categories-and-products";
import { isConsumptionMethodValid } from "@/data/is-consumption-method-valid";

import { RestaurantHeader } from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant =
    await getRestaurantBySlugWithMenuCategoriesAndProducts(slug);
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
}
