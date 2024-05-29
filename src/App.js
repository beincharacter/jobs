import React from 'react';
import "./base.scss";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { OrganizationProvider, useOrganization } from './utils/OrganizationContext';
import Home from './pages/Home.js';
import OrganizationRegistration from './pages/OrganizationRegistration';
import Dashboard from './pages/Dashboard';
import Application from './pages/Application.js';
import ApplicationDetails from './pages/ApplicationDetails.js';
import ApplicantArea from './pages/ApplicantArea.js';
import { Header } from './components/Header.js';
import { ColorRing } from 'react-loader-spinner';
import { Toaster } from './components/Toaster'; // Import the Toaster component

const App = () => {
    return (
        <Router>
            <OrganizationProvider>
                <HeaderWrapper />
                <Toaster /> {/* Add the Toaster component here */}
                <MainContent />
            </OrganizationProvider>
        </Router>
    );
};

const HeaderWrapper = () => {
    const location = useLocation();
    const shouldShowHeader = location.pathname !== '/' && location.pathname !== '/register';

    return shouldShowHeader ? <Header /> : null;
};

const MainContent = () => {
    const { loading } = useOrganization();

    return (
        <>
            {loading && <div className='loader'><ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />

            </div>}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<OrganizationRegistration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/create-application' element={<Application />} />
                <Route path="/application-details/:openingId" element={<ApplicationDetails />} />
                <Route path="/applicant/:id" element={<ApplicantArea />} />
            </Routes>
        </>
    );
};

export default App;
