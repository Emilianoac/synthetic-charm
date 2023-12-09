import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBCXO2rmcZC9w9DhJfFKCIj5c4Miye_jDk",
  authDomain: "on85765ski.firebaseapp.com",
  projectId: "on85765ski",
  storageBucket: "on85765ski.appspot.com",
  messagingSenderId: "379408596251",
  appId: "1:379408596251:web:fb2b6e43ded64dba18e7be"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db