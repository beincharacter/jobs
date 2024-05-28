import React, { useState } from 'react';
import { firestore } from '../firebase';

const OrganizationForm = () => {
  const [orgName, setOrgName] = useState('');

  const handleRegister = () => {
    // Check if orgName already exists
    // If not, add organization to Firestore
    firestore.collection('organizations').add({ name: orgName });
  };

  return (
    <div>
      <h2>Register Your Organization</h2>
      <input
        type="text"
        placeholder="Organization Name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default OrganizationForm;
