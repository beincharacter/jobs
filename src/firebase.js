import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjIJx11ZY-BBNTv1Ft5iq7mQx2APHH-OM",
  authDomain: "applicationcreation-ad49c.firebaseapp.com",
  projectId: "applicationcreation-ad49c",
  storageBucket: "applicationcreation-ad49c.appspot.com",
  messagingSenderId: "545516013702",
  appId: "1:545516013702:web:8a9c8ce4652dd73562e907"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, provider, signInWithPopup, signOut, firestore, storage };
