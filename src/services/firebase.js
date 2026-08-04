import { initializeApp } from 'firebase/app';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration from screenshot
const firebaseConfig = {
  apiKey: "AIzaSyCQQsTmBvHpHpUEhyA5WVUfKN8utzD3ZGH10",
  authDomain: "north-learn.firebaseapp.com",
  projectId: "north-learn",
  storageBucket: "north-learn.firebasestorage.app",
  messagingSenderId: "878993626704",
  appId: "1:878993626704:web:2d74b583f278e6fc78a355",
  measurementId: "G-VSCV5Q4LL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
