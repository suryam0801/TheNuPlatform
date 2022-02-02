// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHn-k8vX-g2x2jiqQxQAlLDTqHORA6HzA",
  authDomain: "influencer-fan-comm-app.firebaseapp.com",
  databaseURL: "https://influencer-fan-comm-app-default-rtdb.firebaseio.com/",
  projectId: "influencer-fan-comm-app",
  storageBucket: "influencer-fan-comm-app.appspot.com",
  messagingSenderId: "934582644975",
  appId: "1:934582644975:web:76aef5c6b452ec0ccc2b1a",
  measurementId: "G-XCJGV3PK89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase();;
export const auth = getAuth()