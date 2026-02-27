"use client";

import { useState } from "react";
import {
  Star,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Truck,
  Zap,
  MapPin,
  Maximize2,
  Home,
  ChevronRight,
  ArrowUpRight,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/api/product/productApi";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { Product } from "@/interfaces/product";

const PLACEHOLDER_IMAGE = "/images/hero1.png";

export function ShopSingleProduct() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useGetSingleProductQuery(id, {
    skip: !id,
  });

  const product: Product | undefined = data?.data;

  const isLoggedIn = !!useSelector((state: RootState) => state.user?.token);
  const guestCartId = useSelector(
    (state: RootState) => state.cart?.guestCartId,
  );
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "description",
  );
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = async () => {
    if (!product || !inStock) return;
    try {
      const payload: {
        productId: string;
        quantity: number;
        guestCartId?: string;
      } = {
        productId: product.id,
        quantity,
      };
      // Only add guestCartId if guest AND it exists (valid UUID)
      if (guestCartId) payload.guestCartId = guestCartId;
      await addToCart(payload).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error("Failed to add to cart. Please try again.");
    }
  };


  const toggleAccordion = (accordionId: string) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
  };

  // Build image list — featuredImage first, then images array
  const productImages = product
    ? [
      product.featuredImage || PLACEHOLDER_IMAGE,
      ...(product.images || []),
    ].filter(Boolean)
    : [PLACEHOLDER_IMAGE, "/images/skin1.png", "/images/skin2.png"];

  // Prices
  const displayPrice = product
    ? product.discountPrice > 0
      ? product.discountPrice
      : product.price
    : 0;
  const originalPrice =
    product && product.discountPrice > 0 ? product.price : null;

  // Rating
  const avgRating =
    product?.avgRating && product.avgRating > 0
      ? product.avgRating.toFixed(1)
      : product?._count?.reviews
        ? Math.min(5, 4 + product._count.reviews * 0.05).toFixed(1)
        : null;

  const reviewCount = product?._count?.reviews || 0;

  // Stock status
  const inStock = product ? product.stock > 0 : false;
  const stockCount = product?.stock || 0;

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 animate-pulse">
          <div className="lg:col-span-4 space-y-4">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-gray-200 rounded-2xl h-80" />
          </div>
        </div>
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────────────────────────────
  if (isError || !product) {
    return (
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-gray-400">
        <p className="text-xl font-semibold mb-2">Product not found</p>
        <p className="text-sm">
          The product you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  // ─── Main ───────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
        <Home className="w-3.5 h-3.5" />
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="hover:text-gray-700 cursor-pointer">Shop Page</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* ── Left: Image Gallery (4 cols) ── */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative aspect-square bg-[#f3f4f0] rounded-2xl overflow-hidden group">
            {productImages[activeImage]?.startsWith("http") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={productImages[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
            ) : (
              <Image
                src={productImages[activeImage] || PLACEHOLDER_IMAGE}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            )}
            <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>

            {/* Status badges on image */}
            {product.isFeatured && (
              <div className="absolute top-4 left-4 bg-[#1a5c96] text-white text-[10px] font-bold py-1 px-2.5 rounded-full">
                HOT
              </div>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center rounded-2xl">
                <span className="bg-white text-gray-700 text-sm font-bold px-4 py-2 rounded-full">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {productImages.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx
                  ? "border-[#4a6741]"
                  : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              >
                {img?.startsWith("http") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                ) : (
                  <Image
                    src={img}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Center: Product Details (5 cols) ── */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Category */}
            <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
              {product.category?.name}
            </p>

            {/* Name */}
            <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${avgRating && i < Math.round(Number(avgRating))
                      ? "fill-[#FBBC05] text-[#FBBC05]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
                {avgRating && (
                  <span className="text-lg font-bold text-gray-900 ml-1">
                    {avgRating}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-400">
                ({reviewCount > 0 ? `${reviewCount} Reviews` : "No reviews yet"}
                )
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[15px] text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Short description if available */}
          {product.shortDescription && (
            <p className="text-sm text-gray-500 italic">
              {product.shortDescription}
            </p>
          )}

          {/* Brand / SKU */}
          <div className="flex flex-wrap gap-4 text-sm font-bold">
            <span>
              <span className="text-gray-500 font-normal">Category: </span>
              <span className="text-gray-900">{product.category?.name}</span>
            </span>
            <span>
              <span className="text-gray-500 font-normal">SKU: </span>
              <span className="text-gray-900">{product.sku}</span>
            </span>
          </div>

          {/* Banner Offer — unchanged as requested */}
          <div className="relative bg-gradient-to-r from-[#A83D9E] to-[#6A217A] rounded-xl px-6 py-4 text-white overflow-hidden flex items-center justify-between">
            <div>
              <p className="text-xl font-bold mb-1 italic">First Order?</p>
              <p className="text-sm opacity-90">Enjoy an Exclusive Discount!</p>
            </div>
            <div className="relative z-10 text-right">
              <div className="bg-[#FBBC05] text-[#6A217A] text-[10px] font-bold px-2 py-0.5 rounded absolute -top-2 right-0 transform rotate-[10deg]">
                GET UPTO
              </div>
              <p className="text-4xl font-black">
                20% <span className="text-xl">OFF</span>
              </p>
              <p className="text-[10px] font-bold tracking-widest mt-1">
                SPECIAL OFFER
              </p>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-3">
            {[
              {
                id: "description",
                label: "Product Description",
                content: product.description,
              },
              {
                id: "how-to-use",
                label: "How To Use",
                content:
                  "Apply a small amount to cleansed skin. Gently massage in circular motions. Use twice daily for best results.",
              },
              {
                id: "shipping",
                label: "Shipping Details",
                content:
                  "We offer standard and express delivery options. Orders placed before 2 PM are typically processed the same day.",
              },
              {
                id: "return",
                label: "Return Policy",
                content:
                  "If you are not satisfied, return within 30 days for a full refund or exchange. Product must be unused and in original packaging.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-100 last:border-0"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="font-serif font-bold text-[#1a1a1a] group-hover:text-[#4a6741] transition-colors">
                    {item.label}
                  </span>
                  {activeAccordion === item.id ? (
                    <ChevronUp className="w-4 h-4 text-[#4a6741]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {activeAccordion === item.id && (
                  <div className="pb-4 text-[14px] text-gray-500 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Purchase Card (3 cols) ── */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {displayPrice} TK
              </span>
              {originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  {originalPrice} TK.
                </span>
              )}
              {originalPrice && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save {originalPrice - displayPrice} TK
                </span>
              )}
            </div>

            {/* Delivery Options */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Delivered to</span>
                <button className="text-[#4a6741] font-bold hover:underline">
                  Change
                </button>
              </div>
              <div className="flex gap-3 text-[13px] text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span>2558 Hardman Road, Vermont, South Burlington, USA</span>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border-2 border-[#4a6741]">
                  <input
                    type="radio"
                    name="delivery"
                    className="w-4 h-4 text-[#4a6741] focus:ring-[#4a6741]"
                    defaultChecked
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <div className="flex items-center gap-2 font-bold text-gray-900">
                        <Truck className="w-4 h-4" /> Normal Delivery
                      </div>
                      <span className="font-bold">৳120</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Within 2/3 Days</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent">
                  <input
                    type="radio"
                    name="delivery"
                    className="w-4 h-4 text-[#4a6741] focus:ring-[#4a6741]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <div className="flex items-center gap-2 font-bold text-gray-900">
                        <Zap className="w-4 h-4" /> Express Delivery
                      </div>
                      <span className="font-bold">৳180</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Within 12 Hours</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Size */}
            <div className="mb-4">
              <label className="text-sm font-bold text-gray-900 mb-2 block">
                Size:
              </label>
              <select
                className="w-full bg-gray-50 border-transparent rounded-xl p-3 text-sm font-medium focus:ring-0 cursor-pointer appearance-none"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="50ml">50ml</option>
                <option value="100ml">100ml</option>
                <option value="200ml">200ml</option>
              </select>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-[12px] mb-4">
              <div
                className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"
                  }`}
              />
              <span className={inStock ? "text-green-600" : "text-red-500"}>
                {inStock ? `${stockCount} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-bold text-gray-900 mb-2 block">
                Quantity:
              </label>
              <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1.5 w-max">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-white transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-gray-900 w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(stockCount, quantity + 1))
                  }
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-white transition-colors"
                  disabled={!inStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Adding...
                </span>
              ) : inStock ? (
                <>
                  Add To Cart <ShoppingCart className="w-5 h-5" />
                </>
              ) : (
                "Out of Stock"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Review Section — unchanged ── */}
      <div className="pt-16 border-t border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#1a1a1a]">
            Products Review
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-5xl font-bold text-gray-900">
                  {avgRating ?? "0"} out of 5
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${avgRating && i < Math.round(Number(avgRating))
                        ? "fill-[#FBBC05] text-[#FBBC05]"
                        : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">
                    ({reviewCount} Reviews)
                  </span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#4a6741] text-white rounded-full font-bold hover:bg-[#3d5435] transition-all">
                Write A Review <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Image Gallery */}
            <div>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-6">
                Image Gallery
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    {productImages[i % productImages.length]?.startsWith(
                      "http",
                    ) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={productImages[i % productImages.length]}
                        alt="Gallery"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            PLACEHOLDER_IMAGE;
                        }}
                      />
                    ) : (
                      <Image
                        src={
                          productImages[i % productImages.length] ||
                          PLACEHOLDER_IMAGE
                        }
                        alt="Gallery"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    {i === 7 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                        +{reviewCount}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">
                Reviews
              </h3>
              <button className="flex items-center gap-1 text-sm font-bold text-gray-600">
                Top reviews <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* No reviews yet */}
            {(!product.reviews || product.reviews.length === 0) && (
              <div className="text-center py-16 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                <Star className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold">No reviews yet</p>
                <p className="text-sm mt-1">
                  Be the first to review this product
                </p>
              </div>
            )}

            {/* Review Cards */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="space-y-8 max-h-[800px] overflow-y-auto pr-6">
                {product.reviews.map((review, idx) => (
                  <div
                    key={review.id || idx}
                    className="pb-8 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-600">
                            {review.userId?.[0]?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">
                            Verified Buyer
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < review.rating
                                  ? "fill-[#FBBC05] text-[#FBBC05]"
                                  : "fill-gray-200 text-gray-200"
                                  }`}
                              />
                            ))}
                            <span className="text-[11px] text-gray-400 font-bold ml-1">
                              ({review.rating})
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[12px] text-gray-400 font-medium flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9f9f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
