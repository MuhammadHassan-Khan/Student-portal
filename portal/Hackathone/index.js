  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
  import { getAuth , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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

  
  //-----/\connect firebase/\------\\



document.getElementById('loginForm').addEventListener('submit', function(event) {    
    event.preventDefault(); // Form ko submit hone se roknay ke liye
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
     
    
    // Console values
    console.log('Email: ' + email);
    console.log('Password: ' + password);
    

    //Firebase auth
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);


    if (email == "hassanaleem125@gmail.com") {
        window.location.href = "admin.html"
    }
    else{
        window.location.href ="student.html"
    }
    // ...
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });





});
