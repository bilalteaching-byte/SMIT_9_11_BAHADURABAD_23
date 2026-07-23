// traditional function
// function plus(){}

//arrow functions

// let plus = (x , y) => {
//     console.log("1st value" , x)
//     console.log("2nd value" , y)
//   console.log(x + y);
// };

// plus(50, 20);

// let greet = (name) => {
//   return `Salaam! ${name} welcome to our community`;
// };

// let msg = greet("Bilal Raza");
// let msg2 = greet("Kamran Bhai");

let salary = document.getElementById("salary");
let taxBtn = document.getElementById("taxBtn");
let taxView = document.getElementById("tax");

function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

let taxCalculator = (salary) => {
  let totalYearlySalary = salary * 12;
  let tax;
  if (totalYearlySalary < 1000000) {
    tax = 0;
    return tax;
  }
  if (totalYearlySalary > 1000000 && totalYearlySalary <= 2000000) {
    tax = totalYearlySalary * 0.1;
    return tax;
  } else if (totalYearlySalary > 2000000 && totalYearlySalary <= 3000000) {
    tax = totalYearlySalary * 0.15;
    return tax;
  } else {
    tax = totalYearlySalary * 0.2;
    return tax;
  }
};

let calculateTax = () => {
  let tax = taxCalculator(salary.value);
  taxView.innerHTML = `Your total salary is ${formatNumber(salary.value * 12)}.
  Your Tax is ${formatNumber(tax)}`;
};

taxBtn.addEventListener("click", calculateTax);
