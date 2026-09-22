
/* ============================================================
   BURUNDI PEOPLE REGISTRY
   firebase-config.js
   ============================================================ */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


/* ============================================================
   FIREBASE CONFIGURATION
============================================================ */

export const firebaseConfig = {

    apiKey:
        "AIzaSyDoojaZL4mm5UPV5ItGnVNRec_kwTxxUHM",

    authDomain:
        "burundi-people-registry.firebaseapp.com",

    projectId:
        "burundi-people-registry",

    storageBucket:
        "burundi-people-registry.firebasestorage.app",

    messagingSenderId:
        "950398020642",

    appId:
        "1:950398020642:web:9f428b5eb56af7f2946e7b",

    measurementId:
        "G-EXQLH9RBF7"
};


/* ============================================================
   INITIALISATION FIREBASE
============================================================ */

const app =
    initializeApp(
        firebaseConfig
    );


/* ============================================================
   FIRESTORE
============================================================ */

const db =
    getFirestore(
        app
    );


/* ============================================================
   AUTHENTICATION
============================================================ */

const auth =
    getAuth(
        app
    );


/* ============================================================
   EXPORTS
============================================================ */

export {
    app,
    db,
    auth
};