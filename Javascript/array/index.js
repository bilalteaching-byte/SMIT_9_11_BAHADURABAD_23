let fruits = ["Apple", "Banana", "Grapes", "Watermelon", "Mango"];
let fruits_list = document.getElementById("fruits_list");
let fruits_input = document.getElementById("fruits_input");
let addBtn = document.getElementById("addBtn");
let addStartBtn = document.getElementById("addStartBtn");
let undoBtn = document.getElementById("undoBtn");
let undoStartBtn = document.getElementById("undoStartBtn");
let fruits_input_index = document.getElementById("fruits_input_index");

console.log("fruits=>", fruits);

let renderFruits = () => {
  fruits_list.innerHTML = "";
  for (let x = 0; x < fruits.length; x++) {
    let para = `<p> ${fruits[x]} </p>`;
    fruits_list.innerHTML += para;
  }
};
renderFruits();

let addFruit = () => {
  if (fruits_input.value == "") return alert("Add Proper Value");

  fruits.splice(fruits_input_index.value, 0, fruits_input.value);
  fruits_input.value = "";
  fruits_input_index.value = "";
  renderFruits();

};

addBtn.addEventListener("click", addFruit);

let undoFruit = () => {
  fruits.pop();
  renderFruits();
};

undoBtn.addEventListener("click", undoFruit);



let addStart = () => {
  if (fruits_input.value == "") return alert("Add Proper Value");
  fruits.unshift(fruits_input.value);
  console.log("after unshift-=>", fruits)
  renderFruits();
  fruits_input.value = "";
};

addStartBtn.addEventListener("click", addStart);


let removeStart = () => {
  fruits.shift();
  renderFruits();
};

undoStartBtn.addEventListener("click", removeStart);







// let arr = ['bill', 'sad', 'das', 'dasgsa']
// arr.push("aBDL")
// console.log(arr)

// arr.pop()
// console.log(arr)

// // Add using splice
// fruits.splice(1, 0, "Strawberry")
// fruits.splice(1, 1, "Strawberry")
// fruits.splice(1, 2)

// console.log(fruits)







//mutable , immutable
//primitive , non primitive


// agr aik element chahye ho to
// console.log("3RD=>", fruits[2]);

//1.push , array ke end mein elements add krdeta he
// fruits.push("Strawberry", "Pineapple", "Amrood");
// console.log("After Push =>", fruits);
// renderFruits();

//2.pop , array ke end se 1 element remove krdeta he
// fruits.pop();
// console.log("After Pop =>", fruits);
// renderFruits();
