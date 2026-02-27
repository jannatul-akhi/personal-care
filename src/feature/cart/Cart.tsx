"use client";

import React from "react";
import { Trash2, Truck, ShoppingBag } from "lucide-react";
import Shipment from "@/components/shared/shipment/Shipment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "@/redux/api/cart/cartApi";
import { toast } from "sonner";
import Image from "next/image";

const PLACEHOLDER = "/images/hero1.png";

const Cart = () => {
  const router = useRouter();

  const isLoggedIn = !!useSelector((state: RootState) => state.user?.token);
  const guestCartId = useSelector(
    (state: RootState) => state.cart?.guestCartId
  );

  // Fetch cart — logged-in: JWT, guest: guestCartId query param
  const { data, isLoading, isError } = useGetCartQuery(
    { guestCartId, isLoggedIn },
    { refetchOnMountOrArgChange: true }
  );

  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const cartItems = data?.data?.items ?? [];

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      await updateCartItem({
        productId,
        quantity,
        ...(guestCartId ? { guestCartId } : {}),
      }).unwrap();
    } catch {
      toast.error("Quantity update failed.");
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeCartItem({
        productId,
        ...(guestCartId ? { guestCartId } : {}),
      }).unwrap();
      toast.success("Item removed from cart.");
    } catch {
      toast.error("Failed to remove item.");
    }
  };

  const getPrice = (item: (typeof cartItems)[0]) => {
    const p = item.product;
    return p.discountPrice > 0 ? p.discountPrice : p.price;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => `৳${price.toLocaleString("en-IN")}`;

  const handleCheckout = () => router.push("/checkout");

  // ── Loading ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <svg
            className="animate-spin w-10 h-10"
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
          <p className="text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">Failed to load cart. Please refresh.</p>
      </div>
    );
  }

  // ── Empty Cart ───────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900">Shopping Cart</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-500">Checkout</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-500">Complete Order</span>
            </nav>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Add some products to get started!
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        <Shipment />
      </div>
    );
  }

  // ── Main Cart ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900">Shopping Cart</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Checkout</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Complete Order</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart Items ── */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Total Items ({totalItems})
            </h2>

            <div className="space-y-6">
              {cartItems.map((item) => {
                const price = getPrice(item);
                const originalPrice =
                  item.product.discountPrice > 0 ? item.product.price : null;
                const imgSrc = item.product.featuredImage || PLACEHOLDER;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                      {imgSrc.startsWith("http") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imgSrc}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER;
                          }}
                        />
                      ) : (
                        <Image
                          src={imgSrc}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            {item.product.name}
                          </h3>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  Math.min(
                                    item.product.stock,
                                    item.quantity + 1
                                  )
                                )
                              }
                              disabled={item.quantity >= item.product.stock}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {/* Delete */}
                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Price */}
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-900">
                              {formatPrice(price * item.quantity)}
                            </span>
                            {originalPrice && (
                              <p className="text-xs text-gray-400 line-through">
                                {formatPrice(originalPrice * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
                <span className="text-sm text-gray-500">{totalItems} Items</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coupon Discount</span>
                  <button className="text-gray-900 font-medium underline hover:no-underline">
                    Apply Coupon
                  </button>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated total</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded transition-colors mb-6"
              >
                Proceed To Checkout
              </button>

              {/* Payment Methods */}
              <div className="mb-6">
                <p className="text-xs text-gray-600 mb-3">
                  We Using Safe Payment For
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                    AMEX
                  </div>
                  <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-4 w-6" viewBox="0 0 24 16" fill="#EB001B">
                      <circle cx="7" cy="8" r="7" />
                      <circle
                        cx="17"
                        cy="8"
                        r="7"
                        fill="#F79E1B"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                  <div className="h-6 px-2 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-pink-500">
                    bKash
                  </div>
                </div>
              </div>

              {/* Policy Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Return &amp; Refund Policy:
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Within 45 Days of Purchase
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm shrink-0">⊕</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Security &amp; Privacy
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      We protect your privacy and keep your personal details
                      safe and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <Shipment />
      </div>
    </div>
  );
};

export default Cart;
