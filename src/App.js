import React from 'react';
import "./base.scss";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { OrganizationProvider } from './utils/OrganizationContext';
import Home from './pages/Home.js';
import OrganizationRegistration from './pages/OrganizationRegistration';
import Dashboard from './pages/Dashboard';
import Application from './pages/Application.js';
import ApplicationDetails from './pages/ApplicationDetails.js';
import ApplicantArea from './pages/ApplicantArea.js';
import { Header } from './components/Header.js';

const App = () => {
    return (
        <Router>
            <OrganizationProvider>
                <HeaderWrapper />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<OrganizationRegistration />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/create-application' element={<Application />} />
                    <Route path="/application-details/:openingId" element={<ApplicationDetails />} />
                    <Route path="/applicant/:id" element={<ApplicantArea />} />
                </Routes>
            </OrganizationProvider>
        </Router>
    );
};


const HeaderWrapper = () => {
    const location = useLocation();
    const shouldShowHeader = location.pathname !== '/' && location.pathname !== '/register';

    return shouldShowHeader ? <Header /> : null;
};

export default App;
