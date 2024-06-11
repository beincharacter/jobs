import React, { useEffect, useState } from "react";
import "../scss/Home.scss";
import { auth, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";
import FirebaseService from "../utils/firebaseService";
import { useOrganization } from "../utils/OrganizationContext";
import { toast } from "react-toastify";
import {
  Button,
  TextField,
  Container,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/User";

export const Login = () => {
  const navigate = useNavigate();
  const { setORgDetails, setLoading } = useOrganization();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLocalLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const checkExistingOrganization = async () => {
      setLoading(true);
      if(!localStorage.getItem("user")) return;
      const {email, name, profilePicture} = JSON.parse(localStorage.getItem("user"));
      setUser({email, name, profilePicture});

      if (!email) {
        console.error("No user email found.");
        setLoading(false);
        return;
      }

      try {
        const exists = await FirebaseService.checkOrganizationExistsByEmail(email);
        console.log({ exists });
        await setORgDetails(exists[0]);
        localStorage.setItem("id", exists[0].id);
        if (exists) {
          setLoading(false);
          navigate('/dashboard');
          toast.success("Login success");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error checking existing organization: ", error);
      }
    };

    checkExistingOrganization();
    setLoading(false);
  }, [navigate, setLoading, setORgDetails]);

  const handleLogin = async () => {
    setLocalLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log({user});

      const userData = {
        email: user.email,
        name: user.displayName,
        profilePicture: user.photoURL
      };
      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));

      navigate('/register');
    } catch (error) {
      console.error("Error logging in with Google: ", error);
    }
    setLocalLoading(false);
  };

  const handleEmailLogin = async () => {
    setLocalLoading(true);
    try {
      // Add email/password login logic here
      // For example, using Firebase auth to sign in with email and password
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userData = {
        email: user.email,
        // Assuming you have other user details you can fetch and store
        name: user.displayName || "Default Name",
        profilePicture: user.photoURL || "default-profile-pic-url",
        // Add other user data if needed
      };

      localStorage.setItem("user", JSON.stringify(userData));
      navigate('/dashboard');
    } catch (error) {
      console.error("Error logging in with email: ", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
    setLocalLoading(false);
  };

  return (
    <Container maxWidth="sm" className="home-page">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Job Application Receiver
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="p-2"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleLogin}
        disabled={loading}
        style={{ padding: '8px', marginBottom: "20px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Login with Google"}
      </Button>
      <Typography variant="body1" align="center" gutterBottom>
        Or
      </Typography>
      <TextField
        label="Email/Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleEmailLogin}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
      <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link href="/register" variant="body2">
          Register here
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
