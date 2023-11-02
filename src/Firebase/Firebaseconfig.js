import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCzVG3jExZXTbL789mQRxmxbJ14cJeCkrc",
  authDomain: "todolist-9a925.firebaseapp.com",
  projectId: "todolist-9a925",
  storageBucket: "todolist-9a925.appspot.com",
  messagingSenderId: "378190228085",
  appId: "1:378190228085:web:ce2319c73ee8f44e46663c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuth= new GoogleAuthProvider()
