import React, { useState, useEffect } from 'react';
import "../scss/ApplicationDetails.scss";
import { useLocation } from 'react-router-dom';
import FirebaseService from '../utils/firebaseService';
import ApplicationDetailCard from '../components/ApplicationDetailCard';

const ApplicationDetails = () => {
    const location = useLocation();
    const applicationDetail = location.state.applicationDetails; // Get opening ID from location state

    const [applicationDetails, setApplicationDetails] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicationDetails = async (id) => {
            try {
                // Fetch application details based on opening ID
                const details = await FirebaseService.getApplicationDetails(id);
                setApplicationDetails(details);

                // Fetch applicants for the opening
                const applicantsData = await FirebaseService.getApplicantDetails(id);
                setApplicants(applicantsData);
            } catch (error) {
                console.error("Error fetching application details: ", error);
                setError(error.message || 'Error fetching application details');
            }
        };

        if (applicationDetail && applicationDetail.id) {
            fetchApplicationDetails(applicationDetail.id);
        }
    }, [applicationDetail && applicationDetail.id]);

    return (
        <div className="application-details-page">
            {applicationDetail && <ApplicationDetailCard applicationDetail={applicationDetail} />}

            <h2>Applicants</h2>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {applicants.length > 0 ? (
                        applicants.map((applicant, index) => (
                            <li key={index}>
                                <p>Name: {applicant.name}</p>
                                <p>Email: {applicant.email}</p>
                                <p>Resume: <a href={applicant.resume} target="_blank">{applicant.resume}</a></p>
                                <p>Phone Number: {applicant.phoneNumber}</p>
                                <p>Tech: {applicant.techStack}</p>
                                <p>Notice Period: {applicant.noticePeriod}</p>
                                <p>Experience: {applicant.experience}</p>
                                <p>Expected Salary: {applicant.expectedSalary}</p>
                            </li>
                        ))
                    ) : (
                        <li>No applicants found.</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ApplicationDetails;
