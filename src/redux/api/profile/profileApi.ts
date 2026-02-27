import baseApi from "../baseApi";

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  avatar?: File;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/profile/me
    getProfile: builder.query({
      query: () => ({ url: "/profile/me", method: "GET" }),
      providesTags: ["User"],
    }),

    // PATCH /api/auth/update-profile  (multipart/form-data)
    updateProfile: builder.mutation<{ success: boolean; data: any }, FormData>({
      query: (formData) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: formData,
        // Do NOT set Content-Type — browser sets multipart boundary automatically
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),

    // POST /api/profile/change-password
    changePassword: builder.mutation<
      { success: boolean; message: string },
      ChangePasswordPayload
    >({
      query: (body) => ({
        url: "/profile/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
