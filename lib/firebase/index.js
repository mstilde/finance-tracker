// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu0amJyhOuRYcZ1BoraR_Zf2aIPeTlljE",
  authDomain: "finance-tracker-87922.firebaseapp.com",
  projectId: "finance-tracker-87922",
  storageBucket: "finance-tracker-87922.firebasestorage.app",
  messagingSenderId: "516189412316",
  appId: "1:516189412316:web:e8f48304465b2f785c8d19",
  measurementId: "G-7SF026Y3S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};