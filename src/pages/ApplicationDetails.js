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
    const [selectedFIlters, setSelectedFilters] = useState({tech: [], experience: []})

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
                const filterss = getFilters(applicantsData);
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

    const getFilters = (applicants) => {
        const techFilters = [];
        const experienceFilters = [];

        applicants.forEach(applicant => {
            // Tech Stack
            const techStackLowerCase = applicant.techStack.toLowerCase();
            if (!techFilters.includes(techStackLowerCase)) {
                techFilters.push(techStackLowerCase);
            }

            // Experience
            const experienceLowerCase = applicant.experience;
            if (!experienceFilters.includes(experienceLowerCase)) {
                experienceFilters.push(experienceLowerCase);
            }
        });

        return { techFilters, experienceFilters };
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setSelectedFilters(prevFilters => {
            const isAlreadySelected = prevFilters[name].includes(value);
            if (isAlreadySelected) {
                return {
                    ...prevFilters,
                    [name]: prevFilters[name].filter(v => v !== value)
                };
            } else {
                return {
                    ...prevFilters,
                    [name]: [...prevFilters[name], value]
                };
            }
        });
        console.log({selectedFIlters});
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
                                const { tech, experience } = selectedFIlters;
                                return (!tech || tech.length === 0 || tech.includes(applicant.techStack.toLowerCase())) &&
                                    (!experience || experience.length === 0 || experience.includes(applicant.experience))
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
