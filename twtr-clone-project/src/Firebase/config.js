// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeozPkpHziPKTvpXNK9WOkZa5ixaS-PHQ",
  authDomain: "twitter-clone-95a8d.firebaseapp.com",
  projectId: "twitter-clone-95a8d",
  storageBucket: "twitter-clone-95a8d.appspot.com",
  messagingSenderId: "759501819165",
  appId: "1:759501819165:web:583ffb24fc74e8c1b0a5f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//yetkilendirme kurulum
export const auth = getAuth(app);

//google yetkilendirme kurulum
export const provider = new GoogleAuthProvider();

//veritabanı
export const db = getFirestore(app);

// medya'ları depolayıcğımız yer
export const storage = getStorage(app);
