// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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




document.getElementById('marksForm').addEventListener('submit',async function(e) {
    e.preventDefault();

    // Get values from the form inputs
    const studentID = document.getElementById('studentID').value;
    const cnic = document.getElementById('cnic').value;
    const course = document.getElementById('course').value;
    const marks = document.getElementById('marks').value;
    const totalMarks = document.getElementById('totalMarks').value;
    const grade = document.getElementById('grade').value;

    // Store the values in variables (you can now use these values as needed)
    console.log("Student ID:", studentID);
    console.log("CNIC:", cnic);
    console.log("Course:", course);
    console.log("Marks:", marks);
    console.log("Total Marks:", totalMarks);
    console.log("Grade:", grade);

    var detail = {
        studentID,
        cnic,
        course,
        marks,
        totalMarks,
        grade,
    }


    try {
        const docRef = await addDoc(collection(db, "studentinfo"), {
          ...detail
          
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    // You can now send this data to your backend or perform further actions
    alert("Marks Submitted!");
});