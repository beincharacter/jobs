import React, { createContext, useState, useContext, useEffect } from "react";
import FirebaseService from "./firebaseService";
import { useNavigate } from "react-router-dom";

const OrganizationContext = createContext();

export const useOrganization = () => useContext(OrganizationContext);

export const OrganizationProvider = ({ children }) => {
  const [organization, setOrganization] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const func = async () => {
      const orgDetails = await FirebaseService.checkOrganizationExistsByEmail(localStorage.getItem("userEmail"));
      if(orgDetails) setOrganization(orgDetails[0]);
      else {
        // setLoading(!loading);
        navigate("/");
      }
    };
    func();
  },[])

  return (
    <OrganizationContext.Provider
      value={{ organization, loading, setLoading,
        setORgDetails: async (data) => {
            await setOrganization(data)
        }
    
       }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
