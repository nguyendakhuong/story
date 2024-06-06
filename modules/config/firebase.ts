import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyw1o-_rv9gNwXHfimrIx2xP-1WqJnzRk",
  authDomain: "story-e3838.firebaseapp.com",
  projectId: "story-e3838",
  storageBucket: "story-e3838.appspot.com",
  messagingSenderId: "842211924313",
  appId: "1:842211924313:web:6f8572111d6411c8b51448",
  measurementId: "G-DD2JCEN0D0",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRE_STORE_DB = getFirestore(FIREBASE_APP);
