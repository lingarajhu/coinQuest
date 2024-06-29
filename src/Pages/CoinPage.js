import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OPTIONS, SingleCoin } from "../utils/constants";
import CoinInfo from "../components/CoinInfo";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import { parseOptions } from "../utils/constants";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../components/Corosal";
import toast, { Toaster } from "react-hot-toast";

const CoinPage = () => {
  const { id } = useParams();
  const [singleCoin, setSingleCoin] = useState();
  const currency = useSelector((store) => store?.crypto?.currency);

  const fetchSingleCoinData = () => {
    fetch(SingleCoin(id), OPTIONS)
      .then((response) => response.json())
      .then((res) => setSingleCoin(res))
      .catch((err) => toast.error("Please Check your internet connection"));
  };

  useEffect(() => {
    fetchSingleCoinData();
  }, []);

  const description = () => {
    if (singleCoin) {
      const description = singleCoin?.description?.en?.split(". ").slice(0, 2);
      const filteredDiscription = description.join(" ");
      return filteredDiscription;
    }
    return "";
  };

  const Root = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const SideBar = styled("div")(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    borderRight: "2px solid grey",
  }));

  const CoinChart = styled("div")(({ theme }) => ({
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));

  const MarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 20,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      // alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  if (!singleCoin)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress style={{ backgroundColor: "gold" }} />
      </Box>
    );

  return (
    <Root>
      <Toaster position="top-center" />
      <SideBar>
        <img
          className="w-40 h-40 mb-0"
          src={singleCoin?.image?.large}
          alt={singleCoin.name}
          style={{ marginTop: 30 }}
        />

        <Typography sx={{ fontWeight: "bold", marginBottom: 0 }} variant="h4">
          {singleCoin?.name}
        </Typography>
        <Typography
          sx={{
            width: "100%",
            padding: 3,
            textAlign: "justify",
            paddingBottom: 1,
          }}
          variant="subtitle1"
        >
          {parse(description(), parseOptions)}.
        </Typography>
        <MarketData>
          <span className="flex  mb-1 ">
            <Typography
              style={{ fontWeight: "bold", color: "gold" }}
              variant="h5"
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6">
              {singleCoin?.market_data?.market_cap_rank}
            </Typography>
          </span>
          <span className="flex mb-1">
            <Typography
              style={{ fontWeight: "bold", color: "gold" }}
              variant="h5"
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6">
              {currency === "INR" ? "₹" : "$"}{" "}
              {singleCoin?.market_data?.current_price[currency.toLowerCase()]}
            </Typography>
          </span>
          <span className="flex mb-1">
            <Typography
              style={{ fontWeight: "bold", color: "gold" }}
              variant="h5"
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6">
              {currency === "INR" ? "₹" : "$"}{" "}
              {numberWithCommas(
                singleCoin?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </SideBar>
      <CoinChart>
        <CoinInfo currency={currency} coin={singleCoin} />
      </CoinChart>
    </Root>
  );
};

export default CoinPage;
