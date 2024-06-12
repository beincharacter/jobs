import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import bcrypt from 'bcryptjs';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import PhoneInput from 'react-phone-number-input';

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

    const sectorsList = ["Technology", "Finance", "Healthcare", "Education", "Hospitality", "Manufacturing", "Retail", "Transportation", "Other"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value
        });
    };

    const handleSectorSelect = (sector) => {
        if (!formData.selectedSectors.includes(sector)) {
            setFormData({
                ...formData,
                selectedSectors: [...formData.selectedSectors, sector],
                sector: ""
            });
        }
    };

    const handleSectorRemove = (sectorToRemove) => {
        setFormData({
            ...formData,
            selectedSectors: formData.selectedSectors.filter(sector => sector !== sectorToRemove)
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { email, password, ...userData } = formData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            localStorage.setItem('jwtToken', idToken);

            await setDoc(doc(firestore, "users", user.uid), {
                email: email,
                password: hashedPassword,
                ...userData
            });
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <>
            <div className="flex flex-wrap content-start w-full h-full overflow-auto p-4">
                <h3 className="w-full pb-4">Register here</h3>
                <section className="flex w-full h-full">
                    <div className="mb-4">
                        <label htmlFor="email" className="flex text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="flex text-gray-700 font-bold mb-2">Phone</label>
                        <PhoneInput
                            international
                            defaultCountry="IN"
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="password" className="flex text-gray-700 font-bold mb-2">password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="organization_name" className="flex text-gray-700 font-bold mb-2">organization name</label>
                        <input
                            id="organization_name"
                            name="organization_name"
                            placeholder="organization name"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="organization_logo" className="flex text-gray-700 font-bold mb-2">organization logo</label>
                        <input
                            type="file"
                            id="organization_logo"
                            name="organization_logo"
                            placeholder="organization logo"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sector" className="flex text-gray-700 font-bold mb-2">Sector</label>
                        <input
                            id="sector"
                            name="sector"
                            placeholder="Type and select sectors"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.sector}
                            onChange={handleChange}
                        />
                        <div className="mt-2">
                            {formData.selectedSectors.map((sector, index) => (
                                <div key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    {sector}
                                    <button onClick={() => handleSectorRemove(sector)} className="ml-2 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zm-3.707-7.293a1 1 0 00-1.414 1.414L8.586 10l-3.707 3.707a1 1 0 101.414 1.414L10 11.414l3.707 3.707a1 1 0 001.414-1.414L11.414 10l3.707-3.707a1 1 0 00-1.414-1.414L10 8.586 6.293 4.879a1 1 0 00-1.414 1.414L8.586 10 4.879 13.707z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            {formData.sector &&

                                sectorsList
                                    .filter(sector => sector.toLowerCase().includes(formData.sector.toLowerCase()))
                                    .map((sector, index) => (
                                        <div
                                            key={index}
                                            className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-1 text-sm text-gray-700"
                                            onClick={() => handleSectorSelect(sector)}
                                        >
                                            {sector}
                                        </div>
                                    ))}
                        </div>
                    </div>

                    <div className="mb-4"><div className="mb-4">
                        <label htmlFor="street" className="flex text-gray-700 font-bold mb-2">Street</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            placeholder="Street"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={formData.address.street}
                            onChange={handleChange}
                            required
                        />
                    </div>

                        <div className="mb-4">
                            <label htmlFor="city" className="flex text-gray-700 font-bold mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.address.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="state" className="flex text-gray-700 font-bold mb-2">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="State"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.address.state}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="postal_code" className="flex text-gray-700 font-bold mb-2">Postal Code</label>
                            <input
                                type="text"
                                id="postal_code"
                                name="postal_code"
                                placeholder="Postal Code"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.address.postal_code}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="country" className="flex text-gray-700 font-bold mb-2">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Country"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={formData.address.country}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>



                </section>
            </div>
        </>
    );
};

export default Registration;
