import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrency } from "../utils/cryptoSlice";
import AuthModal from "./Authentication/AuthModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.crypto.currency);

  const changeCurrency = (e) => {
    dispatch(updateCurrency(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, []);

  const darkTheam = createTheme({
    palette: {
      primary: {
        main: "#512da8",
      },
      text: "white",
    },
  });

  return (
    <ThemeProvider theme={darkTheam}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              sx={{
                flex: 1,
                color: "gold",
                fontWeight: "bold",
                cursor: "pointer",
                marginLeft: { lg: 0, xs: "-11px", md: 0, sm: 0 },
                fontSize: { lg: 25, md: 23, xs: 21, sm: 21 },
                variant: "h2",
              }}
              onClick={() => navigate("/")}
            >
              CryptoMania
            </Typography>
            <Select
              variant="outlined"
              sx={{
                width: { lg: 100, xs: 80, md: 100, sm: 70 },
                height: 40,
                marginLeft: { lg: 0, xs: "-10px", md: 0, sm: "-8px" },
                marginRight: 2,
                fieldSet: {
                  borderColor: "#512da8",
                },
                "& .MuiSvgIcon-root": {
                  color: "#512da8",
                },
                label: {
                  color: "#512da8",
                },
              }}
              value={currency}
              onChange={(e) => changeCurrency(e)}
              color="primary"
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
            <AuthModal />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
