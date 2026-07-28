let fruits = ["Apple", "Banana", "Grapes", "Watermelon", "Mango"];
let fruits_list = document.getElementById("fruits_list");
let fruits_input = document.getElementById("fruits_input");
let addBtn = document.getElementById("addBtn");
let undoBtn = document.getElementById("undoBtn");
console.log("fruits=>", fruits);

let renderFruits = () => {
  fruits_list.innerHTML = "";
  for (let x = 0; x < fruits.length; x++) {
    // console.log("x==>", fruits[x]);
    let para = `<p> ${fruits[x]} </p>`;
    fruits_list.innerHTML += para;
  }
};
renderFruits();

let addFruit = () => {
  if (fruits_input.value == "") return alert("Add Proper Value");
  fruits.push(fruits_input.value);
  renderFruits();
  fruits_input.value = "";
};

addBtn.addEventListener("click", addFruit);

let undoFruit = () => {
  fruits.pop();
  renderFruits();
};

undoBtn.addEventListener("click", undoFruit);

// agr aik element chahye ho to
// console.log("3RD=>", fruits[2]);

//1.push , array ke end mein element add krdeta he
// fruits.push("Strawberry", "Pineapple", "Amrood");
// console.log("After Push =>", fruits);
// renderFruits();

//2.pop , array ke end se 1 element remove krdeta he
// fruits.pop();
// console.log("After Pop =>", fruits);
// renderFruits();
