import baseApi from "../baseApi";

export type PaymentMethod = "cod" | "bkash" | "nagad" | "rocket" | "stripe" | "paypal" | "card";
export type DeliveryOption = "normal" | "express";

export interface PlaceOrderPayload {
    addressId: string;
    paymentMethod: PaymentMethod;
    deliveryOption: DeliveryOption;
    couponCode?: string;
    notes?: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: { name: string; featuredImage: string | null; storage?: string; color?: string };
}

export interface Order {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    deliveryOption: string;
    totalAmount: number;
    shippingAmount: number;
    discountAmount: number;
    grandTotal: number;
    taxAmount?: number;
    shippingAddress: any;
    billingAddress: any;
    notes?: string;
    items: OrderItem[];
    createdAt: string;
}

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST /api/orders  — place order from cart
        placeOrder: builder.mutation<{ success: boolean; data: Order }, PlaceOrderPayload>({
            query: (body) => ({ url: "/orders", method: "POST", body }),
            invalidatesTags: ["Cart"],
        }),

        // GET /api/orders  — my order history
        getMyOrders: builder.query<{ success: boolean; data: Order[] }, void>({
            query: () => ({ url: "/orders", method: "GET" }),
            providesTags: ["Order"],
        }),

        // GET /api/orders/:id
        getOrderDetails: builder.query<{ success: boolean; data: Order }, string>({
            query: (id) => ({ url: `/orders/${id}`, method: "GET" }),
            providesTags: ["Order"],
        }),

        // GET /api/orders/status — filter by status
        getMyOrdersByStatus: builder.query<{ success: boolean; data: Order[] }, { status: string }>({
            query: ({ status }) => ({ url: "/orders/status", method: "GET", params: { status } }),
            providesTags: ["Order"],
        }),

        // PATCH /api/orders/:id/cancel
        cancelOrder: builder.mutation<{ success: boolean; message: string; data: Order }, string>({
            query: (id) => ({ url: `/orders/${id}/cancel`, method: "PATCH" }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    usePlaceOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderDetailsQuery,
    useGetMyOrdersByStatusQuery,
    useCancelOrderMutation,
} = orderApi;
