import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  guestCartId: string;
}

const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const initialState: CartState = {
  guestCartId: generateId(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetGuestCart: (state) => {
      state.guestCartId = generateId();
    },
    setGuestCartId: (state, action: PayloadAction<string>) => {
      state.guestCartId = action.payload;
    },
  },
});

export const { resetGuestCart, setGuestCartId } = cartSlice.actions;
export default cartSlice.reducer;
