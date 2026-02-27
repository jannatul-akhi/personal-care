import baseApi from "../baseApi";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  guestCartId?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice: number;
    featuredImage: string | null;
    stock: number;
  };
}

export interface CartResponse {
  success: boolean;
  data: {
    id: string;
    items: CartItem[];
  };
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

    // GET cart items
    // login → GET /cart (auth header)
    // guest → GET /cart?guestCartId=xxx
    getCart: builder.query<CartResponse, { guestCartId?: string; isLoggedIn?: boolean }>({
      query: ({ guestCartId, isLoggedIn }) => ({
        url: isLoggedIn ? "/cart" : `/cart?guestCartId=${guestCartId ?? ""}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // PATCH /cart/items/:productId — quantity update
    updateCartItem: builder.mutation<
      void,
      { productId: string; quantity: number; guestCartId?: string }
    >({
      query: ({ productId, ...body }) => ({
        url: `/cart/items/${productId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // DELETE /cart/items/:productId
    removeCartItem: builder.mutation<
      void,
      { productId: string; guestCartId?: string }
    >({
      query: ({ productId, guestCartId }) => ({
        url: `/cart/items/${productId}`,
        method: "DELETE",
        body: guestCartId ? { guestCartId } : {},
      }),
      invalidatesTags: ["Cart"],
    }),

    // POST /cart/merge — login-এর পরে call করতে হবে
    mergeCart: builder.mutation<void, { guestCartId: string }>({
      query: (body) => ({
        url: "/cart/merge",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // GET /cart/count
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

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useMergeCartMutation,
  useGetCartCountQuery,
} = cartApi;
