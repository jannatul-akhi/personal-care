"use client";

import { useState } from "react";
import { ContactSection } from "@/feature/features/ContactSection";
import { ShopAllProduct } from "@/feature/shop/ShopAllProduct";
import { ShopAllProductBanner } from "@/feature/shop/ShopAllProductBanner";
import { ShopAllProductNavbar } from "@/feature/shop/ShopAllProductNavbar";

const Page = () => {
  const [filters, setFilters] = useState({
    categoryId: undefined as string | undefined,
    subCategoryId: undefined as string | undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    minRating: undefined as number | undefined,
    sortBy: "createdAt",
    order: "desc" as "asc" | "desc",
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        <ShopAllProductBanner />
        <ShopAllProductNavbar
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <ShopAllProduct filters={filters} onFilterChange={handleFilterChange} />
        <ContactSection />
      </main>
    </div>
  );
};

export default Page;
