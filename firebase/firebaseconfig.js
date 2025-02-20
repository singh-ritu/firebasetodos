"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  addDoc,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};
const addUserToFirestore = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("User added to Firestore successfully");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const dbRef = ref(database, "isMaintenanceModeOn");

function initialiseFirebaseRealtimeDB(callback) {
  console.log(dbRef);
  console.log("init firebase");
  onValue(dbRef, snapshot => {
    console.log({ snapshot, dbRef });
    if (snapshot.exists()) {
      const isMaintenanceModeOn = snapshot.val();
      console.log({ isMaintenanceModeOn });
      callback(isMaintenanceModeOn);
    } else {
      callback({ isMaintenanceModeOn: false });
    }
  });
}

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  addUserToFirestore,
  signInWithEmailAndPassword,
  analytics,
  onAuthStateChanged,
  updateProfile,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  addDoc,
  orderBy,
  getDocs,
  set,
  initialiseFirebaseRealtimeDB,
};
