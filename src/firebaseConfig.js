import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.REACT_APP_env.authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
