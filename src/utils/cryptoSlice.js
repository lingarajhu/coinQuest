import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    currency: "INR",
    symbol: "",
    loading: false,
    trending: null,
    coins: null,
    singleCoin: [],
    historicalData: [],
  },
  reducers: {
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
    updateSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSingleCoin: (state, action) => {
      state.singleCoin = action.payload;
    },
    setHistoricalData: (state, action) => {
      state.historicalData = action.payload;
    },
  },
});

export const {
  updateCurrency,
  updateSymbol,
  setTrending,
  setCoins,
  setLoading,
  setSingleCoin,
  setHistoricalData,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
