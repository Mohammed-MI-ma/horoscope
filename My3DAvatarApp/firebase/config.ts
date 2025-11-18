// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_d5dLX_dpU883dNSi12BTXdSbIkQXcO4",
  authDomain: "nojoum-4d990.firebaseapp.com",
  projectId: "nojoum-4d990",
  storageBucket: "nojoum-4d990.firebasestorage.app",
  messagingSenderId: "224669170130",
  appId: "1:224669170130:web:d8b51cefadc3300861300b",
  measurementId: "G-L3GHTRBNWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, app };

