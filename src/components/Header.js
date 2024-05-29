import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/Toaster'; // Adjust the path as necessary
import "../scss/Header.scss";

export const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
        <div className="header">
            <div>
                <div>LOGO</div>
                <div>JOBS</div>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={notify}>Notify</button> {/* Add Notify button */}
            </div>
        </div>
        </>
    );
};
