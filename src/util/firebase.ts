// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSO9WgaXTs6KgoRSSDBIUgEmaoVhU9tWE",
    authDomain: "splash-c7e1e.firebaseapp.com",
    projectId: "splash-c7e1e",
    storageBucket: "splash-c7e1e.appspot.com",
    messagingSenderId: "229112237411",
    appId: "1:229112237411:web:f2ad3eb924226e46d81756",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const fs = getFirestore(app);
export const auth = getAuth(app);
