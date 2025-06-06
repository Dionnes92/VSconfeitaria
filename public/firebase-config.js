// firebase-config.js
// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";  // Importando Firestore

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlWe79DAUvtEZ-YKi7VxpCOfT38k9WHLM",
  authDomain: "vsconfefitaria.firebaseapp.com",
  projectId: "vsconfefitaria",
  storageBucket: "vsconfefitaria.firebasestorage.app",
  messagingSenderId: "25620274794",
  appId: "1:25620274794:web:3851f983c9ed49f9ae7413"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);

// Inicializando Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);  // Inicializando Firestore

export { auth, db };
