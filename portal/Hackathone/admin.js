
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
  import { getAuth  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
  import {onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

  import { getFirestore , collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyALBn01OCrkjHqrvSFK3d-fePXfmbKNw3o",
    authDomain: "mini-site-d6fb3.firebaseapp.com",
    projectId: "mini-site-d6fb3",
    storageBucket: "mini-site-d6fb3.appspot.com",
    messagingSenderId: "705699719845",
    appId: "1:705699719845:web:683b7a615ffd441bbe7b4c",
    measurementId: "G-VW8HMVH8T6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
  
        // ...
      } else {
        // User is signed out
        // ...
        window.location.href = "login.html"
      }
    });


document.getElementById('studentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cnic = document.getElementById('cnic').value;
    var userType = document.getElementById('userType').value;

    // Console me values ko log karein
    console.log('First Name: ' + firstName);
    console.log('Last Name: ' + lastName);
    console.log('Email: ' + email);
    console.log('Password: ' + password);
    console.log('CNIC: ' + cnic);
    console.log('User Type: ' + userType);

var obj ={
    firstName,
    lastName,
    email,
    password,
    cnic,
    userType,
}

document.getElementById("studentForm").reset();

    try {
        const docRef = await addDoc(collection(db, "addstudent"), {
          ...obj
          
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

});



