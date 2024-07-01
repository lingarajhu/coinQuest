import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setSingleCoin } from "../utils/cryptoSlice";
import { OPTIONS, SingleCoin } from "../utils/constants";

const useSingleCoinInfo = (id) => {
  const currency = useSelector((store) => store.crypto.currency);
  const currencyV2 = currency?.toLowerCase();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSingleCoinData();
  }, [currencyV2]);

  const fetchSingleCoinData = () => {
    fetch(SingleCoin(id), OPTIONS)
      .then((response) => response.json())
      .then((res) => dispatch(setSingleCoin(res)))
      .catch((err) => toast.error("Please Check your internet connection"));
  };
};

export default useSingleCoinInfo;
