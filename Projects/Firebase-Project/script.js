import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

//firestore
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  getDocs,
  serverTimestamp,
  query,
  where,
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
let loading_container = document.getElementById("loading_container");
let welcomeMsg = document.getElementById("welcomeMsg");
let signoutBtn = document.getElementById("signoutBtn");
let register_box = document.getElementById("register_box");
let login_box = document.getElementById("login_box");
let showLogin = document.getElementById("showLogin");
let showRegister = document.getElementById("showRegister");
let users_chips = document.getElementById("users_chips");

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
const userColName = "users";
const postColName = "posts";

let userInfo;
console.log(userInfo);

//collection , create ref for collection
//addDoc , it takes two Params , one is reference to collection , second is document to be added
//setDoc , it takes two Params , one is reference to document , second is document to be added

// show login box by default, hide register box
auth_container.style.display = "none";
login_box.style.display = "none";
register_box.style.display = "none";
dashboard_container.style.display = "none";
loading_container.style.display = "block";

let toggleToLogin = () => {
  register_box.style.display = "none";
  login_box.style.display = "block";
};

let toggleToRegister = () => {
  login_box.style.display = "none";
  register_box.style.display = "block";
};

showLogin.addEventListener("click", toggleToLogin);
showRegister.addEventListener("click", toggleToRegister);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    let userDetail = await getUserFromDB(uid);
    userInfo = userDetail;
    auth_container.style.display = "none";
    dashboard_container.style.display = "block";
    loading_container.style.display = "none";
    welcomeMsg.innerHTML = "Hello " + userDetail.name;
  } else {
    console.log("User is not logged in");
    dashboard_container.style.display = "none";
    loading_container.style.display = "none";
    auth_container.style.display = "block";
    login_box.style.display = "block";
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
      //set user into db
      let userRef = doc(db, userColName, user.uid);
      let obj = {
        name: name.value,
        email: register_email.value,
        uid: user.uid,
      };

      setDoc(userRef, obj)
        .then(() => {
          Toastify({
            text: "User Created Successfully",
          }).showToast();

          registerBtn.disabled = false;
          name.value = "";
          register_email.value = "";
          register_password.value = "";
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
        });

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
      auth_container.style.display = "block";
      dashboard_container.style.display = "none";
      loading_container.style.display = "none";
    })
    .catch((error) => {
      // An error happened.
    });
};

let addPostToDb = () => {
  if (title.value == "" || description.value == "")
    return alert("Add Proper info");
  addBtn.disabled = true;

  addDoc(collection(db, postColName), {
    title: title.value,
    description: description.value,
    userId: userInfo.uid,
    userName: userInfo.name,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    likes: [],
    dislikes: [],
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

let getPostsFromDB = (userId) => {
  let q;
  if (userId) {
    q = query(collection(db, postColName), where("userId", "==", userId));
  } else {
    q = query(collection(db, postColName));
  }
  allPosts.innerHTML = "";
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let id = doc.id;
      let info = doc.data();
      let postTime = info.createdAt.toDate().toLocaleString();

      let card = `<div class = "post_card" id = "${id}">
      <h2>${info.title}</h2>
      <p> ${info.description} </p>
      <p>By: <b> ${info.userName}</b></p>
      <p>At: <b> ${postTime}</b></p>
      </div>`;

      allPosts.innerHTML += card;
    });
  });
};

let getUsersFromDB = () => {
  users_chips.innerHTML = "";
  getDocs(collection(db, userColName)).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let id = doc.id;
      let info = doc.data();
      console.log("info of users=>", info);

      let chip = `<div class='user_chips' id=${id}>${info.name}</div>`;
      users_chips.innerHTML += chip;
    });
  });
};

users_chips.addEventListener("click", (e) => {
  if (e.target.classList.contains("user_chips")) {
    let userId = e.target.id;
    getPostsFromDB(userId)
  }
});

let getUserFromDB = (uid) => {
  let userRef = doc(db, userColName, uid || auth.currentUser?.uid);
  return getDoc(userRef).then((snapshot) => {
    console.log("snapshot=>", snapshot.id, snapshot.data());
    return snapshot.data();
  });
};

getPostsFromDB();
getUsersFromDB();

addBtn.addEventListener("click", addPostToDb);
registerBtn.addEventListener("click", registerUser);
loginBtn.addEventListener("click", signinUser);
signoutBtn.addEventListener("click", logoutUser);
