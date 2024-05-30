import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/Toaster'; // Adjust the path as necessary
import "../scss/Header.scss";
import { useOrganization } from "../utils/OrganizationContext";
import { toast } from 'react-toastify';

export const Header = () => {
    const navigate = useNavigate();
    const { setLoading } = useOrganization();

    const handleLogout = async () => {
        setLoading(true); // Start loading
        localStorage.clear();
        navigate("/");
        setLoading(false); // End loading
        toast.success("Logout Success");    
    }

    return (
        <div className="header">
            <div>
                <div>LOGO</div>
                <div>JOBS</div>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};
