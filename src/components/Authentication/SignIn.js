import { Box, Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../firebase";

const SignIn = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const login = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Login successfull. Welcome ${login?.user?.email}`);
      onClick();
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <div>
      <Box p={1} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          sx={{
            input: { color: "white" },
            "&:hover": {
              border: "#b2ebf2",
            },
          }}
          type="email"
          label={<span style={{ color: "#e0e0e0" }}>Enter Email</span>}
          fullWidth
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{
            input: { color: "white" },
            "&:hover": {
              border: "#b2ebf2",
            },
          }}
          type="password"
          required
          label={<span style={{ color: "#e0e0e0" }}>Enter Password</span>}
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          size="large"
          sx={{
            backgroundColor: "#EEBC1D",
            color: "white",
            border: "none",
            "&:hover": { backgroundColor: "rgba(153, 204, 255, .6)" },
          }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export default SignIn;
