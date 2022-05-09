// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB52fj4wfJKdHMvAMm0AXpJQ6UzQhZ_k2w",
  authDomain: "argo-bug-tracker.firebaseapp.com",
  projectId: "argo-bug-tracker",
  storageBucket: "argo-bug-tracker.appspot.com",
  messagingSenderId: "87404694545",
  appId: "1:87404694545:web:e12902e60ffe0be3f6f5b0",
  measurementId: "G-ERX94WFPLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);