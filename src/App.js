import "./App.css";
import React from "react";
import Box from "@mui/material/Box";
import MainPage from "./Pages/MainPage";
import { Provider } from "react-redux";
import cryptoStore from "./utils/cryptoStore";
import CryptoContextProvider from "./context/CryptoContextProvider";

function App() {
  return (
    <Provider store={cryptoStore}>
      <CryptoContextProvider>
        <Box
          sx={{
            backgroundColor: "#14161a",
            color: "white",
            minHeight: "100vh",
          }}
        >
          <MainPage />
        </Box>
      </CryptoContextProvider>
    </Provider>
  );
}

export default App;
