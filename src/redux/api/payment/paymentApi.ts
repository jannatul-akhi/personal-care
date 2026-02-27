import baseApi from "../baseApi";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST /api/payments/create-checkout-session
        createCheckoutSession: builder.mutation<{ success: boolean; url: string }, { orderId: string }>({
            query: (body) => ({ url: "/payments/create-checkout-session", method: "POST", body }),
        }),
        // GET /api/payments/my-payments
        getMyPayments: builder.query<{ success: boolean; data: any[] }, void>({
            query: () => ({ url: "/payments/my-payments", method: "GET" }),
        }),
    }),
});

export const {
    useCreateCheckoutSessionMutation,
    useGetMyPaymentsQuery,
} = paymentApi;
