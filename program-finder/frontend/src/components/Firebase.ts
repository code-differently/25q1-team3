// /components/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqiosFhyoCYRrVQF9h3Zj-WDz6m28DEtA",
  authDomain: "cypher-e096b.firebaseapp.com",
  projectId: "cypher-e096b",
  storageBucket: "cypher-e096b.firebasestorage.app",
  messagingSenderId: "137364454757",
  appId: "1:137364454757:web:cfea2515244494b797b58c",
  measurementId: "G-RNBWFGJYC6"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Add Authentication Setup
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// TODO: Add Firebase Analytics when user tracking is needed.
