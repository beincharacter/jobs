import { firestore } from "../firebase";
import { collection, query, where, getDocs, getDoc, addDoc, doc } from "firebase/firestore";

const FirebaseService = {
    checkOrganizationExistsByName: async (orgName) => {
        try {
            const q = query(collection(firestore, "organizations"), where("orgName", "==", orgName));
            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty;
        } catch (error) {
            console.error("Error checking organization by name: ", error);
            throw error;
        }
    },
    
    checkOrganizationExistsByEmail: async (email) => {
        try {
            const q = query(collection(firestore, "organizations"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const orgData = [];
                querySnapshot.forEach((doc) => {
                    orgData.push({ id: doc.id, ...doc.data() });
                });
                return orgData;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error checking organization by email: ", error);
            throw error;
        }
    },

    registerOrganization: async (email, orgName, orgType) => {
        try {
            await addDoc(collection(firestore, "organizations"), {
                email,
                orgName,
                orgType
            });
        } catch (error) {
            console.error("Error registering organization: ", error);
            throw error;
        }
    },

    createOpening: async (openingData) => {
        try {
            await addDoc(collection(firestore, "openings"), openingData);
        } catch (error) {
            console.error("Error creating opening: ", error);
            throw error;
        }
    },
    
    getOpeningsFromFirebase: async (id) => {
        try {
            const q = query(collection(firestore, "openings"), where("companyId", "==", id));
            const querySnapshot = await getDocs(q);
            
            const orgData = [];
            querySnapshot.forEach((doc) => {
                orgData.push({ id: doc.id, ...doc.data() });
            });
            
            return orgData;
        } catch (error) {
            console.error("Error in getting openings: ", error);
            throw error;
        }
    },

    getApplicationDetails: async (id) => {
        try {
            const docRef = doc(collection(firestore, "openings"), id);
            
            // Fetch the document
            const docSnapshot = await getDoc(docRef);
            
            // Check if the document exists
            if (docSnapshot.exists()) {
                // Return the document data
                return { id: docSnapshot.id, ...docSnapshot.data() };
            } else {
                console.log("No matching document found");
                return null;
            }
        } catch (error) {
            console.error("Error fetching application details: ", error);
            throw error;
        }
    },

    submitApplication: async (applicationId, formData) => {
        try {
            // Add the applicationId to the formData object
            formData.applicationId = applicationId;

            // Add the applicant data to a separate collection named "applicants"
            await addDoc(collection(firestore, "applicants"), formData);
        } catch (error) {
            console.error("Error submitting application: ", error);
            throw error;
        }
    },

    getApplicantDetails: async (id) => {
        try {
            const q = query(collection(firestore, "applicants"), where("applicationId", "==", id));
            const querySnapshot = await getDocs(q);
            
            const applicantsData = [];
            querySnapshot.forEach((doc) => {
                applicantsData.push({ id: doc.id, ...doc.data() });
            });
            
            return applicantsData;
        } catch (error) {
            console.error("Error in getting openings: ", error);
            throw error;
        }
    },
    
    
    
};

export default FirebaseService;
