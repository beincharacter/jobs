import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import bcrypt from 'bcryptjs';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import PhoneInput from 'react-phone-number-input';
import { motion, AnimatePresence } from "framer-motion";
import 'react-phone-number-input/style.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        organization_name: "",
        organization_logo: "",
        sector: "",
        address: {
            street: "",
            city: "",
            state: "",
            postal_code: "",
            country: ""
        },
        phone: "",
        selectedSectors: []
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);

    const steps = [
        { name: "Email", field: "email" },
        { name: "Phone", field: "phone" },
        { name: "Password", field: "password" },
        { name: "Organization Name", field: "organization_name" },
        { name: "Organization Logo", field: "organization_logo" },
        { name: "Sector", field: "sector" },
        { name: "Street", field: "address.street" },
        { name: "City", field: "address.city" },
        { name: "State", field: "address.state" },
        { name: "Postal Code", field: "address.postal_code" },
        { name: "Country", field: "address.country" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value
        });
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.section
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-row items-center w-full max-w-md absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                >

                    <button onClick={handlePrevious} disabled={currentStep === 0} className={`p-2 ${currentStep === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <svg
                            className={`w-6 h-6 ${currentStep === 0 ? 'text-gray-400' : 'text-blue-500 hover:text-blue-700'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <div className="mb-4 w-full">
                        <label htmlFor={steps[currentStep].field} className="flex text-gray-700 font-bold mb-2">{steps[currentStep].name}</label>
                        {steps[currentStep].field === "phone" ? (
                            <PhoneInput
                                international
                                defaultCountry="IN"
                                id={steps[currentStep].field}
                                name={steps[currentStep].field}
                                placeholder={`Enter ${steps[currentStep].name}`}
                                value={formData[steps[currentStep].field]}
                                onChange={handlePhoneChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        ) : (
                            <input
                                type={steps[currentStep].field === "password" ? "password" : "text"}
                                id={steps[currentStep].field}
                                name={steps[currentStep].field}
                                placeholder={`Enter ${steps[currentStep].name}`}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={steps[currentStep].field.includes('address.') ? formData.address[steps[currentStep].field.split('.')[1]] : formData[steps[currentStep].field]}
                                onChange={handleChange}
                                required
                            />
                        )}
                    </div>
                    <button onClick={handleNext} disabled={currentStep === steps.length - 1} className={`p-2 ${currentStep === steps.length - 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <svg
                            className={`w-6 h-6 ${currentStep === steps.length - 1 ? 'text-gray-400' : 'text-blue-500 hover:text-blue-700'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </motion.section>
            </AnimatePresence>
        </div>
    );
};

export default Registration;
