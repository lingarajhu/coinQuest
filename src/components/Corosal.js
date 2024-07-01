import React from "react";
import { useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import useCorosalData from "../hooks/useCorosalData";

export function numberWithCommas(val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Corosal = () => {
  useCorosalData();

  const currency = useSelector((store) => store.crypto.currency);
  const trending = useSelector((store) => store.crypto.trending);
  const currencyV2 = currency?.toLowerCase();

  if (!trending) return <CircularProgress style={{ color: "gold" }} />;

  const items = trending.map((coin) => {
    const profit =
      coin?.item?.data?.price_change_percentage_24h[currencyV2] >= 0;

    return (
      <Link
        className="cursor-pointer flex flex-col items-center justify-center gap-1"
        to={`/coinpage/${coin?.item?.id}`}
      >
        <img
          className="w-20 h-20"
          src={coin?.item?.large}
          alt={coin?.item?.name}
        />
        <span>
          {coin?.item?.symbol}
          &nbsp;
          <span
            style={{ fontWeight: "bold" }}
            className={profit ? "text-green-600" : "text-red-600"}
          >
            {profit && "+"}
            {""}
            {coin?.item?.data?.price_change_percentage_24h[currencyV2]?.toFixed(
              3
            )}
          </span>
        </span>
        <p className="text-yellow-500 font-bold">
          {currency === "INR" ? "₹" : "$"}
          {numberWithCommas(coin?.item?.data?.price?.toFixed(2))}
        </p>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    516: {
      items: 4,
    },
  };

  return (
    <div className="h-[20%] w-[80%] mt-6 flex items-center">
      <AliceCarousel
        mouseTracking
        autoPlay
        disableButtonsControls
        disableDotsControls
        animationDuration={1000}
        autoPlayInterval={1300}
        infinite
        responsive={responsive}
        items={items}
      />
      <Toaster position="top-center" />
    </div>
  );
};

export default Corosal;
