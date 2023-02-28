// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa3JfJT13jfDiXmevDzyDEAFiRlNGWvkM",
  authDomain: "domotica-abbd1.firebaseapp.com",
  projectId: "domotica-abbd1",
  storageBucket: "domotica-abbd1.appspot.com",
  messagingSenderId: "422242706418",
  appId: "1:422242706418:web:6e38a105488dc0a138c16b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const dameDocumentos = (ref) => getDocs(collection(db, ref));
export const onDameDocumentos = (ref, callback) =>
  onSnapshot(collection(db, ref), callback);
export const buscaDoc = (ref, id) => getDoc(doc(db, ref, id));
export const modificaInfo = (ref, id, obj) => updateDoc(doc(db, ref, id), obj);

//Cambios de un documento
export const onCambioDoc = (ref, id, callback) =>
  onSnapshot(doc(db, ref, id), callback);
