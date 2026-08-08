// let num = 4.6;

// console.log("round=>", Math.round(num));
// console.log("floor=>", Math.floor(num));
// console.log("ceil=>", Math.ceil(num));

// let random = Math.random();

// console.log("otp=>",Math.floor(random * 10000) );
// console.log("dice=>",Math.ceil(random * 6) );

let teamAScore = document.getElementById("teamAScore");
let currentNumberA = document.getElementById("currentNumberA");
let teamABtn = document.getElementById("teamABtn");
let teamATurns = document.getElementById("teamATurns");
let teamBTurns = document.getElementById("teamBTurns");
let teamBScore = document.getElementById("teamBScore");
let currentNumberB = document.getElementById("currentNumberB");
let teamBBtn = document.getElementById("teamBBtn");
let resultAnnouncement = document.getElementById("resultAnnouncement");

let diceRollNum = () => {
  let random = Math.random();
  let num = Math.ceil(random * 6);
  return num;
};

let turnOf = "A";
let turnNum = 10;
let currentTurn = 0;

teamBBtn.disabled = true;

let rollDice = () => {
  if (turnOf == "A") {
    let num = diceRollNum();
    currentNumberA.innerHTML = num;
    teamAScore.innerHTML = +teamAScore.innerHTML + num;
    teamATurns.innerHTML = +teamATurns.innerHTML + 1;
    teamABtn.disabled = true;
    teamBBtn.disabled = false;
    turnOf = "B";
  } else {
    let num = diceRollNum();
    currentNumberB.innerHTML = num;
    teamBScore.innerHTML = +teamBScore.innerHTML + num;
    teamBTurns.innerHTML = +teamBTurns.innerHTML + 1;
    teamABtn.disabled = false;
    teamBBtn.disabled = true;
    currentTurn += 1;
    turnOf = "A";

    if (currentTurn >= turnNum) {
      teamABtn.disabled = true;
      teamBBtn.disabled = true;

      if (teamAScore.innerHTML > teamBScore.innerHTML) {
        resultAnnouncement.innerHTML = "Team A wins";
      }else{
        resultAnnouncement.innerHTML = "Team B wins";

      }
    }
  }
};

teamABtn.addEventListener("click", rollDice);
teamBBtn.addEventListener("click", rollDice);
