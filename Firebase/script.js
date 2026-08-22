import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

let addBtn = document.getElementById("addPost");
let title = document.getElementById("title");
let description = document.getElementById("description");
let allPosts = document.getElementById("allPosts");

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

//collection , create ref for collection
//addDoc , it takes two Params , one is reference to collection , second is document to be added

let addPostToDb = () => {
  addBtn.disabled = true;
  addDoc(collection(db, "posts"), {
    title: title.value,
    description: description.value,
  })
    .then((doc) => {
      console.log("Document Add hogya he", doc);
      addBtn.disabled = false;
      getPostsFromDB()
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
