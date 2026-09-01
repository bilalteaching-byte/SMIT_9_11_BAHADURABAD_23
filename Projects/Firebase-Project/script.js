import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

//firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

//auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

let addBtn = document.getElementById("addPost");
let title = document.getElementById("title");
let description = document.getElementById("description");
let allPosts = document.getElementById("allPosts");
let name = document.getElementById("name");
let register_email = document.getElementById("register_email");
let register_password = document.getElementById("register_password");
let registerBtn = document.getElementById("registerBtn");
let login_email = document.getElementById("login_email");
let login_password = document.getElementById("login_password");
let loginBtn = document.getElementById("loginBtn");
let auth_container = document.getElementById("auth_container");
let dashboard_container = document.getElementById("dashboard_container");
let welcomeMsg = document.getElementById("welcomeMsg");
let signoutBtn = document.getElementById("signoutBtn");

const firebaseConfig = {
  apiKey: "AIzaSyCo96ak3VFU5_jZPA6qon_VGdK2W9kwqd0",
  authDomain: "social-smit.firebaseapp.com",
  projectId: "social-smit",
  storageBucket: "social-smit.firebasestorage.app",
  messagingSenderId: "798543926423",
  appId: "1:798543926423:web:8bbc2fdaea967f4d9dc5d2",
  measurementId: "G-BEJK0ZWSM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

//collection , create ref for collection
//addDoc , it takes two Params , one is reference to collection , second is document to be added

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in", user);
    const uid = user.uid;
    auth_container.style.display = "none";
    dashboard_container.style.display = "block";
    welcomeMsg.innerHTML = "Hello " + user.email;
  } else {
    console.log("User is not logged in");
    auth_container.style.display = "block";
    dashboard_container.style.display = "none";
  }
});

let registerUser = () => {
  registerBtn.disabled = true;
  createUserWithEmailAndPassword(
    auth,
    register_email.value,
    register_password.value,
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      Toastify({
        text: "User Created Successfully",
      }).showToast();
      registerBtn.disabled = false;
      name.value = "";
      register_email.value = "";
      register_password.value = "";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      registerBtn.disabled = false;
      Toastify({
        text: errorMessage,
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();
      // ..
    });
};

let signinUser = () => {
  loginBtn.disabled = true;
  signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    .then((userCredential) => {
      // Signed in
      Toastify({
        text: "User Signin Successfully",
      }).showToast();
      const user = userCredential.user;
      console.log("user=>", user);
      loginBtn.disabled = false;

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Toastify({
        text: errorMessage,
        style: {
          background: "red",
          color: "white",
        },
      }).showToast();
      loginBtn.disabled = false;
    });
};

let logoutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

let addPostToDb = () => {
  addBtn.disabled = true;
  addDoc(collection(db, "posts"), {
    title: title.value,
    description: description.value,
  })
    .then((doc) => {
      console.log("Document Add hogya he", doc);
      addBtn.disabled = false;
      getPostsFromDB();
    })
    .catch((err) => {
      addBtn.disabled = false;
      console.error(err);
    });
};

let getPostsFromDB = () => {
  allPosts.innerHTML = "";
  getDocs(collection(db, "posts")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let id = doc.id;
      let info = doc.data();

      let card = `<div id = "${id}">
      <h2>${info.title}</h2>
      <p> ${info.description} </p>
      </div>`;

      allPosts.innerHTML += card;
    });
  });
};

getPostsFromDB();

addBtn.addEventListener("click", addPostToDb);
registerBtn.addEventListener("click", registerUser);
loginBtn.addEventListener("click", signinUser);
signoutBtn.addEventListener("click", logoutUser);
