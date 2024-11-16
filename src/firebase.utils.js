// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword // Importa la función correctamente
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSzXvyEh5FsoDiQnZP-8ZRj4YP7jHh8ps",
    authDomain: "trendmart-29aed.firebaseapp.com",
    projectId: "trendmart-29aed",
    storageBucket: "trendmart-29aed.appspot.com",
    messagingSenderId: "780505274946",
    appId: "1:780505274946:web:025bc41ee0f4bc9eb4ebdb",
    measurementId: "G-TYC25PZ120", // Puedes eliminar esta línea si no usas Google Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// Whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: "select_account",
});

// Initialize Firestore
const db = getFirestore(app);

// Export the auth and db for use in other parts of the app
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Helper function for signing in with email and password
export const signInWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Helper function for creating a new user with email and password
export const createUserWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Firestore function to save user profile information
export const saveUserProfile = async (user) => {
    try {
        const userDocRef = doc(db, "users", user?.uid);
        await setDoc(userDocRef, {
            displayName: user?.displayName,
            email: user?.email,
        });
    } catch (error) {
        console.error("Error saving user profile:", error);
    }
};

// Export the password reset function
export { sendPasswordResetEmail };
