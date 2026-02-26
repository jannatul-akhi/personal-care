import baseApi from "../baseApi";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  guestCartId?: string;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login → body: { productId, quantity }  + Authorization: Bearer token header
    // guest → body: { productId, quantity, guestCartId }
    addToCart: builder.mutation({
      query: (body: AddToCartPayload) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // login → GET /cart/count  (auth header এ token, backend user বুঝবে)
    // guest → GET /cart/count?guestCartId=xxx
    getCartCount: builder.query<
      { success: boolean; data: { count: number } },
      { guestCartId?: string; isLoggedIn?: boolean }
    >({
      query: ({ guestCartId, isLoggedIn }) => ({
        url: isLoggedIn
          ? "/cart/count"
          : `/cart/count?guestCartId=${guestCartId ?? ""}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetCartCountQuery } = cartApi;
