import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import { parseOptions } from "../utils/constants";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../components/Corosal";
import toast, { Toaster } from "react-hot-toast";
import useSingleCoinInfo from "../hooks/useSingleCoinInfo";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import CryptoContext from "../context/CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  useSingleCoinInfo(id);

  const { watchList } = useContext(CryptoContext);
  const currency = useSelector((store) => store?.crypto?.currency);
  const singleCoin = useSelector((store) => store?.crypto?.singleCoin);
  const user = useSelector((store) => store?.userInfo?.user);

  if (!singleCoin) return;

  if (singleCoin?.id !== id)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress style={{ backgroundColor: "gold" }} />
      </Box>
    );

  const description = () => {
    if (singleCoin) {
      const description = singleCoin?.description?.en?.split(". ").slice(0, 2);
      const filteredDiscription = description.join(" ");
      return filteredDiscription;
    }
    return "";
  };

  const inWatchList = watchList.includes(singleCoin?.id);

  const addToWatchList = async () => {
    const coinDb = doc(db, "watchlist", user?.uid);

    try {
      await setDoc(coinDb, {
        coin: watchList ? [...watchList, singleCoin?.id] : [singleCoin?.id],
      });
      toast.success(`${singleCoin?.name} Added to Watchlist !`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeFromWatchList = async () => {
    const coinRef = doc(db, "watchList", user?.uid);

    try {
      await setDoc(
        coinRef,
        {
          coin: watchList.filter((watch) => watch !== singleCoin?.id),
        },
        { merge: true }
      );

      toast.success(`${singleCoin?.id} removed from watchlist`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = () => {
    toast.error("Please Login before adding coin to watchlist");
  };

  const Root = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const WatchList = styled("button")(({ theme }) => ({
    width: "100%",
    marginTop: "10px",
    height: 50,
    borderRadius: "5px",
    backgroundColor: inWatchList ? "#f44336" : "#ffc107",
    color: "black",
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

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
          {!user ? (
            <WatchList onClick={handleClick}>Add to WatchList</WatchList>
          ) : (
            <WatchList
              onClick={inWatchList ? removeFromWatchList : addToWatchList}
            >
              {inWatchList ? "Remove from Watchlist" : "Add to WatchList"}
            </WatchList>
          )}
        </MarketData>
      </SideBar>
      <CoinChart>
        <CoinInfo currency={currency} coin={singleCoin} />
      </CoinChart>
    </Root>
  );
};

export default CoinPage;
