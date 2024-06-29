import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";

const cryptoStore = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default cryptoStore;
