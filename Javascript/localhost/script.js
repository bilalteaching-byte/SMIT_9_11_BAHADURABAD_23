// let obj = {
//   name: "Bilal",
// };
// let stringObj = JSON.stringify(obj);
// console.log(stringObj);
// console.log(JSON.parse(stringObj))
// localStorage.setItem("user", "bilal");
// localStorage.setItem("obj", JSON.stringify({ name: "Bilal" }));
// let user = localStorage.getItem("obj");
// console.log("from local storage=>", user);

let auth_container = document.getElementById("auth_container");
let user_name = document.getElementById("user_name");
let user_email = document.getElementById("user_email");
let login_btn = document.getElementById("login_btn");
let user_container = document.getElementById("user_container");
let user_display_name = document.getElementById("user_display_name");
let logout_btn = document.getElementById("logout_btn");
let todo_input = document.getElementById("todo_input");
let todo_container = document.getElementById("todo_container");
let todo_btn = document.getElementById("todo_btn");

let userFromLocalhost = localStorage.getItem("user");
let todosFromStorage = localStorage.getItem("todos");

let todos = [];



if (userFromLocalhost) {
  auth_container.style.display = "none";
  user_container.style.display = "block";
} else {
  auth_container.style.display = "block";
  user_container.style.display = "none";
}

let addDataToStorage = () => {
  let obj = {
    name: user_name.value,
    email: user_email.value,
  };

  localStorage.setItem("user", JSON.stringify(obj));
  auth_container.style.display = "none";
  user_container.style.display = "block";

  user_display_name.innerHTML = user_name.value;
};

let logoutUser = () => {
  localStorage.removeItem("user");
  auth_container.style.display = "block";
  user_container.style.display = "none";
};

let addTodo = () => {
  let obj = { todo: todo_input.value };
  todos.unshift(obj);
  todo_input.value = "";
  localStorage.setItem("todos", JSON.stringify(todos));
  listTodo();
};

let listTodo = () => {
  todo_container.innerHTML = "";
  todos.forEach((data, index) => {
    let p = `<p> ${index + 1} - ${data.todo} </p>`;
    todo_container.innerHTML += p;
  });
};

if (todosFromStorage) {
  todos = JSON.parse(todosFromStorage);
  listTodo();
}

login_btn.addEventListener("click", addDataToStorage);
logout_btn.addEventListener("click", logoutUser);
todo_btn.addEventListener("click", addTodo);
