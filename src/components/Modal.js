import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export const JobPortalModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("register"); // State to track active tab (register or login)

  // Registration form state
  const [registrationFormData, setRegistrationFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    contactDetails: "",
    fullName: "",
    email: "",
    resume: "",
    skills: "",
  });

  // Login form state
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // Function to handle form input change for registration
  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form input change for login
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission for registration
  const handleRegistrationSubmit = () => {
    // Implement registration logic here
    console.log("Registration Form Data:", registrationFormData);
    // Close the modal after successful registration
    onClose();
  };

  // Function to handle form submission for login
  const handleLoginSubmit = () => {
    // Implement login logic here
    console.log("Login Form Data:", loginFormData);
    // Close the modal after successful login
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Job Portal</DialogTitle>
      <DialogContent>
        {activeTab === "register" ? (
          <>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={registrationFormData.companyName}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Industry"
              name="industry"
              value={registrationFormData.industry}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={registrationFormData.website}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Contact Details"
              name="contactDetails"
              value={registrationFormData.contactDetails}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={registrationFormData.fullName}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={registrationFormData.email}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Resume/CV"
              name="resume"
              value={registrationFormData.resume}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Skills"
              name="skills"
              value={registrationFormData.skills}
              onChange={handleRegistrationInputChange}
              margin="normal"
            />
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={loginFormData.username}
              onChange={handleLoginInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handleLoginInputChange}
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={activeTab === "register" ? handleRegistrationSubmit : handleLoginSubmit}
          color="primary"
        >
          {activeTab === "register" ? "Register" : "Login"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobPortalModal;
