import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB30AdgfAlPvzoMFBGPywvD2cfnQgMx1mg",
  authDomain: "admin-d00ae.firebaseapp.com",
  projectId: "admin-d00ae",
  storageBucket: "admin-d00ae.appspot.com",
  messagingSenderId: "162247854825",
  appId: "1:162247854825:web:f55483837d97fb80d5be78",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, browserLocalPersistence);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = firebaseApp.firestore();

export { auth, firestore, storage, db };
