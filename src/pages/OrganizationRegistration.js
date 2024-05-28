import React, { useState, useEffect, useContext } from "react";
import "../scss/OrganizationRegistration.scss";
import { useNavigate } from "react-router-dom";
import FirebaseService from "../utils/firebaseService";
import { useOrganization } from "../utils/OrganizationContext";

const OrganizationRegistration = () => {
    const [orgName, setOrgName] = useState("");
    const [orgType, setOrgType] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setORgDetails } = useOrganization();

    useEffect(() => {
        const checkExistingOrganization = async () => {
            const email = localStorage.getItem("userEmail");

            if (!email) {
                console.error("No user email found.");
                return;
            }

            try {
                const exists = await FirebaseService.checkOrganizationExistsByEmail(email);
                console.log({exists});
                await setORgDetails(exists[0]);

                if (exists) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("Error checking existing organization: ", error);
            }
        };

        checkExistingOrganization();
    }, [navigate]);

    const handleRegister = async () => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            console.error("No user email found.");
            return;
        }

        try {
            const exists = await FirebaseService.checkOrganizationExistsByName(orgName);

            if (exists) {
                setError("Organization already exists, please choose another name.");
                return;
            }
            await setORgDetails({email, orgName, orgType});
            await FirebaseService.registerOrganization(email, orgName, orgType);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error registering organization: ", error);
        }
    };

    return (
        <div className="register-page">
            <h1>Register Your Organization</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input
                type="text"
                placeholder="Organization Name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Organization Type"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
            />
            <button onClick={handleRegister}>Register Yourself For BEST Candidates</button>
        </div>
    );
};

export default OrganizationRegistration;
