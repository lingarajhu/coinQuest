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
          className="bg-[#FFD700] lg:px-3 lg:py-2 sm:py-0 sm:px-1 xs:py-0 xs:px-1 sm:-ml-4 xs:-ml-3 font-bold text-black rounded-md"
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
