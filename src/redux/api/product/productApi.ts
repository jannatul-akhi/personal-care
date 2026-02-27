import baseApi from "../baseApi";

export interface GetAllProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  categoryId?: string;
  subCategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  inStock?: boolean;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query({
      query: () => ({
        url: "/products/featured",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getTopRatedProducts: builder.query({
      query: () => ({
        url: "/products/top-rated",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getAllProducts: builder.query({
      query: (params: GetAllProductsParams = {}) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", String(params.page));
        if (params.limit) queryParams.append("limit", String(params.limit));
        if (params.category) queryParams.append("category", params.category);
        if (params.categoryId) queryParams.append("categoryId", params.categoryId);
        if (params.subCategoryId)
          queryParams.append("subCategoryId", params.subCategoryId);
        if (params.minPrice !== undefined)
          queryParams.append("minPrice", String(params.minPrice));
        if (params.maxPrice !== undefined)
          queryParams.append("maxPrice", String(params.maxPrice));
        if (params.minRating !== undefined)
          queryParams.append("minRating", String(params.minRating));
        if (params.search) queryParams.append("search", params.search);
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.order) queryParams.append("order", params.order);
        if (params.inStock !== undefined)
          queryParams.append("inStock", String(params.inStock));
        return {
          url: `/products?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetFeaturedProductsQuery,
  useGetTopRatedProductsQuery,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} = productApi;
