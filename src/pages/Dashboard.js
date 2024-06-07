import React, { useState, useEffect } from 'react';
import "../scss/Dashboard.scss";
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../utils/OrganizationContext';
import FirebaseService from '../utils/firebaseService';

const Dashboard = () => {
    const { organization, loading } = useOrganization();
    const navigate = useNavigate();
    const [openings, setOpenings] = useState([]);
    const [viewType, setViewType] = useState('list'); // State to manage view type

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
        const url = `http://${process.env.REACT_APP_HOST}/application/${openingId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert("Opening ID copied to clipboard");
            })
            .catch((error) => {
                console.error("Error copying to clipboard: ", error);
            });
    };

    const renderOpeningsList = () => (
        <ul className="space-y-4">
            {openings.map((opening, index) => (
                <li
                    key={index}
                    className="p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleOpeningClick(opening.id)}
                >
                    <div className="flex justify-between">
                        <span>{opening.title}</span>
                        <span
                            className="text-blue-500 underline"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent opening click event
                                handleCopyId(opening.id);
                            }}
                        >
                            Link
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );

    const renderOpeningsCards = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {openings.map((opening, index) => (
                <div
                    key={index}
                    className="p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleOpeningClick(opening.id)}
                >
                    <h4 className="text-xl font-semibold mb-2">{opening.title}</h4>
                    {/* <p className="text-gray-700 mb-4">{opening.description}</p> */}
                    <span
                        className="text-blue-500 underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopyId(opening.id);
                        }}
                    >
                        Link
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="dashboard-page p-4">
            <h3 className="text-2xl mb-4">Welcome to your Dashboard :<span className='org-name'> {organization.orgName}</span></h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {organization && (
                        <>
                            <button
                                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleCreateApplication}
                            >
                                Create Application
                            </button>
                            {openings.length > 0 ? (
                                <>

                                    <h3 className="text-xl mb-4">Openings</h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <button
                                            className={`px-4 py-2 mr-2 ${viewType === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded hover:bg-blue-600`}
                                            onClick={() => setViewType('list')}
                                        >
                                            List View
                                        </button>
                                        <button
                                            className={`px-4 py-2 ${viewType === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded hover:bg-blue-600`}
                                            onClick={() => setViewType('card')}
                                        >
                                            Card View
                                        </button>
                                    </div>
                                    {viewType === 'list' ? renderOpeningsList() : renderOpeningsCards()}
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
