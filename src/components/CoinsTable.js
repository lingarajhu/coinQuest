import React, { useEffect, useState } from "react";
import { CoinList, OPTIONS } from "../utils/constants";
import { useSelector } from "react-redux";
import { numberWithCommas } from "./Corosal";
import Pagination from "@mui/material/Pagination";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Tab,
  Box,
  styled,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useNavigate } from "react-router-dom";
import TabPanel from "@mui/lab/TabPanel";
import toast, { Toaster } from "react-hot-toast";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("1");

  const navigate = useNavigate();

  const currency = useSelector((store) => store.crypto.currency);
  const currencyV2 = currency.toLowerCase();

  const fetchCoinTabel = () => {
    setLoading(true);
    fetch(CoinList(currencyV2), OPTIONS)
      .then((respons) => respons.json())
      .then((res) => setCoins(res))
      .catch((error) => toast.loading("Wait for a moment"));

    setLoading(false);
  };

  useEffect(() => {
    fetchCoinTabel();
  }, [currencyV2]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const darkTheam = createTheme({
    palette: {
      primary: {
        main: "#ffd600",
        contrastText: "#fff",
      },
      secondary: {
        main: "#E0C2FF",
      },
      ternary: {
        main: "gold",
        fontWeight: "bold",
      },
    },
  });

  const CardDiv = styled("div")(({ theme }) => ({
    width: "330px",
    height: "340px",
    border: "2px solid #757575",
    borderRadius: "16px",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#212121",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#424242",
      borderBottom: "9px solid #757575",
      borderRight: "9px solid #757575",
      transform: "scale(1.05)",
    },
    [theme.breakpoints.down("md")]: {
      width: "270px",
      height: "300px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "230px",
      height: "260px",
    },
  }));

  const handelSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheam}>
      <Container
        sx={{
          textAlign: "center ",
          color: "white",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Toaster position="top-center" />
        <Typography
          sx={{ fontWeight: "", fontSize: "40px", marginTop: "10px" }}
        >
          Cryptocurrency Prices by Market Gap
        </Typography>
        <TextField
          sx={{
            margin: "20px 0",
            input: { color: "white" },
            label: { color: "#fff59d", fontSize: "15px" },
            fieldSet: { borderColor: "#fff59d" },
            "&:hover fieldSet": {
              borderColor: "gray!important",
            },
          }}
          fullWidth
          label="Search for a Crypto Currency."
          variant="outlined"
          color="primary"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant="fullWidth"
                textColor="white"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="List" value="1" />
                <Tab label="Cards" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer>
                {loading ? (
                  <LinearProgress color="primary" />
                ) : (
                  <Table
                    sx={{
                      "& .MuiTableRow-root:hover": {
                        backgroundColor: "#212121",
                      },
                    }}
                  >
                    <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                      <TableRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map(
                          (head) => {
                            return (
                              <TableCell
                                key={head}
                                sx={{
                                  color: "black",
                                  fontWeight: "700",
                                  fontSize: "17px",
                                }}
                                align={head === "Coin" ? "" : "right"}
                              >
                                {head}
                              </TableCell>
                            );
                          }
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handelSearch()
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((coin) => {
                          const profit = coin.price_change_percentage_24h > 0;

                          return (
                            <TableRow
                              sx={{
                                cursor: "pointer",
                              }}
                              key={coin.id}
                              onClick={() => navigate(`/coinpage/${coin.id}`)}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  textAlign: "left",
                                }}
                              >
                                <img
                                  className="w-16 h-16 "
                                  src={coin?.image}
                                  alt={coin?.name}
                                  // height="50"
                                />
                                <div className="flex flex-col ml-4">
                                  <span className="text-white font-bold uppercase text-lg">
                                    {coin.symbol}
                                  </span>
                                  <span className="text-gray-400 text-base">
                                    {coin.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "white",
                                  fontWeight: 500,
                                  fontSize: "20px",
                                }}
                                align="right"
                              >
                                {currency === "INR" ? "₹" : "$"}{" "}
                                {numberWithCommas(
                                  coin?.current_price.toFixed(2)
                                )}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 500,
                                  fontSize: "20px",
                                  color: profit ? "rgb(14, 203, 129)" : "red",
                                }}
                                align="right"
                              >
                                {profit ? "+" : ""}
                                {coin?.price_change_percentage_24h.toFixed(2)}%
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "white",
                                  fontWeight: 500,
                                  fontSize: "20px",
                                }}
                                align="right"
                              >
                                {currency === "INR" ? "₹" : "$"}{" "}
                                {numberWithCommas(
                                  coin?.market_cap.toString().slice(0, -6)
                                )}
                                M
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </TabPanel>
            <TabPanel value="2">
              <Container>
                {loading ? (
                  <LinearProgress color="primary" />
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        sm: "1fr",
                        md: "1fr 1fr",
                        lg: "1fr 1fr 1fr",
                      },
                      paddingTop: "10px",
                      gap: 5,
                    }}
                  >
                    {handelSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 12)
                      .map((coin) => {
                        const profit = coin.price_change_percentage_24h > 0;
                        return (
                          <CardDiv>
                            <img
                              className="lg:w-36 lg:h-36 md:w-32 md:h-32 sm:w-24 sm:h-24"
                              src={coin?.image}
                              alt={coin?.name}
                            />
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: "30px",
                                  md: "20px",
                                  sm: "10px",
                                },
                                fontWeight: 600,
                                color: "gold",
                                marginTop: "10px",
                              }}
                              variant="h2"
                            >
                              {coin?.name}
                            </Typography>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                paddingLeft: { lg: 10, md: 15, sm: 6 },
                                position: "relative",
                              }}
                            >
                              <Typography sx={{ marginTop: 1 }}>
                                <span className="lg:font-bold lg:text-xl md:font-bold md:text-lg sm:font-bold sm:text-base">
                                  Current Price:{" "}
                                </span>
                                {currency === "INR" ? "₹" : "$"}{" "}
                                {numberWithCommas(
                                  coin?.current_price.toFixed(2)
                                )}
                              </Typography>
                              <Typography
                                sx={{
                                  marginTop: 1,
                                  color: profit ? "rgb(14, 203, 129)" : "red",
                                }}
                              >
                                <span className="text-white lg:font-bold lg:text-xl md:font-bold md:text-lg sm:font-bold sm:text-base">
                                  24Change:{" "}
                                </span>
                                {profit ? "+" : ""}
                                {coin?.price_change_percentage_24h.toFixed(2)}%
                              </Typography>
                              <Typography sx={{ marginTop: 1 }}>
                                <span className="lg:font-bold lg:text-xl md:font-bold md:text-lg sm:font-bold sm:text-base">
                                  Market Cap:{" "}
                                </span>
                                {currency === "INR" ? "₹" : "$"}{" "}
                                {numberWithCommas(
                                  coin?.market_cap.toString().slice(0, -6)
                                )}
                                M
                              </Typography>
                              <button
                                onClick={() =>
                                  navigate(`/coinpage/${coin?.id}`)
                                }
                                className="absolute right-2 bottom-6 w-12 h-12 bg-[#FFD700] rounded-full"
                              >
                                <CallMadeOutlinedIcon />
                              </button>
                            </div>
                          </CardDiv>
                        );
                      })}
                  </Box>
                )}
              </Container>
            </TabPanel>
          </TabContext>
        </Box>
        <Pagination
          sx={{
            margin: "20px 0px",
            padding: "20px",
            color: "white",
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
          }}
          color="secondary"
          count={(handelSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
