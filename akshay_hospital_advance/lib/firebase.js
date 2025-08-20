// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAUs5FpQ1ryk6plDpFvJur7ZnoHqHXyqbY",
  authDomain: "akshayhopital.firebaseapp.com",
  projectId: "akshayhopital",
  storageBucket: "akshayhopital.firebasestorage.app",
  messagingSenderId: "1025812813255",
  appId: "1:1025812813255:web:06d66c65ded6231abc35e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
