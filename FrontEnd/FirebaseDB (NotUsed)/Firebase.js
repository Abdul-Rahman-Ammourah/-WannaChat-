import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  
};


let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize Firebase only if no app is initialized
} else {
  app = getApps()[0]; // Use the already initialized app
}

export const auth = getAuth(app);
export const db = getDatabase(app);
