import React from 'react';
import "./base.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrganizationProvider } from './utils/OrganizationContext';
import Home from './pages/Home.js';
import OrganizationRegistration from './pages/OrganizationRegistration';
import Dashboard from './pages/Dashboard';
import Application from './pages/Application.js.js';
import ApplicationDetails from './pages/ApplicationDetails.js';
import ApplicantArea from './pages/ApplicantArea.js';

const App = () => {
    return (
        <Router>
            <OrganizationProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<OrganizationRegistration />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/create-application' Component={Application} />
                    <Route path="/application-details/:openingId" element={<ApplicationDetails />} />
                    <Route path="/applicant/:id" element={<ApplicantArea />} />
                </Routes>
            </OrganizationProvider>
        </Router>
    );
};

export default App;
