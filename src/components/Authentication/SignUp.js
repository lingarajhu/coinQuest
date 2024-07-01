import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";

const SignUp = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success(`SignUp successfull!, Welcome ${res?.user?.email}`);
        onClick();
      })
      .catch((error) => {
        toast.error(error.message);
        return;
      });
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    const isPasswordValid =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        password
      );

    if (!isPasswordValid) {
      toast.error("Please enter valid password");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success(`Sign Up successfull. Welcome ${result.user.email}`);
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
          value={email}
          required
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
        <TextField
          sx={{
            input: { color: "white" },
            "&:hover": {
              border: "#b2ebf2",
            },
          }}
          type="password"
          required
          label={<span style={{ color: "#e0e0e0" }}>Confirm Password</span>}
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Sign Up
        </Button>
        <span
          style={{
            textAlign: "center",
            margineTop: 6,
            marginBottom: 3,
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          OR
        </span>
        <GoogleButton
          style={{ width: "100%", outline: "none", borderRadius: "7px" }}
          onClick={signInWithGoogle}
        />
      </Box>
    </div>
  );
};

export default SignUp;
