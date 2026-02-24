"use client";

import React, { useState } from "react";
import {
  Heart,
  Trash2,
  Truck,
  Headphones,
  RotateCcw,
  Gift,
} from "lucide-react";
import Shipment from "@/components/shared/shipment/Shipment";

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "New York Yankees Essential Black Cap",
      color: "Brown",
      size: "Free Size",
      quantity: 2,
      price: 2154,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "New York Yankees Essential Black Cap",
      color: "Brown",
      size: "Free Size",
      quantity: 2,
      price: 28846,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "New York Yankees Essential Black Cap",
      color: "Brown",
      size: "Free Size",
      quantity: 2,
      price: 4654,
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&h=200&fit=crop",
    },
  ]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString("en-IN")}`;
  };

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
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Total Items
            </h2>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Color:</span>{" "}
                          {item.color}
                          <span className="mx-2"></span>
                          <span className="font-medium">Size:</span> {item.size}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {/* Wishlist & Delete */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                              wishlist.includes(item.id)
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            <Heart
                              className="w-4 h-4"
                              fill={
                                wishlist.includes(item.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
                <span className="text-sm text-gray-500">
                  {totalItems} Items
                </span>
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
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded transition-colors mb-6">
                Proceed To Checkout
              </button>

              {/* Payment Methods */}
              <div className="mb-6">
                <p className="text-xs text-gray-600 mb-3">
                  We Using Safe Payment For
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Payment Icons */}
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
                  <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-4 w-6" viewBox="0 0 48 16" fill="#1A1F71">
                      <path d="M17.6 1.6l-3.6 8.6h2.2l.5-1.4h3l.5 1.4h2.4L19.2 1.6h-1.6zm.8 2l1 2.6h-2l1-2.6zm-7.4 6.2h2.2V1.6h-2.2v8.6zm-3.2-8.6l-2 5.4-2.2-5.4H1.6l3.6 8.6h2.4l3.6-8.6H8.8zM42.8 4c0-.8-.6-1.2-1.6-1.2-.6 0-1.4.2-1.8.6l-.4-1.4c.6-.4 1.6-.6 2.6-.6 2.2 0 3.4 1 3.4 2.8 0 1.2-.4 2-1.4 3l-1.2 1c-.4.4-.6.6-.6 1h3.4v1.6h-5.6c0-1.2.4-2 1.6-3.2l1.2-1c.4-.4.6-.8.6-1.6z" />
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
                  <span className="text-gray-400 text-sm">⊕</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Return & Refund Policy:
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Within 45 Days of Purchase
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-sm">⊕</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Security & Privacy
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
