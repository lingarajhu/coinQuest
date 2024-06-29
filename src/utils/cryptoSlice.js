import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    currency: "INR",
    symbol: "",
  },
  reducers: {
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
    updateSymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
});

export const { updateCurrency, updateSymbol } = cryptoSlice.actions;
export default cryptoSlice.reducer;
