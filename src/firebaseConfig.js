import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0zDYu3Ssgc4f0I6Nf2RumGq3rQU0C9Ds",
  authDomain: "chatgpt-f9406.firebaseapp.com",
  projectId: "chatgpt-f9406",
  storageBucket: "chatgpt-f9406.appspot.com",
  messagingSenderId: "1046472465213",
  appId: "1:1046472465213:web:7adf8859bd4265260e8354",
  measurementId: "G-W6EWW5H1LT"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
