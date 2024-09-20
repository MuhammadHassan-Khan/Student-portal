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



window.show = async () => {
    const tableBody = document.querySelector("#data-table tbody");

    const btn = document.querySelector("button")
        btn.disabled = true;
        btn.textContent = "unclickable"

    const firstData = await getDocs(collection(db, "addstudent"));
    const secondData = await getDocs(collection(db, "studentinfo"));

   
    const secondDataMap = {};
    secondData.forEach((doc) => {
        secondDataMap[doc.data().cnic] = doc.data(); 
    });

    
    
    firstData.forEach((doc) => {
        const studentData = doc.data();
        const studentInfo = secondDataMap[studentData.cnic]; 

        if (studentInfo) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${studentInfo.studentID}</td>
                <td>${studentData.firstName} ${studentData.lastName}</td>
                <td>${studentInfo.course}</td>
                <td>${studentData.cnic}</td>
                <td>${studentInfo.marks}</td>
                <td>${studentInfo.totalMarks}</td>
                <td>${studentInfo.grade}</td>
            `;
            tableBody.appendChild(row);
        } else {
            console.log(`No matching info for student with CNIC: ${studentData.cnic}`);
        }
    });
};

export const forexport = {}

