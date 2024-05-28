import React from 'react';
import "../scss/ApplicationDetailCard.scss";

const ApplicationDetailCard = ({applicationDetail}) => {
    
    return (
        <div className="application-details-page">
            <h1>Application Details</h1>
            {applicationDetail && (
                <>
                    <h2>Title: {applicationDetail.title}</h2>
                    <p>Description: {applicationDetail.description}</p>
                    <p>Experience Required: {applicationDetail.experience}</p>
                    <p>Salary Range: {applicationDetail.salaryRange}</p>
                    <p>Location: {applicationDetail.location}</p>
                </>
            )}
        </div>
    );
};

export default ApplicationDetailCard;