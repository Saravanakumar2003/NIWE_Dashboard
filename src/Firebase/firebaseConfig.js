import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBR7HmvcXnOhCVuV2lXxTE3g23EjOCtpug",
    authDomain: "niwedashboard.firebaseapp.com",
    projectId: "niwedashboard",
    storageBucket: "niwedashboard.appspot.com",
    messagingSenderId: "127247112574",
    appId: "1:127247112574:web:93e4f01b39920a224f7b2f",
    measurementId: "G-RKWHDL8FH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
