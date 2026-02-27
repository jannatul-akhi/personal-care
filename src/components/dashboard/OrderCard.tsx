"use client";

import React from "react";
import Image from "next/image";
import {
    Package,
    CheckCircle2,
    Truck,
    Clock,
    XCircle,
    ChevronDown,
    ChevronUp,
    MapPin,
    CreditCard
} from "lucide-react";
import { Order } from "@/redux/api/order/orderApi";
import { cn } from "@/utils/cn";

interface OrderCardProps {
    order: Order;
    onCancel?: (id: string) => void;
    onReturn?: (id: string) => void;
    onReview?: (product: any) => void;
    showCancel?: boolean;
    showReturn?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
    order,
    onCancel,
    onReturn,
    onReview,
    showCancel = false,
    showReturn = false
}) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    const getStatusConfig = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return { icon: Clock, label: "Order Placed", color: "text-blue-600 bg-blue-50" };
            case "confirmed":
                return { icon: CheckCircle2, label: "Order Confirmed", color: "text-emerald-600 bg-emerald-50" };
            case "processing":
                return { icon: Package, label: "Packed", color: "text-orange-600 bg-orange-50" };
            case "shipped":
                return { icon: Truck, label: "Shipping", color: "text-blue-600 bg-blue-50" };
            case "delivered":
                return { icon: CheckCircle2, label: "Completed", color: "text-emerald-600 bg-emerald-50" };
            case "cancelled":
                return { icon: XCircle, label: "Cancelled", color: "text-red-600 bg-red-50" };
            default:
                return { icon: Package, label: status, color: "text-gray-600 bg-gray-50" };
        }
    };

    const statusConfig = getStatusConfig(order.status);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-md mb-6">
            {/* Order Header */}
            <div className="p-5 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Order id:</span>
                            <span className="text-sm font-bold text-gray-900">{order.orderNumber}</span>
                            <span className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider",
                                statusConfig.color
                            )}>
                                <statusConfig.icon className="h-3 w-3" />
                                {statusConfig.label}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <span className="text-sm text-gray-500">
                        Date: {new Date(order.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            </div>

            {isExpanded && (
                <div className="p-6 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content (Items & Summary) */}
                        <div className="lg:col-span-8">
                            <div className="mb-6">
                                <span className="text-sm font-semibold text-gray-900">Total {order.items.length} Items</span>
                            </div>

                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/30">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                                            {item.product.featuredImage && (
                                                <Image
                                                    src={item.product.featuredImage}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{item.product.name}</h4>
                                            <p className="text-xs text-gray-500 mb-2">
                                                Storage: {item.product.storage || "N/A"} &nbsp; Color: {item.product.color || "N/A"}
                                            </p>
                                            <div className="text-sm font-bold text-blue-600">
                                                ৳{(item.price).toLocaleString()} <span className="text-gray-400 font-normal">x {item.quantity}</span>
                                            </div>
                                            {order.status === "delivered" && onReview && (
                                                <button
                                                    onClick={() => onReview(item.product)}
                                                    className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                                                >
                                                    Write a Review
                                                </button>
                                            )}
                                        </div>
                                        <div className="text-sm font-bold text-gray-900 self-center">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Financial Summary */}
                            <div className="mt-8 pt-6 border-t border-dashed border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Sub Total</span>
                                        <span className="font-bold text-gray-900">৳{order.totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Discount</span>
                                        <span className="font-bold text-gray-900">৳{order.discountAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Tax</span>
                                        <span className="font-bold text-gray-900">৳{(order.taxAmount || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Delivery Charge</span>
                                        <span className="font-bold text-gray-900">৳{order.shippingAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="sm:border-l sm:pl-8 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xl font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-black text-gray-900">৳{order.grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar info */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-5 rounded-2xl border border-blue-50 bg-blue-50/20">
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">MJ</div>
                                        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Billing to</h5>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p className="font-bold text-gray-900">{order.billingAddress?.fullName}</p>
                                        <p>{order.billingAddress?.phone}</p>
                                        <p className="text-xs">{order.billingAddress?.addressLine1}, {order.billingAddress?.city}</p>
                                    </div>
                                </div>

                                <div className="mb-6 pt-6 border-t border-blue-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">ZK</div>
                                        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Delivery to</h5>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p className="font-bold text-gray-900">{order.shippingAddress?.fullName}</p>
                                        <p>{order.shippingAddress?.phone}</p>
                                        <p className="text-xs">{order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-blue-100">
                                    <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Payment Details</h5>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Payment Method</span>
                                            <span className="font-bold text-gray-900 flex items-center gap-1.5 uppercase">
                                                <CreditCard className="h-3.5 w-3.5" />
                                                {order.paymentMethod}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Payment Status</span>
                                            <span className={cn(
                                                "font-bold flex items-center gap-1",
                                                order.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"
                                            )}>
                                                {order.paymentStatus === "paid" && <CheckCircle2 className="h-3.5 w-3.5" />}
                                                {order.paymentStatus.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions in sidebar as per image */}
                                <div className="mt-8">
                                    {showCancel && order.status === "pending" && (
                                        <button
                                            onClick={() => onCancel?.(order.id)}
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline decoration-blue-200 underline-offset-4 transition-all"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                    {showReturn && order.status === "delivered" && (
                                        <button
                                            onClick={() => onReturn?.(order.id)}
                                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                        >
                                            Add to Return
                                        </button>
                                    )}
                                    <p className="mt-3 text-[11px] text-gray-400">
                                        Checkout <span className="text-blue-600 cursor-pointer">cancellation policy</span> before order cancelation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderCard;
