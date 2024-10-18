// Import the functions you need from the SDKs you need
import{ initializeApp } from "firebase/app";
import{ getAnalytics } from "firebase/analytics";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig ={
    apiKey:"AIzaSyCSzXvyEh5FsoDiQnZP-8ZRj4YP7jHh8ps",
    authDomain : "trendmart-29aed.firebaseapp.com" ,
    projectId:"trendmart-29aed",
    storageBucket:"trendmart-29aed.appspot.com",
    messagingSenderId:"780505274946",
    appId:"1:780505274946:web:025bc41ee0f4bc9eb4ebdb",
    measurementId:"G-TYC25PZ120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt : "select_account "
});
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


// Helper function for signing in with email and password
export const signInWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};
export { sendPasswordResetEmail };
