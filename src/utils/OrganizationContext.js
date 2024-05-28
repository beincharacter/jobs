import React, { createContext, useState, useContext, useEffect } from "react";
import FirebaseService from "./firebaseService";

const OrganizationContext = createContext();

export const useOrganization = () => useContext(OrganizationContext);

export const OrganizationProvider = ({ children }) => {
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const func = async () => {
      const orgDetails = await FirebaseService.checkOrganizationExistsByEmail(localStorage.getItem("userEmail"));
      await setOrganization(orgDetails[0]);
    };
    func();
  })

  return (
    <OrganizationContext.Provider
      value={{ organization, loading,
        setORgDetails: async (data) => {
            await setOrganization(data)
        }
    
       }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
