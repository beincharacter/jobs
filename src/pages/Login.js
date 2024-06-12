import React, { useEffect, useState } from "react";
import "../scss/Home.scss";
import { auth, provider, signInWithPopup } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import FirebaseService from "../utils/firebaseService";
import { useOrganization } from "../utils/OrganizationContext";
import { toast } from "react-toastify";
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
      if (!localStorage.getItem("user")) return;
      const { email, name, profilePicture } = JSON.parse(localStorage.getItem("user"));
      setUser({ email, name, profilePicture });

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
      console.log({ user });

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome to the Job Application Receiver</h2>
      <button
        className="w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 14h4zm2 5.291a7.96 7.96 0 01-2-.947V20c1.57.35 3.21.5 4.91.5 3.392 0 6.654-1.07 9.09-3H14a7.96 7.96 0 01-1 .702v4.092c1.51-.207 2.978-.646 4.29-1.287A15.936 15.936 0 0120 24c-2.486 0-4.875-.571-7-1.606V22z"
            ></path>
          </svg>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8c0-18-1.6-35.4-4.6-52.4H250v99.1h134.3c-5.8 31.3-23.1 57.8-49 75.5l-.8 5.4 71.2 55.3 5.5.5c31.6-29.1 50.8-72 50.8-123.4zM250 500c67.3 0 123.6-22.4 164.9-60.5l-78.7-61.1c-22.5 15.2-51.1 24.2-81.5 24.2-62.9 0-116.2-42.6-135.2-100.4l-5.5.5-75.5 58.3-1.3 5.3C87.2 441.7 162.9 500 250 500zM114.8 310.3c-9.3-27.1-9.3-56.1 0-83.2l-75.5-58.3C14.5 198.2 0 239.8 0 285.4s14.5 87.2 39.3 116.6l75.5-58.3zm337.9-260.3l-71.2-55.3-5.5.5C369.7 42.3 309.8 20 250 20c-87.1 0-162.8 58.3-190.5 138.7l75.5 58.3C155.8 162.6 202.4 130 250 130c30.4 0 59 8.9 81.5 24.2l59.7-58.6C414.4 58.5 378.3 33.5 350.5 20z"
              ></path>
            </svg>
            Login with Google
          </>
        )}
      </button>
      <div className="text-center my-4">Or</div>
      <input
        type="email"
        placeholder="Email/Username"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
        onClick={handleEmailLogin}
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 14h4zm2 5.291a7.96 7.96 0 01-2-.947V20c1.57.35 3.21.5 4.91.5 3.392 0 6.654-1.07 9.09-3H14a7.96 7.96 0 01-1 .702v4.092c1.51-.207 2.978-.646 4.29-1.287A15.936 15.936 0 0120 24c-2.486 0-4.875-.571-7-1.606V22z"
            ></path>
          </svg>
        ) : (
          "Login"
        )}
      </button>
      <div className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
