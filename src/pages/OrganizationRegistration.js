import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import bcrypt from 'bcryptjs';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        organization_name: "",
        organization_logo: "",
        sector: [],
        address: {
            street: "",
            city: "",
            state: "",
            postal_code: "",
            country: ""
        },
        phone: "",
        website: "",
        description: "",
        founded_year: 0,
        number_of_employees: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { email, password, ...userData } = formData; // Extract email and password
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Pass email and password separately
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            console.log("JWT Token:", idToken);
            localStorage.setItem('jwtToken', idToken);
    
            // Store user credentials in Firestore
            await setDoc(doc(firestore, "users", user.uid), {
                email: email,
                password: hashedPassword,
                ...userData // Include additional user data
            });
        } catch (error) {
            console.error("Error registering:", error);
        }
    };
    


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Organization Registration</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="organization_name"
                    placeholder="Organization Name"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.organization_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="organization_logo"
                    placeholder="Organization Logo URL"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.organization_logo}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="sector"
                    placeholder="Sectors (comma-separated)"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.sector.join(",")}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value.split(",") })}
                    required
                />
                <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.address.street}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.address.city}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                    required
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.address.state}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                    required
                />
                <input
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.address.postal_code}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, postal_code: e.target.value } })}
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.address.country}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="website"
                    placeholder="Website URL"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.website}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="founded_year"
                    placeholder="Founded Year"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.founded_year}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="number_of_employees"
                    placeholder="Number of Employees"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    value={formData.number_of_employees}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;

