// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe332PILyvaRbCFJJ5YfgZfBXLojZ66ZQ",
  authDomain: "arre-caballito.firebaseapp.com",
  projectId: "arre-caballito",
  storageBucket: "arre-caballito.firebasestorage.app",
  messagingSenderId: "471583478184",
  appId: "1:471583478184:web:55760e0ea3c129988e0d9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};