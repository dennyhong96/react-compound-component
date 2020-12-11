import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "./dbSeed";

// Config
const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Init
const firebase = Firebase.initializeApp(config);

// Seeds database
// if (!localStorage.getItem("DB_SEEDED")) {
//   seedDatabase(firebase);
//   localStorage.setItem("DB_SEEDED", "TRUE");
// }

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firestore, auth };
