
let now = new Date();
console.log("Current Date and Time:", now);

console.log("Month:", now.getMonth()); 
console.log("Date:", now.getDate());
console.log("Year:", now.getFullYear());

let birthDate = new Date("1997-04-19");  ///YYYY-MM-DD
console.log("Birth Date:", birthDate);
let milliseconds = now.getTime();
let years = milliseconds / (1000 * 60 * 60 * 24 * 365);
let birthDateMilliseconds = birthDate.getTime();

let inDunya = milliseconds - birthDateMilliseconds;
console.log("Milliseconds since birth:", inDunya);
let inYears = inDunya / (1000 * 60 * 60 * 24 * 365);
console.log("Years since birth:", inYears);