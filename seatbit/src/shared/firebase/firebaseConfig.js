// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzb_i5LHYJ5j03Uu6C2aHhwkYXfkif0zE",
  authDomain: "seatbite-af086.firebaseapp.com",
  projectId: "seatbite-af086",
  storageBucket: "seatbite-af086.firebasestorage.app",
  messagingSenderId: "238390817833",
  appId: "1:238390817833:web:dfd73f75888178bccc9838",
  measurementId: "G-62VGVNBMXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);