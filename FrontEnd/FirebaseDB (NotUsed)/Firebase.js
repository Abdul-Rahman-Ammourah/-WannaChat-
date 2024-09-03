import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDcQHwxM7KVCgsqZyUJQF_FJ5ovgHpdYTE",
  authDomain: "wannachat-40f82.firebaseapp.com",
  projectId: "wannachat-40f82",
  storageBucket: "wannachat-40f82.appspot.com",
  messagingSenderId: "870345438519",
  appId: "1:870345438519:web:7044389e16475b916596b2",
  measurementId: "G-MWK9H47WXP"
};


let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize Firebase only if no app is initialized
} else {
  app = getApps()[0]; // Use the already initialized app
}

export const auth = getAuth(app);
export const db = getDatabase(app);
