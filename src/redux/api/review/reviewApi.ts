import baseApi from "../baseApi";

export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
    images?: string[];
    isApproved: boolean;
    product?: {
        id: string;
        name: string;
        slug: string;
        featuredImage: string | null;
    };
    createdAt: string;
}

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get user's own reviews (Assuming a generic getAll endpoint with filters or a dedicated my-reviews endpoint)
        // Since backend has /api/admin/reviews, I might need a /api/reviews/my endpoint. 
        // Let's check backend routes again to see if there's a user-specific list.
        getMyReviews: builder.query<{ success: boolean; data: Review[] }, void>({
            query: () => ({ url: "/reviews/my", method: "GET" }),
            providesTags: ["Review"],
        }),
        submitReview: builder.mutation<{ success: boolean; data: Review }, { productId: string; rating: number; comment?: string; images?: string[] }>({
            query: ({ productId, ...body }) => ({
                url: `/products/${productId}/reviews`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});

export const { useGetMyReviewsQuery, useSubmitReviewMutation } = reviewApi;
