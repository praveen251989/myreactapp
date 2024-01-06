// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOt5htF_h_TzFp7otiMnMejrQgqAxdzWQ",
  authDomain: "quizzlet-9904e.firebaseapp.com",
  projectId: "quizzlet-9904e",
  storageBucket: "quizzlet-9904e.appspot.com",
  messagingSenderId: "456480298429",
  appId: "1:456480298429:web:189be743ade6f02e956ed4",
  measurementId: "G-0SHG95D7D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);