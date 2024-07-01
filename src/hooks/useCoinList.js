import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { CoinList, OPTIONS } from "../utils/constants";
import { setCoins, setLoading } from "../utils/cryptoSlice";

const useCoinList = () => {
  const currency = useSelector((store) => store.crypto.currency);
  const coins = useSelector((store) => store.crypto.coins);
  const currencyV2 = currency?.toLowerCase();
  const dispatch = useDispatch();

  useEffect(() => {
    !coins && fetchCoinTabel();
  }, [currencyV2]);

  const fetchCoinTabel = () => {
    dispatch(setLoading(true));
    fetch(CoinList(currencyV2), OPTIONS)
      .then((respons) => respons.json())
      .then((res) => dispatch(setCoins(res)))
      .catch((error) => toast.loading("Wait for a moment"));

    dispatch(setLoading(false));
  };
};

export default useCoinList;
