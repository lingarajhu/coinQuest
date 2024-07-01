import React, { useState } from "react";
import OpenedAuth from "./OpenedAuth";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";

const AuthModal = () => {
  const [openModel, setOpenModel] = useState(false);
  const handleModal = () => setOpenModel(false);
  const user = useSelector((store) => store?.userInfo?.user);

  return (
    <>
      {user ? (
        <SideBar onClick={handleModal} />
      ) : (
        <button
          className="bg-[#FFD700] px-3 py-1 -mr-3 font-bold text-black rounded-md"
          onClick={() => setOpenModel(true)}
        >
          Login
        </button>
      )}
      {openModel && <OpenedAuth onClick={handleModal} />}
    </>
  );
};

export default AuthModal;
