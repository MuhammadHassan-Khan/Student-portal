import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
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

window.updayebtn = async () => {
  // Get the input values
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const cnic = document.getElementById("cnic").value;

  if (!firstname || !lastname || !cnic) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const q = query(collection(db, "addstudent"), where("cnic", "==", cnic));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      alert("No student found with this CNIC.");
      return;
    }
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, "addstudent", document.id); 
      await updateDoc(docRef, {
        firstName: firstname,
        lastName: lastname,
        cnic: cnic
      });
      alert("Student data updated successfully!");
    });

  } catch (error) {
    console.error("Error updating document: ", error);
    alert("Error updating student data. Please try again.");
  }
};