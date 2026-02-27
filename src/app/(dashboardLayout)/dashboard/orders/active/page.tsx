"use client";

import React from "react";
import {
    Package,
    Loader2,
    Search
} from "lucide-react";
import {
    useGetMyOrdersByStatusQuery,
    useCancelOrderMutation
} from "@/redux/api/order/orderApi";
import OrderCard from "@/components/dashboard/OrderCard";
import { toast } from "sonner";

const ActiveOrdersPage = () => {
    // Active statuses: pending, confirmed, processing, shipped
    const { data: ordersData, isLoading, isError } = useGetMyOrdersByStatusQuery({
        status: "pending,confirmed,processing,shipped"
    });
    const [cancelOrder] = useCancelOrderMutation();

    const handleCancelOrder = async (orderId: string) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        try {
            await cancelOrder(orderId).unwrap();
            toast.success("Order cancelled successfully");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to cancel order");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (isError || !ordersData) {
        return (
            <div className="flex h-[400px] flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-gray-100">
                <Package className="h-12 w-12 text-gray-200" />
                <p className="text-gray-500 font-medium">No active orders found.</p>
            </div>
        );
    }

    const orders = ordersData.data;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Active Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage your ongoing orders.</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all w-full sm:w-64"
                    />
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                        <Package className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">You don't have any active orders right now.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            showCancel={true}
                            onCancel={handleCancelOrder}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActiveOrdersPage;
