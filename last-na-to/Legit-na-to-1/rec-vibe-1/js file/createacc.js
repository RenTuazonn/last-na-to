import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import { getDatabase, ref as dbRef, set as dbSet } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAvJKueNtBRrGFxXby-VRkOewdGEkiuGnQ",
  authDomain: "first-proj-a5fff.firebaseapp.com",
  projectId: "first-proj-a5fff",
  storageBucket: "first-proj-a5fff.appspot.com",
  messagingSenderId: "902560724938",
  appId: "1:902560724938:web:2956090fc8afb5ce888133",
  measurementId: "G-0VNSBVGRK7",
  databaseURL: "https://first-proj-a5fff-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication
const firestore = getFirestore(app); // Firestore
const database = getDatabase(app); // Realtime Database

// Event listener for the submit button
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // Create user with email and password using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      name,
      username,
      email,
      uid: user.uid
    });

    // Store user data in Realtime Database
    await dbSet(dbRef(database, "users/" + user.uid), {
      name,
      username,
      email
    });

    // Redirect after successful registration (use relative path)
    window.location.href = "index.html"; // Ensure to use a correct relative path

  } catch (error) {
    // Handle Firebase authentication errors
    console.error(error);

    if (error.code === 'auth/email-already-in-use') {
      alert("The email address is already in use by another account.");
    } else if (error.code === 'auth/weak-password') {
      alert("The password is too weak.");
    } else if (error.code === 'auth/invalid-email') {
      alert("The email address is not valid.");
    } else {
      alert("Error: " + error.message);
    }
  }
});
