import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { RootState } from "../store";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const reduxToken = (getState() as RootState).user?.token;
      const cookieToken = Cookies?.get("auth_token");
      const token = reduxToken || cookieToken;
      if (token) {
        headers.set(
          "Authorization",
          token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        );
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["User", "Product", "Cart"],
});

// Export hooks for usage in functional components
export default baseApi;
