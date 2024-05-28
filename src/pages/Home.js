import React from "react";
import "../scss/Home.scss";
import { auth, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const email = user.email;
            
            localStorage.setItem("userEmail", email);

            navigate('/register');
        } catch (error) {
            console.error("Error logging in with Google: ", error);
        }
    };

    return (
        <div className="home-page">
            <h1>Welcome to the Job Application Receiver</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Home;
