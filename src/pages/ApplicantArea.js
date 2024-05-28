// ApplicantArea.js
import React, { useState, useEffect } from 'react';
import "../scss/ApplicantArea.scss";
import { useParams } from 'react-router-dom';
import FirebaseService from '../utils/firebaseService';
import ApplicationDetailCard from '../components/ApplicationDetailCard';
import ApplicantForm from '../components/ApplicantForm';

const ApplicantArea = () => {
    const { id } = useParams(); // Get the application ID from URL params
    const [application, setApplication] = useState(null);
    const [formVisible, setFormVisible] = useState(false); // State to control form visibility
    const [applied, setApplied] = useState(false); // State to control submission status

    // Fetch application details based on the ID
    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const applicationData = await FirebaseService.getApplicationDetails(id);
                console.log("Fetched application details: ", applicationData);
                setApplication(applicationData);
            } catch (error) {
                console.error("Error fetching application details: ", error);
            }
        };
        fetchApplication();
    }, [id]);

    // Initial values for the form fields
    const initialValues = {
        name: '',
        experience: '',
        email: '',
        expectedSalary: '',
        techStack: '',
        noticePeriod: '',
        resume: ''
    };

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Submit the application using FirebaseService
            console.log("Inside handleSubmit. Form values: ", values);
            await FirebaseService.submitApplication(id, values);
            setApplied(true); // Set applied status to true on successful submission
            setFormVisible(!formVisible);
        } catch (error) {
            console.error("Error submitting application: ", error);
        }
        setSubmitting(false);
    };

    return (
        <div className="applicant-area">
            <h1>Apply for Job</h1>
            {applied && <div className="applied-message">Applied</div>}
            <ApplicationDetailCard applicationDetail={application} />
            <button onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Hide Form' : 'Show Form'}
            </button>
            {formVisible && (
                <ApplicantForm initialValues={initialValues} onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default ApplicantArea;
