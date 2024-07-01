import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";
import userReducer from "./userSlice";

const cryptoStore = configureStore({
  reducer: {
    crypto: cryptoReducer,
    userInfo: userReducer,
  },
});

export default cryptoStore;
