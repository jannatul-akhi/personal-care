"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContactSection } from "@/feature/features/ContactSection";
import { ShopAllProduct } from "@/feature/shop/ShopAllProduct";
import { ShopAllProductBanner } from "@/feature/shop/ShopAllProductBanner";
import { ShopAllProductNavbar } from "@/feature/shop/ShopAllProductNavbar";
import { useGetAllProductsQuery } from "@/redux/api/product/productApi";

const ShopContent = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: undefined as string | undefined,
    categoryId: undefined as string | undefined,
    subCategoryId: undefined as string | undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    minRating: undefined as number | undefined,
    sortBy: "createdAt",
    order: "desc" as "asc" | "desc",
  });

  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  useEffect(() => {
    if (categorySlug) {
      setFilters((prev) => ({ ...prev, category: categorySlug }));
      setPage(1);
    }
  }, [categorySlug]);

  const { data: productResponse, isLoading, isError } = useGetAllProductsQuery({
    page,
    limit: 12,
    ...filters,
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page on filter change
  };

  const totalProducts = productResponse?.meta?.pagination?.total || 0;

  return (
    <div className="min-h-screen bg-white">
      <main>
        <ShopAllProductBanner />
        <ShopAllProductNavbar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalProducts={totalProducts}
        />
        <ShopAllProduct
          filters={filters}
          onFilterChange={handleFilterChange}
          data={productResponse}
          isLoading={isLoading}
          isError={isError}
          page={page}
          onPageChange={setPage}
        />
        <ContactSection />
      </main>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default Page;
