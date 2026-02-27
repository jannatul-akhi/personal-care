// import { baseApi } from "@/redux/api/baseApi";

// export interface Address {
//   id: string;
//   userId: string;
//   fullName: string; //
//   phone: string; //
//   addressLine1: string; //
//   addressLine2: string | null; //
//   city: string; //
//   zone: string | null; //
//   division: string; //
//   postalCode: string; //
//   isDefault: boolean; //
//   addressType: string; //
//   country: string; //
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AddAddressPayload {
//   fullName: string;
//   phone: string;
//   addressLine1: string;
//   city: string;
//   division: string;
//   postalCode: string;
//   isDefault?: boolean;
//   addressType?: string;
// }

// const addressApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     getAllAddresses: build.query<{ success: boolean; data: Address[] }, void>({
//       query: () => ({
//         url: "/addresses",
//         method: "GET",
//       }),
//       providesTags: ["Address"],
//     }),

//     addAddress: build.mutation<
//       { success: boolean; data: Address },
//       AddAddressPayload
//     >({
//       query: (body) => ({
//         url: "/addresses",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Address"],
//     }),

//     deleteAddress: build.mutation<{ success: boolean }, string>({
//       query: (id) => ({
//         url: `/addresses/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Address"],
//     }),
//   }),
// });

// export const {
//   useGetAllAddressesQuery,
//   useAddAddressMutation,
//   useDeleteAddressMutation,
// } = addressApi;
