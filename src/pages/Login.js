import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
    const cardRef = useRef(null);
    const observer = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const prevIsVisible = useRef(isVisible);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const callback = (entries) => {
            entries.forEach(entry => {
                const currentIsVisible = entry.isIntersecting;
                if (prevIsVisible.current !== currentIsVisible) {
                    setIsVisible(currentIsVisible);
                    prevIsVisible.current = currentIsVisible;
                }
            });
        };

        observer.current = new IntersectionObserver(callback, options);

        if (cardRef.current) {
            observer.current.observe(cardRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <>
            <div className="relative flex flex-col items-center w-screen h-screen overflow-y-auto custom-scrollbar">

                {/* On scroll header */}
                <header className={`fixed top-0 right-0 flex space-x-8 text-lg rounded-full border border-[#ffffff28] p-4 mt-4 transition-transform duration-500 w-fit left-1/2 -translate-x-1/2 bg-blue-200 text-black ${isVisible ? '-translate-y-52' : 'translate-y-0'}`}>
                    <nav className="cursor-pointer hover p-2">Home</nav>
                    <nav className="cursor-pointer hover p-2">Jobs</nav>
                    <nav className="cursor-pointer hover p-2">About</nav>
                    <nav className="cursor-pointer hover p-2">Contacts</nav>
                </header>

                {/* On load header */}
                <header className="flex justify-between items-center p-4 w-full bg-[#FFFF82] text-black">
                    <div className="flex items-center">
                        <img src="https://via.placeholder.com/32" alt="Logo" className="h-8 w-8 mr-2" />
                    </div>
                    <div className="flex space-x-8 text-lg rounded-full border border-[#ffffff28] p-4">
                        <nav className="cursor-pointer hover p-2">Home</nav>
                        <nav className="cursor-pointer hover p-2">Jobs</nav>
                        <nav className="cursor-pointer hover p-2">About</nav>
                        <nav className="cursor-pointer hover p-2">Contacts</nav>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="h-8 w-8 mr-2" />
                    </div>
                </header>

                {/* Landing Page Section */}
                <div className="flex w-full h-[600px] bg-[#FFFF82] min-h-[600px] text-black p-4 flex-col items-center justify-center" ref={cardRef}>
                    <h1 className="text-4xl font-bold mb-4 text-center">Connect. Collaborate. Conquer Your Career</h1>
                    <p className="text-lg text-center max-w-2xl">Where opportunities meet ambition. Post jobs, showcase your skills, and collaborate for success.</p>
                </div>

                {/* About Us Section */}
                <section className="flex flex-col items-center w-full p-8 bg-gray-100 text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Empowering Connections, Elevating Careers</h2>
                    <p className="text-center max-w-4xl">Welcome to TalentHub, the premier hiring and collaboration platform designed to bridge the gap between companies and top-tier talent. Our mission is to streamline the hiring process while fostering a community where professionals can connect, share insights, and grow together. Whether you're looking to fill a position or find your dream job, TalentHub is your go-to destination for career success.</p>
                </section>

                {/* How It Works Section */}
                <section className="flex flex-col items-center w-full p-8 bg-white text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center border-b border-black">Simplified Hiring and Seamless Collaboration</h2>
                    <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl gap-[16px]">
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-2xl font-bold mb-2 text-center md:text-left">For Companies:</h3>
                            <ul className="list-disc list-inside text-center md:text-left">
                                <li>Post Jobs Easily: Create detailed job postings to attract the right talent.</li>
                                <li>Visualize Applicant Data: Access insightful data visualizations to make informed hiring decisions.</li>
                                <li>Engage with Talent: Communicate directly with candidates and streamline your hiring process.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-center md:text-left">For Candidates:</h3>
                            <ul className="list-disc list-inside text-center md:text-left">
                                <li>Showcase Your Skills: Create a profile that highlights your experience and expertise.</li>
                                <li>Engage and Collaborate: Share posts, insights, and collaborate with industry professionals.</li>
                                <li>Find Your Fit: Explore job opportunities and connect with companies that align with your career goals.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="flex flex-col items-center w-full p-8 bg-gray-100 text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Why Choose TalentHub?</h2>
                    <ul className="list-disc list-inside max-w-4xl text-center">
                        <li>Dynamic Job Postings: Create, manage, and update job listings with ease.</li>
                        <li>Interactive Profiles: Candidates can create comprehensive profiles showcasing their skills and experiences.</li>
                        <li>Data Visualization: Companies can view applicant data in a clear, visual format to streamline the decision making process.</li>
                        <li>Collaborative Community: Engage with industry professionals, share insights, and grow your network.</li>
                        <li>User-Friendly Interface: Navigate our platform effortlessly, whether you're posting a job or applying for one.</li>
                    </ul>
                </section>

                {/* Testimonials Section */}
                <section className="flex flex-col items-center w-full p-8 bg-white text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Success Stories</h2>
                    <div className="max-w-4xl text-center">
                        <blockquote className="mb-4 text-lg italic">"Finding the right talent has never been easier. TalentHub provides all the tools we need to make informed hiring decisions quickly." - Shubham Pal</blockquote>
                        <blockquote className="text-lg italic">"As a job seeker, I love the ability to showcase my skills and connect with potential employers directly. TalentHub has been a game-changer for my career." - Shaksham Malhotra</blockquote>
                    </div>
                </section>

                {/* Contact Us Section */}
                <section className="flex flex-col items-center w-full p-8 bg-gray-100 text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Get in Touch</h2>
                    <p className="text-center max-w-4xl mb-4">Have questions or need assistance? Our team is here to help! Reach out to us at [email address] or fill out the contact form below. We look forward to hearing from you and assisting you in your journey with TalentHub.</p>
                </section>

            </div>
        </>
    );
};
