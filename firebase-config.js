import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDoojaZL4mm5UPV5ItGnVNRec_kwTxxUHM",
    authDomain: "burundi-people-registry.firebaseapp.com",
    projectId: "burundi-people-registry",
    storageBucket: "burundi-people-registry.firebasestorage.app",
    messagingSenderId: "950398020642",
    appId: "1:950398020642:web:9f428b5eb56af7f2946e7b",
    measurementId: "G-EXQLH9RBF7"
};


// Initialisation Firebase
const app = initializeApp(firebaseConfig);


// Authentication
const auth = getAuth(app);


// Firestore
const db = getFirestore(app);


// Export
export { app, auth, db };