import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB30AdgfAlPvzoMFBGPywvD2cfnQgMx1mg",
  authDomain: "admin-d00ae.firebaseapp.com",
  projectId: "admin-d00ae",
  storageBucket: "admin-d00ae.appspot.com",
  messagingSenderId: "162247854825",
  appId: "1:162247854825:web:f55483837d97fb80d5be78",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, browserLocalPersistence);
const firestore = getFirestore(app);

export { auth, firestore };
