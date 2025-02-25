"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { validateImage } from "@/lib/validate-image";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const [coverImage, setCoverImage] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  function handleOrdersClick() {
    router.push(`/${slug}/orders`);
  }

  useEffect(() => {
    async function validateCoverImage() {
      const srcImage = await validateImage(
        restaurant.coverImageUrl,
        "/restaurant-cover.png",
      );
      setCoverImage(srcImage);
    }
    validateCoverImage();
  }, [restaurant]);

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      {coverImage && (
        <Image
          src={coverImage}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="fill"
          priority
        />
      )}

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
