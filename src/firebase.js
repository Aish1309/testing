// // src/firebase.js

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database'; // Use getDatabase for Realtime Database
// import { getStorage } from 'firebase/storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCqL7lnooyjmNGAOB5nc4yZcb6FKu8e-2A",
//   authDomain: "trafyai-loginsignup.firebaseapp.com",
//   projectId: "trafyai-loginsignup",
//   storageBucket: "trafyai-loginsignup.appspot.com",
//   messagingSenderId: "344792634329",
//   appId: "1:344792634329:web:d343ac2461dd2a731dffc8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// const auth = getAuth(app);
// const database = getDatabase(app); // For Realtime Database
// const storage = getStorage(app);


// export { auth, database, storage };

// // src/firebase.js

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';
// import { getDatabase } from 'firebase/database'; // Use getDatabase for Realtime Database
// import { getStorage } from 'firebase/storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCqL7lnooyjmNGAOB5nc4yZcb6FKu8e-2A",
//   authDomain: "trafyai-loginsignup.firebaseapp.com",
//   projectId: "trafyai-loginsignup",
//   storageBucket: "trafyai-loginsignup.appspot.com",
//   messagingSenderId: "344792634329",
//   appId: "1:344792634329:web:d343ac2461dd2a731dffc8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// const auth = getAuth(app);
// const database = getDatabase(app); // For Realtime Database
// const storage = getStorage(app);

// setPersistence(auth, inMemoryPersistence).then(() => {
//   console.log("Persistence set to inMemoryPersistence");
// }).catch((error) => {
//   console.error("Error setting persistence:", error);
// });
// export { auth, database, storage };



import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCqL7lnooyjmNGAOB5nc4yZcb6FKu8e-2A",
  authDomain: "trafyai-loginsignup.firebaseapp.com",
  projectId: "trafyai-loginsignup",
  storageBucket: "trafyai-loginsignup.appspot.com",
  messagingSenderId: "344792634329",
  appId: "1:344792634329:web:d343ac2461dd2a731dffc8",
  databaseURL: "https://trafyai-loginsignup-default-rtdb.firebaseio.com" // ✅ Add this line
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// const database = getDatabase(app);
const storage = getStorage(app);

// Set persistence to localStorage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to browserLocalPersistence");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, 
  // database, 
  storage };
