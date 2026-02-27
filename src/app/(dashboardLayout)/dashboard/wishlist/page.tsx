"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Heart,
    ShoppingCart,
    Trash2,
    RefreshCcw,
    ChevronRight,
    Loader2
} from "lucide-react";
import {
    useGetWishlistQuery,
    useRemoveFromWishlistMutation
} from "@/redux/api/wishlist/wishlistApi";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { toast } from "sonner";

const WishlistPage = () => {
    const { data: wishlistData, isLoading, isError } = useGetWishlistQuery();
    const [removeFromWishlist] = useRemoveFromWishlistMutation();
    const [addToCart] = useAddToCartMutation();

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && items) {
            setSelectedItems(items.map((item: any) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleRemove = async (productId: string) => {
        try {
            await removeFromWishlist(productId).unwrap();
            toast.success("Removed from wishlist");
        } catch (err) {
            toast.error("Failed to remove item");
        }
    };

    const handleAddToCart = async (productId: string) => {
        try {
            await addToCart({ productId, quantity: 1 }).unwrap();
            await removeFromWishlist(productId).unwrap();
            toast.success("Added to cart and removed from wishlist");
        } catch (err) {
            toast.error("Failed to add to cart");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !wishlistData) {
        return (
            <div className="flex h-[400px] flex-col items-center justify-center gap-4">
                <Heart className="h-12 w-12 text-gray-300" />
                <p className="text-gray-500">Your wishlist is empty or could not be loaded.</p>
            </div>
        );
    }

    const items = wishlistData?.data?.items || [];

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
            </div>

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="select-all"
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        onChange={handleSelectAll}
                        checked={selectedItems.length === items.length && items.length > 0}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Select {selectedItems.length}/{items.length}
                    </label>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        Add to Cart
                    </button>
                    <button className="text-sm font-semibold text-gray-500 hover:text-gray-600 transition-colors">
                        Compare
                    </button>
                    <button className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                        Remove
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                        No items in your wishlist.
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/10 transition-all duration-300"
                        >
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                            />

                            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                {item.product.featuredImage ? (
                                    <Image
                                        src={item.product.featuredImage}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="p-1 rounded bg-gray-50">
                                        <Image src="/apple-logo.svg" alt="Brand" width={16} height={16} className="opacity-40" />
                                    </span>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
                                    {item.product.name}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span>Storage: {item.product.storage || "N/A"}</span>
                                    <span>Color: {item.product.color || "N/A"}</span>
                                </div>
                                <div className="mt-2 text-lg font-bold text-blue-600">
                                    ৳{item.product.price.toLocaleString()}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleAddToCart(item.productId)}
                                    className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                                    title="Add to Cart"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                </button>
                                <button
                                    className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-200 transition-all duration-300"
                                    title="Compare"
                                >
                                    <RefreshCcw className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleRemove(item.productId)}
                                    className="p-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                                    title="Remove"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
