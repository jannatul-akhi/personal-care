"use client";

import React, { useState } from "react";
import {
    CheckCircle2,
    Loader2,
    Search
} from "lucide-react";
import {
    useGetMyOrdersByStatusQuery
} from "@/redux/api/order/orderApi";
import OrderCard from "@/components/dashboard/OrderCard";
import ReviewModal from "@/components/dashboard/ReviewModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CompletedOrdersPage = () => {
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // Completed status: delivered
    const { data: ordersData, isLoading, isError } = useGetMyOrdersByStatusQuery({
        status: "delivered"
    });

    const handleReturnOrder = (orderId: string) => {
        toast.info("Return functionality requested for order " + orderId);
        // router.push(`/dashboard/returns/new?orderId=${orderId}`);
    };

    const handleOpenReview = (product: any) => {
        // Ensure product has an ID for the API
        // If the order item doesn't have the explicit productId, we might need to find it or pass it
        setSelectedProduct(product);
        setIsReviewModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (isError || !ordersData) {
        return (
            <div className="flex h-[400px] flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-gray-100">
                <CheckCircle2 className="h-12 w-12 text-gray-200" />
                <p className="text-gray-500 font-medium">No completed orders found.</p>
            </div>
        );
    }

    const orders = ordersData.data;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Completed Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Review your past purchases and transaction history.</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search past orders..."
                        className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 transition-all w-full sm:w-64"
                    />
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">You don't have any completed orders yet.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            showReturn={true}
                            onReturn={handleReturnOrder}
                            onReview={handleOpenReview}
                        />
                    ))}
                </div>
            )}

            {selectedProduct && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default CompletedOrdersPage;
