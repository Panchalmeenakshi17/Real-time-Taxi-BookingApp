// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8QHZj8ramYpegiaAL67pLSP0_mTmYKnQ",
  authDomain: "database-955fd.firebaseapp.com",
  projectId: "database-955fd",
  storageBucket: "database-955fd.appspot.com",
  messagingSenderId: "394900471355",
  appId: "1:394900471355:web:d971bc794a0e64dc8ca61e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the firestore

export const db = getFirestore(app);