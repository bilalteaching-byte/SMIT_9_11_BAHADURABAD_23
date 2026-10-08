import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
} from "firebase/auth"

import {
    collection,
    getFirestore,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAjwET92pH3NEt_irgVWHxZ7xttr5QB7hY",
    authDomain: "lostandfound-1f3af.firebaseapp.com",
    projectId: "lostandfound-1f3af",
    storageBucket: "lostandfound-1f3af.firebasestorage.app",
    messagingSenderId: "1024891654396",
    appId: "1:1024891654396:web:8af94e32fc6f8e1ef60779",
    measurementId: "G-YYPFPY88PL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const itemsRef = collection(db, "items")
export const usersRef = collection(db, "users")

