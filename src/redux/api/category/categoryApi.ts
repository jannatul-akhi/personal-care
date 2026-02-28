import baseApi from "../baseApi";

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    parentId?: string | null;
    isActive: boolean;
    children?: Category[];
    _count?: {
        products: number;
    };
}

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryTree: builder.query<{ data: Category[] }, void>({
            query: () => ({
                url: "/categories/tree",
                method: "GET",
            }),
            providesTags: ["Product"], // Categories affect products
        }),
        getAllCategories: builder.query<{ data: Category[] }, any>({
            query: (params) => ({
                url: "/categories",
                method: "GET",
                params,
            }),
            providesTags: ["Product"],
        }),
    }),
});

export const { useGetCategoryTreeQuery, useGetAllCategoriesQuery } = categoryApi;
