// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlWe79DAUvtEZ-YKi7VxpCOfT38k9WHLM",
  authDomain: "vsconfefitaria.firebaseapp.com",
  projectId: "vsconfefitaria",
  storageBucket: "vsconfefitaria.firebasestorage.app",
  messagingSenderId: "25620274794",
  appId: "1:25620274794:web:3851f983c9ed49f9ae7413"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Formulário de login
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      alert('Login realizado com sucesso!');
      window.location.href = 'dashboard.html'; // redireciona para dashboard
    })
    .catch((error) => {
      alert('Erro no login: ' + error.message);
    });
});