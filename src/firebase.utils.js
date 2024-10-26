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

// Export the password reset function
export { sendPasswordResetEmail };
