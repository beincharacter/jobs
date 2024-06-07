import React, { useEffect } from "react";
import "../scss/Home.scss";
import { auth, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";
import FirebaseService from "../utils/firebaseService";
import { useOrganization } from "../utils/OrganizationContext";
import { toast } from "react-toastify";

export const Home = () => {
    const navigate = useNavigate();
    const { setORgDetails, setLoading } = useOrganization();

    useEffect(() => {
        const checkExistingOrganization = async () => {
            setLoading(true);
            const email = localStorage.getItem("userEmail");
    
            if (!email) {
                console.error("No user email found.");
                setLoading(false);
                return;
            }
    
            try {
                const exists = await FirebaseService.checkOrganizationExistsByEmail(email);
                console.log({exists});
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
    })

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
