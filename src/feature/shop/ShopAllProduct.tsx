"use client";

import { useState } from "react";
import { ShoppingCart, ArrowRight, Star, Heart } from "lucide-react";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/redux/api/product/productApi";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { useAddToWishlistMutation } from "@/redux/api/wishlist/wishlistApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product, Pagination } from "@/interfaces/product";
import PaginationComponent from "@/components/shared/pagination/Pagination";
import { toast } from "sonner";

const PLACEHOLDER_IMAGE = "/images/hero1.png";

interface ShopAllProductProps {
  filters: {
    categoryId?: string;
    subCategoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy: string;
    order: "asc" | "desc";
  };
  onFilterChange: (newFilters: any) => void;
  data: { data?: Product[]; meta?: { pagination: Pagination } } | undefined;
  isLoading: boolean;
  isError: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

export function ShopAllProduct({
  filters,
  onFilterChange,
  data,
  isLoading,
  isError,
  page,
  onPageChange
}: ShopAllProductProps) {
  const products: Product[] = data?.data || [];
  const pagination: Pagination | undefined = data?.meta?.pagination;

  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const isLoggedIn = !!useSelector((state: RootState) => state.user?.token);
  const guestCartId = useSelector((state: RootState) => state.cart?.guestCartId);

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    try {
      const payload: { productId: string; quantity: number; guestCartId?: string } = {
        productId: product.id,
        quantity: 1,
      };
      if (guestCartId) payload.guestCartId = guestCartId;
      await addToCart(payload).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist.");
      return;
    }
    try {
      await addToWishlist(productId).unwrap();
      toast.success("Added to wishlist!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to wishlist.");
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">
              Failed to load products. Please try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No products found.</p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-10">
              {products.map((product) => {
                const displayImage = product.featuredImage || PLACEHOLDER_IMAGE;
                const isExternalImage = displayImage.startsWith("http");
                const displayPrice =
                  product.discountPrice > 0
                    ? product.discountPrice
                    : product.price;
                const originalPrice =
                  product.discountPrice > 0 ? product.price : null;

                // Rating — use avgRating if available, else derive from reviews
                const ratingValue =
                  product.avgRating && product.avgRating > 0
                    ? product.avgRating.toFixed(1)
                    : product._count.reviews > 0
                      ? Math.min(5, 4 + product._count.reviews * 0.05).toFixed(
                        1,
                      )
                      : null;

                const stockLabel =
                  product.stock > 1000
                    ? `${(product.stock / 1000).toFixed(1)}K`
                    : `${product.stock}`;

                return (
                  <Link
                    href={`/shop/${product.id}`}
                    key={product.id}
                    className="group cursor-pointer block"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square bg-[#f3f4f0] rounded-xl overflow-hidden mb-4 transition-all duration-300">
                      {isExternalImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              PLACEHOLDER_IMAGE;
                          }}
                        />
                      ) : (
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}

                      {/* Featured Badge */}
                      {product.isFeatured && (
                        <div className="absolute top-3 left-3 bg-[#1a5c96] text-white text-[9px] font-bold py-1 px-2.5 rounded-full shadow">
                          HOT
                        </div>
                      )}

                      {/* New Arrival Badge */}
                      {product.isNewArrival && (
                        <div className="absolute top-3 right-3 bg-[#4a6741] text-white text-[9px] font-bold py-1 px-2.5 rounded-full shadow">
                          NEW
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleAddToWishlist(e, product.id)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100"
                        title="Add to Wishlist"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>

                      {/* Out of Stock Overlay */}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center rounded-xl">
                          <span className="bg-white text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Hover Action Buttons */}
                      {product.stock > 0 && (
                        <div className="absolute bottom-4 left-0 right-0 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="flex-1 bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap"
                          >
                            <ArrowRight className="w-3.5 h-3.5 rotate-45" />{" "}
                            Compare
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="text-center px-1">
                      {/* Rating & Stock */}
                      <div className="flex items-center justify-center gap-1 mb-1.5">
                        <Star className="w-3 h-3 fill-[#FBBC05] text-[#FBBC05]" />
                        <span className="text-[11px] font-bold text-gray-700">
                          {ratingValue ?? "New"}
                        </span>
                        <span className="text-[11px] text-gray-300 mx-1">
                          |
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500">
                          {stockLabel} in stock
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-1 leading-tight line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Category */}
                      <p className="text-[10px] text-gray-400 mb-2">
                        {product.category?.name}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-center gap-2">
                        {originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">
                            {originalPrice} TK.
                          </span>
                        )}
                        <span className="text-[14px] font-bold text-[#4a6741]">
                          {displayPrice} TK.
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-14">
                <PaginationComponent
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={(newPage) => {
                    onPageChange(newPage);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}

            {/* Load More — fallback যদি totalPages <= 1 কিন্তু hasNext true হয় */}
            {pagination && pagination.totalPages <= 1 && pagination.hasNext && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => onPageChange(page + 1)}
                  className="bg-[#4a6741] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#3d5435] transition-all shadow-md group"
                >
                  Load More{" "}
                  <ArrowRight className="w-4 h-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Total count info */}
            {pagination && (
              <p className="text-center text-xs text-gray-400 mt-6">
                Showing {products.length} of {pagination.total} products
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
