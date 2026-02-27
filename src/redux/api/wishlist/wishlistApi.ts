import baseApi from "../baseApi";

export interface WishlistItem {
    id: string;
    userId: string;
    productId: string;
    product: {
        id: string;
        name: string;
        price: number;
        discountPrice?: number;
        featuredImage: string | null;
        storage?: string;
        color?: string;
    };
    createdAt: string;
}

export interface Wishlist {
    id: string;
    userId: string;
    items: WishlistItem[];
}

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query<{ success: boolean; data: Wishlist }, void>({
            query: () => ({ url: "/wishlist", method: "GET" }),
            providesTags: ["Wishlist"],
        }),
        addToWishlist: builder.mutation<{ success: boolean; data: WishlistItem }, string>({
            query: (productId) => ({
                url: `/wishlist/${productId}`,
                method: "POST",
            }),
            invalidatesTags: ["Wishlist"],
        }),
        removeFromWishlist: builder.mutation<{ success: boolean; message: string }, string>({
            query: (productId) => ({
                url: `/wishlist/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Wishlist"],
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
} = wishlistApi;
