import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkFfW2NJFU9P9i6iWCCy20qbq_HZZNuAU",
  authDomain: "react-app-todo-3ad07.firebaseapp.com",
  projectId: "react-app-todo-3ad07",
  storageBucket: "react-app-todo-3ad07.appspot.com",
  messagingSenderId: "422056146654",
  appId: "1:422056146654:web:6f3760001be54ca0e4744f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db,
    app
}

