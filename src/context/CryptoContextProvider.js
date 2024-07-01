import React, { useEffect, useState } from "react";
import CryptoContext from "./CryptoContext";
// import { useSelector } from "react-redux";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";

const CryptoContextProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  // const user = useSelector((store) => store.userInfo?.user);

  // useEffect(() => {
  //   if (user) {
  //     const coinRef = doc(db, "watchlist", user?.uid);

  //     const unsubscribe = onSnapshot(coinRef, (coin) => {
  //       if (coin.exists()) {
  //         console.log(coin.data().coins);
  //         setWatchList(coin.data().coins, () => {
  //           console.log("watchList updated:", watchList);
  //         });
  //       } else {
  //         console.log("No items in the watchlist");
  //       }
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [user]);

  return (
    <CryptoContext.Provider value={{ watchList }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContextProvider;
