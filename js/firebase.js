// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3YMyzydVHpZyAsj5fZIe-_UD9YZyywRI",
  authDomain: "forum1337uhq.firebaseapp.com",
  projectId: "forum1337uhq",
  storageBucket: "forum1337uhq.firebasestorage.app",
  messagingSenderId: "722138658666",
  appId: "1:722138658666:web:a5f07d96437898ad391713",
  measurementId: "G-PV750EVR86"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
