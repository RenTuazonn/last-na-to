  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
        import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
        const firebaseConfig = {
            apiKey: "AIzaSyAvJKueNtBRrGFxXby-VRkOewdGEkiuGnQ",
            authDomain: "first-proj-a5fff.firebaseapp.com",
            projectId: "first-proj-a5fff",
            storageBucket: "first-proj-a5fff.appspot.com",
            messagingSenderId: "902560724938",
            appId: "1:902560724938:web:2956090fc8afb5ce888133",
            measurementId: "G-0VNSBVGRK7"
        };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const auth = getAuth();

        document.getElementById("loginBtn").addEventListener('click', function (e) {
            e.preventDefault();

           
            submit.addEventListener('click', function(event){
            event.preventDefault();
             const email = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const submit = document.getElementById("submit").value
            })

          

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
        });