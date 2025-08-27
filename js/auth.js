// js/auth.js
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const authForm = document.getElementById("authForm");
const messageEl = document.getElementById("message");

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const pseudo = document.getElementById("pseudo").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Essaye de se connecter
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Connecté:", userCredential.user);
    window.location.href = "chat.html"; // Redirection immédiate
  } catch {
    // Sinon crée le compte
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Stocker le pseudo dans Firestore
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        email,
        pseudo
      });
      console.log("Utilisateur créé:", userCredential.user);
      window.location.href = "chat.html"; // Redirection immédiate après signup
    } catch (err) {
      messageEl.textContent = err.message;
      return;
    }
  }
});

// Optionnel : sécurité supplémentaire si page ouverte avec utilisateur déjà connecté
onAuthStateChanged(auth, user => {
  if(user) {
    // Si l'utilisateur est déjà connecté, il arrive directement sur chat.html
    if(window.location.pathname.endsWith("index.html")) {
      window.location.href = "chat.html";
    }
  }
});
