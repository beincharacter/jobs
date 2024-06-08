import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Leaderboard } from "@mui/icons-material";
import MoveToTop from "../components/MoveToTop";

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

    let ORG_NAME = process.env.REACT_APP_ORG_NAME;
    
    // Dummy data for testimonials
    const testimonials = [
        {
            id: 1,
            user: "John Doe",
            company: "ABC Company",
            avatar: "https://via.placeholder.com/64",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            user: "Jane Smith",
            company: "XYZ Corporation",
            avatar: "https://via.placeholder.com/64",
            comment: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        // Add more testimonials as needed
    ];

    // Settings for react-slick carousel
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    // Dummy data for images next to "For Companies" and "For Candidates"
    const companyImage = "https://via.placeholder.com/200x200";
    const candidateImage = "https://via.placeholder.com/200x200";


    return (
        <>
            <div className="relative flex flex-col items-center w-screen h-screen overflow-y-auto custom-scrollbar">
                {/* On scroll header */}
                <header className={`fixed top-0 right-0 flex space-x-8 text-lg rounded-full border border-[#00000028] p-4 mt-4 transition-transform duration-500 w-fit left-1/2 -translate-x-1/2 bg-[#FFFF82] text-black ${isVisible ? '-translate-y-52' : 'translate-y-0'}`}>
                    <nav className="cursor-pointer hover">Home</nav>
                    <nav className="cursor-pointer hover">Jobs</nav>
                    <nav className="cursor-pointer hover">About</nav>
                    <nav className="cursor-pointer hover">Contacts</nav>
                </header>

                {/* On load header */}
                <header className="flex justify-between items-center p-4 w-full bg-[#FFFF82] text-black">
                    <div className="flex items-center">
                        <img src="https://via.placeholder.com/32" alt="Logo" className="h-8 w-8 mr-2" />
                    </div>
                    <div className="flex space-x-8 text-lg rounded-full border border-[#ffffff28] p-4">
                        <nav className="cursor-pointer hover">Home</nav>
                        <nav className="cursor-pointer hover">Jobs</nav>
                        {/* <nav className="cursor-pointer hover">About</nav> */}
                        <Link to="/about" className="cursor-pointer hover">About</Link>
                        <nav className="cursor-pointer hover">Contacts</nav>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="h-8 w-8 mr-2" />
                    </div>
                </header>

                {/* Hero Header Section */}
                <div className="flex w-full h-[600px] bg-[#FFFF82] min-h-[600px] text-black p-4 flex-col items-center justify-center" ref={cardRef}>
                    <h1 className="text-4xl font-bold mb-4 text-center">Connect. Collaborate. Conquer Your Career</h1>
                    <p className="text-lg text-center max-w-2xl">Where opportunities meet ambition. Post jobs, showcase your skills, and collaborate for success.</p>
                    <div className="flex gap-4 w-fit">
                        <button className="p-4 border border-black rounded-full hover">Hire a Talent</button>
                        <button className="p-4 border border-black rounded-full hover">Apply as a Talent</button>
                    </div>
                </div>

                {/* About Us Section */}
                <section className="flex flex-col items-center w-full p-8 bg-gray-100 text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Empowering Connections, Elevating Careers</h2>
                    <p className="text-center max-w-4xl">Welcome to {ORG_NAME}, the premier hiring and collaboration platform designed to bridge the gap between companies and top-tier talent. Our mission is to streamline the hiring process while fostering a community where professionals can connect, share insights, and grow together. Whether you're looking to fill a position or find your dream job, {ORG_NAME} is your go-to destination for career success.</p>
                </section>

                {/* How It Works Section */}
                <section className="flex flex-col items-center w-full p-8 bg-white text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Simplified Hiring and Seamless Collaboration</h2>
                    <div className="flex flex-col justify-around w-full max-w-7xl gap-[20px]">
                        <div className="mb-8 md:mb-0 flex w-full">
                            <div className="flex items-center justify-center mb-2 w-full">
                                <img src={companyImage} alt="For Companies" className="w-24 h-24 rounded-full mr-2" />
                                <span>For Companies</span>
                            </div>
                            <ul className="list-disc list-inside text-center md:text-left">
                                <li>Post Jobs Easily: Create detailed job postings to attract the right talent                                </li>
                                <li>Visualize Applicant Data: Access insightful data visualizations to make informed hiring decisions.</li>
                                <li>Engage with Talent: Communicate directly with candidates and streamline your hiring process.</li>
                            </ul>
                        </div>
                        <div className="flex flex-row-reverse w-full">
                            <div className="flex items-center justify-center mb-2 w-full">
                                <img src={candidateImage} alt="For Candidates" className="w-24 h-24 rounded-full mr-2" />
                                <span>For Candidates</span>
                            </div>
                            <ul className="list-disc list-inside text-center md:text-left w-full">
                                <li>Showcase Your Skills: Create a profile that highlights your experience and expertise.</li>
                                <li>Engage and Collaborate: Share posts, insights, and collaborate with industry professionals.</li>
                                <li>Find Your Fit: Explore job opportunities and connect with companies that align with your career goals.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Success Stories Section */}
                <section className="w-full p-8 bg-white text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Success Stories</h2>
                    <Slider {...settings}>
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="p-4">
                                <div className="flex items-center justify-center mb-2">
                                    <img src={testimonial.avatar} alt={testimonial.user} className="w-12 h-12 rounded-full mr-2" />
                                    <span>{testimonial.user}</span>
                                </div>
                                <blockquote className="text-lg italic">{testimonial.comment}</blockquote>
                            </div>
                        ))}
                    </Slider>
                </section>

                {/* Contact Us Section */}
                <section className="flex flex-col items-center w-full p-8 bg-gray-100 text-black">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Get in Touch</h2>
                    <p className="text-center max-w-4xl mb-4">Have questions or need assistance? Our team is here to help! Reach out to us at [email address] or fill out the contact form below. We look forward to hearing from you and assisting you in your journey with {ORG_NAME}.</p>
                </section>

                <Footer />
            </div>
            <MoveToTop />
        </>
    );
};

