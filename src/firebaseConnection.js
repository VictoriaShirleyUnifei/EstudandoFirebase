import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBbv1pXIzwO3sb71sCG9MdtvYFgtLlLHq0",
  authDomain: "projeto-firebase-445922.firebaseapp.com",
  projectId: "projeto-firebase-445922",
  storageBucket: "projeto-firebase-445922.firebasestorage.app",
  messagingSenderId: "149848817106",
  appId: "1:149848817106:web:52e98145ecf83cbb319c0b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};