// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6U8f5rmUcXcq1qGa1YdYFVXs6j_V0oJ0",
  authDomain: "handicrafts-e38de.firebaseapp.com",
  projectId: "handicrafts-e38de",
  storageBucket: "handicrafts-e38de.appspot.com",
  messagingSenderId: "1003464922123",
  appId: "1:1003464922123:web:6977f8ca63479e34c3230e"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);