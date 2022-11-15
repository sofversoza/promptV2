import { initializeApp } from "firebase/app"
import { getFirestore, serverTimestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDlEGnUbsBRi96ppkApa-c_xGNn887bmJk",
  authDomain: "promptv2.firebaseapp.com",
  projectId: "promptv2",
  storageBucket: "promptv2.appspot.com",
  messagingSenderId: "933290883689",
  appId: "1:933290883689:web:4d79135d9d715d0fb580f8"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init firebase services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// timestamp
const timestamp = serverTimestamp()

export { app, auth, db, storage, timestamp }