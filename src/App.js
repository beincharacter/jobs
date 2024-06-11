import React from 'react';
import "./base.scss";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { OrganizationProvider, useOrganization } from './utils/OrganizationContext';
import OrganizationRegistration from './pages/OrganizationRegistration';
import Dashboard from './pages/Dashboard';
import Application from './pages/Application.js';
import ApplicationDetails from './pages/ApplicationDetails.js';
import ApplicantArea from './pages/ApplicantArea.js';
import Header from './components/Header.js';
import { ColorRing } from 'react-loader-spinner';
import { Toaster } from './components/Toaster';
import AboutUs from './pages/AboutUs.js';
import { Footer } from './components/Footer.js';
import { Login } from './pages/Login.js';
import { Home } from './pages/Home.js';

const App = () => {
    return (
        <Router>
            <OrganizationProvider>
                <HeaderWrapper />
                <Toaster />
                <MainContent />
            </OrganizationProvider>
        </Router>
    );
};

const HeaderWrapper = () => {
    const location = useLocation();
    const shouldShowHeader = true

    return (
        <>
            {shouldShowHeader ? <Header /> : null}
        </>
    );
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
                <Route path="/" Component={Home} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={OrganizationRegistration} />
                <Route path="/dashboard" Component={Dashboard} />
                <Route path='/create-application' Component={Application} />
                <Route path="/application-details/:openingId" Component={ApplicationDetails} />
                <Route path="/application/:id" Component={ApplicantArea} />
                <Route path='/about' Component={AboutUs} />
            </Routes>
        </>
    );
};

export default App;
