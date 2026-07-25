

// let name = "Saylani";
// let phone = "923132933803";
// let softawreId = "123,423,421";
// let sentence = "   Pakistan is a beautiful country.  ";
// let email = "jlksjal@sjadlsa.com";

// let profileLe = name.substring(0, 2);
// let last3Letters = phone.slice(-3);

// console.log(name.length); // Output: 8
// console.log(profileLe); // Output: Sa
// console.log(last3Letters); // Output: 803

// console.log(softawreId.trim().split(",").join("-")); // Output: ["123", "423", "421"]

// console.log("words=>",sentence.trim().split(" ").length); // Output: 5
// console.log("length=>",sentence.trim().length); // Output: 31

// let isEmailValid = email.includes("@") && email.includes(".");
// console.log("Is email valid?", isEmailValid); // Output: false

let email = document.getElementById("email")
let password = document.getElementById("password")
let about_you = document.getElementById("about_you")
let submit_info = document.getElementById("submit_info")
let capitalLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let numbers = [
    '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9'
];

let isEmailValid = () => {
    let val = email.value
    if (val.includes("@") && val.includes(".") && val.length > 4) {
        return true
    } else {
        return false
    }
}
let isPasswordValid = () => {
    let val = password.value
    let isLengthOk = val.length >= 8
    let isCapitalLetter = false
    let isNumber = false

    for (let x = 0; x < val.length; x++) {
        console.log(val[x])
        if (capitalLetters.includes(val[x])) isCapitalLetter = true
        if (numbers.includes(val[x])) isNumber = true
    }

    if (isLengthOk && isCapitalLetter && isNumber) {
        return true
    } else {
        return false
    }
}

let isAboutValid = () => {
    let val = about_you.value
    let isLengthOk = val.length >= 100
    let isWordsOk = val.split(" ").length >= 40
    if (isLengthOk && isWordsOk) {
        return true
    } else {
        return false
    }

}
let validateForm = () => {
    if (!isEmailValid()) return alert("Email is invalid")
    if (!isPasswordValid()) return alert("Password is invalid")
    if (!isAboutValid()) return alert("About is invalid")

    alert("Your form submitted successfully")

}


submit_info.addEventListener("click", validateForm)