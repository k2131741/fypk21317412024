// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase, ref, set } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADi2po3OFfxoFtvy4Dl1374plg456Tq2E",
  authDomain: "fypproject-52d25.firebaseapp.com",
  databaseURL: "https://fypproject-52d25-default-rtdb.firebaseio.com",
  projectId: "fypproject-52d25",
  storageBucket: "fypproject-52d25.appspot.com",
  messagingSenderId: "798789902385",
  appId: "1:798789902385:web:6f3f45d39e11ea26223510",
  measurementId: "G-8Z2SFKPFY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);

export function writeUserData(userId, email, firstname, lastname) {
  const db = getDatabase(app);
  const reference = ref(db, 'users/' + userId);

  set(reference, {
    email: email,
    firstName: firstname,
    lastName: lastname
  }).then(() => {
    console.log("Data successfully written to the database.");
  }).catch((error) => {
    console.error("Error writing data to the database:", error);
  });
}

export function stripSpecialSymbols(email) {
  
  const regex = /[a-zA-Z0-9]+/g;
  
  return email.match(regex).join('');
}
// Example usage
