"use client";

import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGetTopRatedProductsQuery } from "@/redux/api/product/productApi";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/interfaces/product";
import { toast } from "sonner";

const PLACEHOLDER_IMAGE = "/images/hero1.png";

export function TopRatedProducts() {
  const { data, isLoading, isError } = useGetTopRatedProductsQuery(undefined);
  const products: Product[] = data?.data || [];

  const [addToCart] = useAddToCartMutation();
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-4">
            Top Rated Product
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 lg:gap-x-8">
            {[...Array(8)].map((_, i) => (
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
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">
              Failed to load products. Please try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No top rated products available.</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 lg:gap-x-8">
            {products.map((product) => {
              const displayImage = product.featuredImage || PLACEHOLDER_IMAGE;
              const displayPrice =
                product.discountPrice > 0
                  ? product.discountPrice
                  : product.price;
              const originalPrice =
                product.discountPrice > 0 ? product.price : null;
              const isExternalImage = displayImage.startsWith("http");

              // Rating: use review count to derive a score, min 4.0
              const rating =
                product._count.reviews > 0
                  ? Math.min(5, 4 + product._count.reviews * 0.05).toFixed(1)
                  : "New";

              // Stock display
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
                  {/* Image Box */}
                  <div className="relative aspect-square bg-[#f3f4f0] rounded-xl overflow-hidden mb-4 transition-all duration-300">
                    {isExternalImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={displayImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            PLACEHOLDER_IMAGE;
                        }}
                      />
                    ) : (
                      <img
                        src={displayImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* New Arrival Badge */}
                    {product.isNewArrival && (
                      <div className="absolute top-3 left-3 bg-[#4a6741] text-white text-[9px] font-bold py-1 px-2.5 rounded-full shadow">
                        NEW
                      </div>
                    )}

                    {/* Out of Stock overlay */}
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
                          className="bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-medium flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap"
                        >
                          <ShoppingCart className="w-3 h-3" /> Add to Cart
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-medium flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap"
                        >
                          <ArrowRight className="w-3 h-3 rotate-45" /> Compare
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="text-center px-1">
                    {/* Rating & Stock */}
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-700">
                        {rating}
                      </span>
                      <span className="text-xs text-gray-300 mx-1">|</span>
                      <span className="text-xs text-gray-600">
                        {stockLabel} in stock
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Category */}
                    <p className="text-[10px] text-gray-400 mb-2">
                      {product.category?.name}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-center gap-1.5">
                      {originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {originalPrice} TK.
                        </span>
                      )}
                      <span className="text-sm font-bold text-[#4a6741]">
                        {displayPrice} TK.
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#4a6741] text-white rounded-md font-bold hover:bg-[#3d5435] transition-colors shadow-md"
          >
            See All Items <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
