// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If using Firestore
import {VITE_FIREBASE_API_KEY,VITE_FIREBASE_APP_ID,VITE_FIREBASE_AUTH_DOMAIN,VITE_FIREBASE_MESSAGING_SENDER_ID,VITE_FIREBASE_PROJECT_ID,VITE_FIREBASE_STORAGE_BUCKET} from "@/config"

const firebaseConfig = {
    apiKey: VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_FIREBASE_PROJECT_ID,
    storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // If using Firestore

export { auth, db, googleProvider};
