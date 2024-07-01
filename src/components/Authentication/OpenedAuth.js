import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ThemeProvider, createTheme } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const OpenedAuth = ({ onClick }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffd600",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: 0.8,
          zIndex: 10,
        }}
        onClick={onClick}
      ></div>
      <div
        style={{
          position: "fixed",
          width: "380px",
          // height: "370px",
          top: "50%",
          left: "50%",
          backgroundColor: "#424242",
          zIndex: 20,
          transform: "translate(-50%, -50%)",
          padding: 2,
          borderRadius: "16px",
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                TabIndicatorProps={{
                  style: { background: "red", height: 2, fontSize: "20px" },
                }}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={
                    <span
                      style={{
                        color: "gold",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Sign In
                    </span>
                  }
                  value="1"
                />
                <Tab
                  label={
                    <span
                      style={{
                        color: "gold",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Sign Up
                    </span>
                  }
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn onClick={onClick} />
            </TabPanel>
            <TabPanel value="2">
              <SignUp onClick={onClick} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default OpenedAuth;
