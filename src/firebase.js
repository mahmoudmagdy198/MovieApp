// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1KkM6_VKoFt-cpxMFg_CfqanYf0VuCyk",
  authDomain: "movieapp-a2203.firebaseapp.com",
  projectId: "movieapp-a2203",
  storageBucket: "movieapp-a2203.appspot.com",
  messagingSenderId: "377518593411",
  appId: "1:377518593411:web:277fa7a1161d8c020392b6",
  databaseURL:"https://movieapp-a2203-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export {auth, db};