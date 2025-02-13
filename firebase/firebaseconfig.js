// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_v2MAxekmsOBaloDWShqcyZVuL5OzT0o",
  authDomain: "todos-13d6e.firebaseapp.com",
  projectId: "todos-13d6e",
  storageBucket: "todos-13d6e.firebasestorage.app",
  messagingSenderId: "1088851123699",
  appId: "1:1088851123699:web:b6b562a75470c613488686",
  measurementId: "G-VQ5ZYCCYCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
