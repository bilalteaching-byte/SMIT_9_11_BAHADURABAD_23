// let teamA = document.getElementById("teamAGoal");
// let teamB = document.getElementById("teamBGoal");
// let btn = document.getElementById("resultBtn");
// let result = document.getElementById("result");

// //function
// let seeResult = () => {
//   let teamAGoal = teamA.value;
//   let teambGoal = teamB.value;
//   //if else
//   if (teamAGoal > teambGoal) {
//     result.innerHTML = "A team Wins";
//   } else if (teamAGoal == teambGoal) {
//     result.innerHTML = "Match Tied";
//   } else {
//     result.innerHTML = "B team Wins";
//   }
// };

// btn.addEventListener("click", seeResult);

let userNumber = document.getElementById("number");
let checkBtn = document.getElementById("checkBtn");
let evenOddResult = document.getElementById("evenOddResult");

let checkNumber = () => {
  let num = userNumber.value;
  if (num % 2 == 0) {
    evenOddResult.innerHTML = "Number is Even";
  } else {
    evenOddResult.innerHTML = "Number is Odd";
  }
};

checkBtn.addEventListener("click", checkNumber);
