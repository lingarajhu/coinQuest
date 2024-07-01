import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setTrending } from "../utils/cryptoSlice";
import { OPTIONS, TRENDING_COINS } from "../utils/constants";

const useCorosalData = () => {
  const currency = useSelector((store) => store.crypto.currency);
  const currencyV2 = currency?.toLowerCase();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTrendingData();
  }, [currencyV2]);

  const fetchTrendingData = () => {
    fetch(TRENDING_COINS, OPTIONS)
      .then((response) => response.json())
      .then((res) => dispatch(setTrending(res?.coins)))
      .catch((err) => toast.error("Please refresh the page"));
  };
};

export default useCorosalData;
