

let name = "Saylani";
let phone = "923132933803";
let softawreId = "123,423,421";
let sentence = "   Pakistan is a beautiful country.  ";
let email = "jlksjal@sjadlsa.com";

let profileLe = name.substring(0, 2);
let last3Letters = phone.slice(-3);

console.log(name.length); // Output: 8
console.log(profileLe); // Output: Sa
console.log(last3Letters); // Output: 803

console.log(softawreId.trim().split(",").join("-")); // Output: ["123", "423", "421"]

console.log("words=>",sentence.trim().split(" ").length); // Output: 5
console.log("length=>",sentence.trim().length); // Output: 31

let isEmailValid = email.includes("@") && email.includes(".");
console.log("Is email valid?", isEmailValid); // Output: false