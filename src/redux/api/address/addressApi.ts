import baseApi from "../baseApi";

export interface Address {
    id: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    zone?: string;
    division?: string;
    postalCode?: string;
    country: string;
    isDefault: boolean;
    addressType?: string;
}

export interface CreateAddressPayload {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    zone?: string;
    division?: string;
    postalCode?: string;
    country?: string;
    isDefault?: boolean;
    addressType?: string;
}

export const addressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /api/addresses
        getAddresses: builder.query<{ success: boolean; data: Address[] }, void>({
            query: () => ({ url: "/addresses", method: "GET" }),
            providesTags: ["Address"],
        }),

        // POST /api/addresses
        createAddress: builder.mutation<{ success: boolean; data: Address }, CreateAddressPayload>({
            query: (body) => ({ url: "/addresses", method: "POST", body }),
            invalidatesTags: ["Address"],
        }),

        // PATCH /api/addresses/:id/default
        setDefaultAddress: builder.mutation<void, string>({
            query: (id) => ({ url: `/addresses/${id}/default`, method: "PATCH" }),
            invalidatesTags: ["Address"],
        }),

        // DELETE /api/addresses/:id
        deleteAddress: builder.mutation<void, string>({
            query: (id) => ({ url: `/addresses/${id}`, method: "DELETE" }),
            invalidatesTags: ["Address"],
        }),
    }),
});

export const {
    useGetAddressesQuery,
    useCreateAddressMutation,
    useSetDefaultAddressMutation,
    useDeleteAddressMutation,
} = addressApi;
