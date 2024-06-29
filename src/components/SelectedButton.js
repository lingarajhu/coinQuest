import React from "react";
import { styled } from "@mui/material";
import { transform } from "framer-motion";

const SelectedButton = ({ children, selected, onClick }) => {
  const SpanButton = styled("span")(({ theme }) => ({
    border: "1px solid gold",
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer",
    color: selected ? "black" : "",
    backgroundColor: selected ? "gold" : "",
    fontWeight: selected ? 700 : 500,
    borderBottom: selected ? "5px solid #FF6313" : "",
    "&:hover": {
      backgroundColor: "gold",
      borderBottom: "5px solid #FF6313",
      color: "black",
    },
    "&:active": {
      transform: "translateY(10px) scale(.9)",
      transition: "all .2s",
    },
    width: "22%",
  }));

  return <SpanButton onClick={onClick}>{children}</SpanButton>;
};

export default SelectedButton;
