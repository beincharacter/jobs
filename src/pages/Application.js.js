import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../utils/OrganizationContext';
import FirebaseService from '../utils/firebaseService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const Application = () => {
    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { organization } = useOrganization();

    const handleSave = async () => {
        try {
            if (!title || !experience || !salaryRange || !location || !description) {
                toast.info("Please fill out all fields");
                return;
            }

            const openingData = {
                title,
                experience,
                salaryRange,
                location,
                description,
                companyId: organization.id
            };

            await FirebaseService.createOpening(openingData);
            navigate('/dashboard');
            toast.success("Application created");
        } catch (error) {
            console.error('Error saving application: ', error);
            setError('Error saving application. Please try again.');
            toast.error("Application creation failed");
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <span className='flex items-center w-full h-12 p-4 bg-lime-200'>Create New Job Opening</span>
            <div className='flex flex-1 overflow-hidden'>
                <div className='flex flex-col justify-start gap-4 items-center bg-lime-100 w-1/2 p-4 overflow-auto '>
                    <div className='flex flex-col justify-center gap-4 items-center bg-lime-100 w-full p-4 overflow-auto content-center'>

                        <input
                            className="w-full p-2 border-b rounded"
                            type="text"
                            placeholder="Title of Application"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border rounded"
                            type="number"
                            placeholder="Experience Required"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            min={0}
                            max={20}
                        />
                        <input
                            className="w-full p-2 border rounded"
                            type="number"
                            placeholder="Salary Range"
                            value={salaryRange}
                            onChange={(e) => setSalaryRange(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border rounded"
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* <button
                        className='h-12 bg-blue-500 text-white p-4 flex justify-center items-center'
                        onClick={handleSave}
                    >
                        Save Application
                    </button> */}
                </div>
                <div className="flex flex-col w-1/2">
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        placeholder="Description about Application"
                        className='flex-1'
                    />
                </div>

                <button
                    className='h-16 bg-blue-500 text-white fixed bottom-4 right-4'
                    onClick={handleSave}
                >
                    Save Application
                </button>
            </div>
        </div>
    );
};

export default Application;
