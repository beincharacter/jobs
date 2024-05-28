import React, { createContext, useState, useEffect, useContext } from "react";
import { firestore } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const OrganizationContext = createContext();

export const useOrganization = () => useContext(OrganizationContext);

export const OrganizationProvider = ({ children }) => {
  const [organization, setOrganization] = useState({});
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     const fetchOrganizationData = async () => {
  //         const email = localStorage.getItem('userEmail');
  //         if (!email) {
  //             console.error('No user email found.');
  //             return;
  //         }

  //         try {
  //             const organizationQuery = query(collection(firestore, 'organizations'), where('email', '==', email));
  //             const organizationSnapshot = await getDocs(organizationQuery);
  //             if (!organizationSnapshot.empty) {
  //                 organizationSnapshot.forEach((doc) => {
  //                     setOrganization(doc.data());
  //                 });
  //             }
  //         } catch (error) {
  //             console.error('Error fetching organization data:', error);
  //         }
  //     };

  //     const fetchForms = async () => {
  //         if (organization) {
  //             try {
  //                 const formsQuery = query(collection(firestore, 'forms'), where('organizationId', '==', organization.id));
  //                 const formsSnapshot = await getDocs(formsQuery);
  //                 const formsData = [];
  //                 formsSnapshot.forEach((doc) => {
  //                     formsData.push(doc.data());
  //                 });
  //                 setForms(formsData);
  //                 setLoading(false);
  //             } catch (error) {
  //                 console.error('Error fetching forms:', error);
  //             }
  //         }
  //     };

  //     fetchOrganizationData();
  //     fetchForms();
  // }, [organization]);

  return (
    <OrganizationContext.Provider
      value={{ organization, forms, loading,
        setORgDetails: async (data) => {
            await setOrganization(data)
        }
    
       }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
