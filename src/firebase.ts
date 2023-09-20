import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXSJjJcGk8tt_6Miq-izXaFFtBIwrZ3Ns",
  authDomain: "carrotchat-e9510.firebaseapp.com",
  projectId: "carrotchat-e9510",
  storageBucket: "carrotchat-e9510.appspot.com",
  messagingSenderId: "1053793267635",
  appId: "1:1053793267635:web:170c1b84945ede92dd25c6"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);
export const firebaseDB = getFirestore(app);