import { useEffect } from "react";
import toast from "react-hot-toast";
import { HistoricalData, OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setHistoricalData } from "../utils/cryptoSlice";

const useHistoricalData = (coin, days, currency) => {
  const dispatch = useDispatch();

  const fetchHistoricalData = () => {
    fetch(HistoricalData(coin?.id, days, currency), OPTIONS)
      .then((respons) => respons.json())
      .then((res) => dispatch(setHistoricalData(res?.prices)))
      .catch((err) => toast.success("Fetching the data, wait for a moment"));
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [days, currency]);
};

export default useHistoricalData;
