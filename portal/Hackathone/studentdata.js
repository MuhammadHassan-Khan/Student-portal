  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
  import { getAuth ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
  import { getFirestore , collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
  import {  getDocs} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


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

    window.show = async () =>{
        const tableBody = document.querySelector("#data-table tbody");
        //disable
        const btn = document.querySelector("button")
        btn.disabled = true;
        btn.textContent = "unclickable"

        const querySnapshot = await getDocs(collection(db, "addstudent"));
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            // console.log(`${doc.data().firstName}`);
       
            const row = document.createElement('tr');

            row.innerHTML=`
             <td>${doc.data().firstName}</td>
             <td>${doc.data().lastName}</td>
            <td>${doc.data().email}</td>
            <td>${doc.data().cnic}</td>
            <td>${doc.data().userType}</td>
            `;
      tableBody.appendChild(row);

        });
   
    }



  
