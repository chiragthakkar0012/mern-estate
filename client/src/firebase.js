// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-42cfa.firebaseapp.com",
  projectId: "mern-estate-42cfa",
  storageBucket: "mern-estate-42cfa.firebasestorage.app",
  messagingSenderId: "690766907027",
  appId: "1:690766907027:web:e0ce1c77eaac978d7d6f66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);