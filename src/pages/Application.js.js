import React, { useState } from 'react';
import "../scss/Application.scss";
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../utils/OrganizationContext';
import FirebaseService from '../utils/firebaseService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
                setError('Please fill out all fields.');
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
        } catch (error) {
            console.error('Error saving application: ', error);
            setError('Error saving application. Please try again.');
        }
    };

    return (
        <div className="application-page">
            <h1>Create New Job Opening</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Title of Application"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Experience Required"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
            />
            <input
                type="number"
                placeholder="Salary Range"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />jhyhh
            <ReactQuill
                value={description}
                onChange={setDescription}
                placeholder="Description about Application"
                className='asas'
            />
            <button onClick={handleSave}>Save Application</button>
        </div>
    );
};

export default Application;
