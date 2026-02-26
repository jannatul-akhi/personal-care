import { UserProfile } from "@/interfaces/global";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: UserProfile | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload?.data?.user !== undefined) {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
      } else if (action.payload?.user !== undefined) {
        state.user = action.payload.user;
        if (action.payload.token) {
          state.token = action.payload.token;
        }
      } else if (action.payload?.token) {
        state.token = action.payload.token;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
