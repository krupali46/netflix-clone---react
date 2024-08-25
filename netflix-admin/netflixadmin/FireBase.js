// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIAgHv4fgw55Hb-rVEy7cvGasVnlEuHZw",
  authDomain: "netflix-clone-e31a0.firebaseapp.com",
  projectId: "netflix-clone-e31a0",
  storageBucket: "netflix-clone-e31a0.appspot.com",
  messagingSenderId: "684791802666",
  appId: "1:684791802666:web:11f7ee018235597cbccc53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

export {auth , db}