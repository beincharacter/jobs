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
    const [filters, setFilters] = useState({});
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

                // Log filters
                const filterss = getFilters();
                console.log("Tech Filters:", filterss.techFilters);
                console.log("Experience Filters:", filterss.experienceFilters);
                console.log("Salary Filters:", filterss.salaryFilters);
                setFilters(filterss);
                console.log({ filterss });
            } catch (error) {
                console.error("Error fetching application details: ", error);
                setError(error.message || 'Error fetching application details');
            }
        };

        if (applicationDetail && applicationDetail.id) {
            fetchApplicationDetails(applicationDetail.id);
        }
    }, [applicationDetail && applicationDetail.id]);

    const getFilters = () => {
        const techFilters = [];
        const experienceFilters = [];
        const salaryFilters = [];

        applicants.forEach(applicant => {
            // Tech Stack
            const techStackLowerCase = applicant.techStack.toLowerCase();
            if (!techFilters.includes(techStackLowerCase)) {
                techFilters.push(techStackLowerCase);
            }

            // Experience
            const experienceLowerCase = applicant.experience.toLowerCase();
            if (!experienceFilters.includes(experienceLowerCase)) {
                experienceFilters.push(experienceLowerCase);
            }

            // Salary Expectation
            const salaryLowerCase = applicant.expectedSalary.toLowerCase();
            if (!salaryFilters.includes(salaryLowerCase)) {
                salaryFilters.push(salaryLowerCase);
            }
        });

        return { techFilters, experienceFilters, salaryFilters };
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        // Update the selected filter in state
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));

        // Apply filter logic here based on the selected filter value
        // For example, you can filter applicants based on the selected tech, experience, or salary
    };

    return (
        <div className="application-details-page">
            {applicationDetail && <ApplicationDetailCard applicationDetail={applicationDetail} />}

            <h2>Applicants</h2>
            <div className='filters'>
                {/* Render tech filters */}
                {filters && filters.techFilters && (
                    <div>
                        <h3>Tech Stack</h3>
                        {filters.techFilters.map((tech, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="tech"
                                    value={tech}
                                    onChange={handleFilterChange}
                                />
                                {tech}
                            </label>
                        ))}
                    </div>
                )}

                {/* Render experience filters */}
                {filters && filters.experienceFilters && (
                    <div>
                        <h3>Experience</h3>
                        {filters.experienceFilters.map((experience, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="experience"
                                    value={experience}
                                    onChange={handleFilterChange}
                                />
                                {experience}
                            </label>
                        ))}
                    </div>
                )}

                {/* Render salary filters */}
                {filters && filters.salaryFilters && (
                    <div>
                        <h3>Salary Expectation</h3>
                        {filters.salaryFilters.map((salary, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="salary"
                                    value={salary}
                                    onChange={handleFilterChange}
                                />
                                {salary}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {applicants.length > 0 ? (
                        applicants
                            // Apply filter logic based on the selected filters
                            .filter(applicant => {
                                const { tech, experience, salary } = filters;
                                return (!tech || tech.length === 0 || tech.includes(applicant.techStack.toLowerCase())) &&
                                    (!experience || experience.length === 0 || experience.includes(applicant.experience.toLowerCase())) &&
                                    (!salary || salary.length === 0 || salary.includes(applicant.expectedSalary.toLowerCase()));
                            })
                            .map((applicant, index) => (
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
