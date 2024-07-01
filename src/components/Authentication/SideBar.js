import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Box, Button, Container, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

export default function SideBar({ onClick }) {
  const user = useSelector((store) => store?.userInfo?.user);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    toast.success("Logout successfull!");
    onClick();
  };

  const SideBox = styled("div")(({ theme }) => ({
    padding: 10,
    width: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      width: 230,
    },
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  }));

  const WatchList = styled("div")(({ theme }) => ({
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "color",
    backgroundColor: "gray",
    overflowY: "scroll",
    padding: 10,
    paddingTop: 10,
    borderRadius: 10,
  }));

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,

              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user?.photoURL}
            alt={user?.displayName || user?.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              ".MuiDrawer-paperAnchorRight": {
                backgroundColor: "#616161",
              },
            }}
          >
            <SideBox>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  height: "90%",
                }}
              >
                <Avatar
                  sx={{
                    width: { lg: 200, md: 190, sm: 180, xs: 160 },
                    height: { lg: 200, md: 190, sm: 180, xs: 160 },
                    marginTop: 3,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                  }}
                  src={user?.photoURL}
                  alt={user?.email}
                />
                <span
                  style={{
                    width: "100%",
                    textAlign: "center",
                    wordWrap: "break-word",
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: 6,
                  }}
                >
                  {user?.displayName || user?.email}
                </span>
                <WatchList>watchList</WatchList>
              </div>
              <button
                onClick={logOut}
                style={{
                  height: "6%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  marginTop: 8,
                  color: "red",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  borderBottom: "6px solid #ffc107",
                }}
              >
                Log Out
              </button>
            </SideBox>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
