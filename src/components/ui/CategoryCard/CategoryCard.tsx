"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import type { ICategory } from "@/shared/interface/category.interface";
import Card from "../Card";

type Props = {
  item: ICategory;
};

const CategoryCard: React.FC<Props> = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${ROUTES.products.create()}?category=${item.id}`);
  };

  return (
    <Card
      key={item.id}
      title={item.title}
      subtitle={item.documentId}
      image={item.image.formats.small.url}
      onClick={handleClick}
    />
  );
};

export default CategoryCard;
