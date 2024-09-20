
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





async function fetchAndDisplayData(cnic) {
    try {
      // Fetch data from addstudent collection
      const studentSnapshot = await getDocs(collection(db, "addstudent")); // studedent porfile
      let studentData = null;
      studentSnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        
        if (doc.data().cnic === cnic) {

            studentData = doc.data();

        }
      });
  
      if (studentData) {
        console.log("Student Profile: ", studentData);
  
        // Fetch data from studentinfo collection for the same CNIC
        const studentInfoSnapshot = await getDocs(collection(db, "studentinfo"));
        let studentInfoData = null;
  
        studentInfoSnapshot.forEach((doc) => {
          if (doc.data().cnic === cnic) {
            studentInfoData = doc.data();
          }
        });
  
        if (studentInfoData) {
          console.log("Student Info: ", studentInfoData);
          // Display the merged data
          displayStudentData(studentData, studentInfoData);
        } else {
          alert("No student info found for this CNIC");
        }
      } else {
        alert("No student profile found for this CNIC");
      }
  
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  //end function

  
  // Function to display the merged student data in the HTML
  function displayStudentData(studentData, studentInfoData) {
    document.getElementById("studentName").innerText = `${studentData.firstName} ${studentData.lastName}`;
    document.getElementById("studentEmail").innerText = studentData.email;
  
    const resultHTML = `
      <tr>
        <td>${studentInfoData.course}</td>
        <td>${studentInfoData.marks}</td>
        <td>${studentInfoData.totalMarks}</td>
        <td>${studentInfoData.grade}</td>
      </tr>`;
  
    document.getElementById("resultTable").innerHTML = resultHTML;
    document.getElementById("resultSection").style.display = "block";
  }
  
  // Event listener for the "Check Result" button
  document.getElementById('checkResultBtn').addEventListener('click', function() {
    const cnic = document.getElementById('cnicInput').value;
    fetchAndDisplayData(cnic);
  });