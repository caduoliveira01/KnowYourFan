// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0oP4bgPbAKTmG_UEd8sgb3xZx3eQNCWA",
  authDomain: "knowyourfan-972af.firebaseapp.com",
  projectId: "knowyourfan-972af",
  storageBucket: "knowyourfan-972af.firebasestorage.app",
  messagingSenderId: "117629525416",
  appId: "1:117629525416:web:42acff59da2ae8a38b119d",
  measurementId: "G-9YJWLEXF6C",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
