import React from "react";
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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.crypto.currency);

  const changeCurrency = (e) => {
    dispatch(updateCurrency(e.target.value));
  };

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
                fontSize: 25,
                variant: "h2",
              }}
              onClick={() => navigate("/")}
            >
              CoinQuest
            </Typography>
            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                marginLeft: 15,
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
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
