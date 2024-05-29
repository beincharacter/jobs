import React, { useState, useEffect } from 'react';
import "../scss/Dashboard.scss";
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../utils/OrganizationContext';
import FirebaseService from '../utils/firebaseService';
import { ColorRing } from 'react-loader-spinner';

const Dashboard = () => {
    const { organization, loading } = useOrganization();
    const navigate = useNavigate();
    const [openings, setOpenings] = useState([]);
    const [ nameLoading, isNameLoading ] = useState(false);

    const handleCreateApplication = () => {
        navigate('/create-application');
    };
    
    useEffect(() => {

        const getOpenings = async () => {
            try {
                const data = await FirebaseService.getOpeningsFromFirebase(organization.id);
                setOpenings(data);
            } catch (error) {
                console.error("Error fetching openings: ", error);
            }
        };

        if (organization) {
            getOpenings();
        }
    }, [organization]);
  
    const handleOpeningClick = async (openingId) => {
        try {
            const applicationDetails = await FirebaseService.getApplicationDetails(openingId);
            console.log("Application details: ", applicationDetails);
            navigate(`/application-details/${openingId}`, { state: { applicationDetails } });
        } catch (error) {
            console.error("Error fetching application details: ", error);
        }
    };

    const handleCopyId = (openingId) => {
        navigator.clipboard.writeText(`http://localhost:3000/applicant/${openingId}`)
            .then(() => {
                alert("Opening ID copied to clipboard");
            })
            .catch((error) => {
                console.error("Error copying to clipboard: ", error);
            });
    };

    return (
        <div className="dashboard-page">
            <h3>Welcome to your Dashboard :<span className='org-name'> {organization.orgName}</span> </h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {organization && (
                        <>
                            <button onClick={handleCreateApplication}>Create Application</button>
                            {openings.length > 0 ? (
                                <>
                                    <h3>Openings</h3>
                                    <ul>
                                        {openings.map((opening, index) => (
                                            <li key={index} onClick={() => handleOpeningClick(opening.id)}>
                                                {opening.title}
                                                <span onClick={(e) => {
                                                    e.stopPropagation(); // Prevent opening click event
                                                    handleCopyId(opening.id);
                                                }} >Link</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <p>No openings available.</p>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
