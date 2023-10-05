// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs2a9_S8svKjao0NI224gcOpUywMTsPKc",
  authDomain: "user-email-password-auth-47b7f.firebaseapp.com",
  projectId: "user-email-password-auth-47b7f",
  storageBucket: "user-email-password-auth-47b7f.appspot.com",
  messagingSenderId: "729746996749",
  appId: "1:729746996749:web:15373faa9e433530ec1f44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
