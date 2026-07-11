// increment from 0 - 10
// for (let x = 0; x < 10; x++) {
//   console.log("x==>", x);
// }

// decrement from 10 - 0
// for (let x = 0; x < 10; x++) {
//   console.log("x==>", 10 - x);
// }

// decrement from 10 - 0
// for (let x = 10; x > 0; x--) {
//   console.log("x==>", x);
// }

// for (let x = 0; x < 100; x++) {
//   if (x % 5 == 0) {
//     console.log(x);
//   }
// }

// let firstName = "Bilal";
// let lastName = "Raza";
// let fullname ="My name is" +  firstName + " " + lastName;
// let fullname = `My name is ${firstName} ${lastName}`;

let table_of = document.getElementById("table_of");
let end_num = document.getElementById("end_num");
let tableBtn = document.getElementById("tableBtn");
let result = document.getElementById("result");

let renderTable = () => {
  result.innerHTML = "";
  let tableVal = table_of.value;
  let endVal = end_num.value;

  for (let x = 1; x <= endVal; x++) {
    let p = `<p> ${tableVal} x ${x} = ${tableVal * x} </p>`;
    result.innerHTML += p;
  }
};
tableBtn.addEventListener("click", renderTable);
