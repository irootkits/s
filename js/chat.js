// js/chat.js
import { auth, db } from './firebase.js';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const chatForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");
const logoutBtn = document.getElementById("logout");

let pseudo = "";


onAuthStateChanged(auth, async user => {
  if(!user) window.location.href = "index.html";

  const usersSnapshot = await getDocs(collection(db, "users"));
  usersSnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if(data.uid === user.uid) pseudo = data.pseudo;
  });
});


chatForm.addEventListener("submit", async e => {
  e.preventDefault();
  const content = messageInput.value.trim();
  if(!content) return;

  await addDoc(collection(db, "messages"), {
    user: pseudo,
    content,
    timestamp: serverTimestamp()
  });

  messageInput.value = "";
});


onSnapshot(query(collection(db, "messages"), orderBy("timestamp", "asc")), snapshot => {
  messagesDiv.innerHTML = "";
  const now = new Date();
  snapshot.forEach(async docSnap => {
    const data = docSnap.data();
    const ts = data.timestamp ? data.timestamp.toDate() : new Date();
    const diff = now - ts;

    if(diff > 3600000){
      await deleteDoc(doc(db, "messages", docSnap.id));
      return;
    }

    const msgEl = document.createElement("div");
    msgEl.textContent = `${data.user}: ${data.content}`;
    messagesDiv.appendChild(msgEl);
  });
});


logoutBtn.addEventListener("click", () => {
  signOut(auth);
});
