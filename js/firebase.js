
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    reload,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
    limit,
    serverTimestamp,
    where
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

let config;

try {
    config = (
        await import("./firebase-config.js")
    ).firebaseConfig;
} catch (error) {
    console.error("Firebase config could not load:", error);
    config = null;
}

export const firebaseReady =
    !!config &&
    !!config.apiKey &&
    !String(config.apiKey).startsWith("YOUR_");

let app = null;

if (firebaseReady) {
    try {
        app = initializeApp(config);
    } catch (error) {
        console.error("Firebase initialization failed:", error);
    }
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

export const FB = {
    // Authentication
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    reload,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,

    // Firestore
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
    limit,
    serverTimestamp,
    where,

    // Storage
    ref,
    uploadBytes,
    getDownloadURL
};
