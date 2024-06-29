import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Corosal from "./Corosal";

const Banner = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [styleVariants, setStyleVariants] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const handelMouseEnter = () => {
    setStyleVariants("text");
  };

  const handelMouseLeave = () => {
    setStyleVariants("default");
  };

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 8,
    },
    text: {
      height: 100,
      width: 100,
      x: mousePosition.x - 60,
      y: mousePosition.y - 50,
      backgroundColor: "#FFD700",
      mixBlendMode: "difference",
    },
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(./banner2.jpg)",
        height: "500px",
        width: "100%",
        objectFit: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        onMouseEnter={handelMouseEnter}
        onMouseLeave={handelMouseLeave}
        className="font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 "
      >
        Coin Quest
      </h1>
      <p className="text-xl my-4">
        Checkout some trending coins from past week
      </p>
      <motion.div
        className="w-[20px] h-[20px] rounded-full bg-violet-800 fixed pointer-events-none top-0 left-0"
        variants={variants}
        animate={styleVariants}
      />

      <Corosal />
    </Box>
  );
};

export default Banner;
