// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkHhjmC5Cn2QDaz-Uwdsv29qmv6ybRpv8",
  authDomain: "enchantress-trip-planner.firebaseapp.com",
  projectId: "enchantress-trip-planner",
  storageBucket: "enchantress-trip-planner.firebasestorage.app",
  messagingSenderId: "445842661149",
  appId: "1:445842661149:web:53bec20120c1613d478bf4",
  measurementId: "G-MM2F9NND8F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
