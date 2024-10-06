import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAVQKRA6M1_d66Qd-FiVULSENowvPrOskg",
    authDomain: "nasa-25279.firebaseapp.com",
    projectId: "nasa-25279",
    storageBucket: "nasa-25279.appspot.com",
    messagingSenderId: "732860345193",
    appId: "1:732860345193:web:8731a1f0e53a77b0b72bf8"
};

// Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up Function
function signUp() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Signed Up Successfully: " + user.email);
            document.getElementById("signUpModal").style.display = "none";  // Close the modal
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Sign In Function
function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Signed In Successfully: " + user.email);
            window.location.href = './dashboard';
        })
        .catch((error) => {
            //alert(error.message);
            const errorModal = document.getElementById("errorModal");
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = "Invalid User Authentication: Please check your email and password."; // Custom error message
            errorModal.style.display = "flex";  // Show the error modal
        });
}

// Function to sign out the user
export function signOutUser() {
    console.log('sign out user called');
    signOut(auth)
        .then(() => {
            alert("Signed Out");
            // Redirect to welcome.html after successful sign-out
            window.location.href = './welcome.html';
        })
        .catch((error) => {
            alert("Error during sign-out: " + error.message);
        });
}

// Detect Auth State Changes
onAuthStateChanged(auth, (user) => {
    const userStatus = document.getElementById("user-status");
    if (user) {
        userStatus.textContent = "User is signed in: " + user.email;
    } else {
        userStatus.textContent = "No Active User";
    }
});

// Modal and Button Logic
document.addEventListener('DOMContentLoaded', function () {
    const signUpModal = document.getElementById("signUpModal");
    const signUpBtn = document.getElementById("signUpBtn");
    const closeBtn = document.getElementsByClassName("close")[0];

    const errorModal = document.getElementById("errorModal");
    const closeErrorBtn = document.getElementsByClassName("close-error")[0];


    // Show the modal when "Sign Up" button is clicked
    signUpBtn.onclick = function() {
        signUpModal.style.display = "block";
    };

    // Close the modal when "x" is clicked
    closeBtn.onclick = function() {
        signUpModal.style.display = "none";
    };

    // Close the error modal when "x" is clicked
    closeErrorBtn.onclick = function() {
        errorModal.style.display = "none";
    };

    // Close the modal when clicking outside of the modal
    window.onclick = function(event) {
        if (event.target == signUpModal) {
            signUpModal.style.display = "none";
        }
        if (event.target == errorModal) {
            errorModal.style.display = "none";  // Close the error modal when clicking outside
        }
    };

    // Handle sign-up form submission
    document.getElementById('signUpForm').addEventListener('submit', function(event) {
        event.preventDefault();
        signUp(); // Call the signUp function
    });

    // Handle sign-in form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        signIn(); // Call the signIn function
    });
});
