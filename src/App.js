import "./App.css";
import React from "react";
import Box from "@mui/material/Box";
import MainPage from "./Pages/MainPage";
import { Provider } from "react-redux";
import cryptoStore from "./utils/cryptoStore";

function App() {
  return (
    <Provider store={cryptoStore}>
      <Box
        sx={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}
      >
        <MainPage />
      </Box>
    </Provider>
  );
}

export default App;
