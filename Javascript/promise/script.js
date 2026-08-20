


// let loginPromise = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let loginHogya = false
//             if (loginHogya) {
//                 resolve({ name: "Bilal", id: 5, token: "jhkadsjkahdkj" })
//             } else {
//                 reject("Email is Wrong")
//             }
//         }, 1000);
//     })
// }



// loginPromise()
//     .then((data) => { console.log("User ki info bhe mangwalo") })
//     .then((data) => { console.log("Products bhe mangwalo") })
//     .then((data) => { console.log("Orders bhe mangwalo") })
//     .catch((err) => console.log(err))



let email = document.getElementById("email")
let password = document.getElementById("password")
let loginBtn = document.getElementById("loginBtn")


let loginUser = () => {
    let emailVal = email.value
    let passwordVal = password.value
    loginBtn.disabled = true
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: emailVal,
            password: passwordVal,
            expiresInMins: 30, // optional, defaults to 60
        }),
        credentials: 'include' // Include cookies (e.g., accessToken) in the request
    })
        .then(res => res.json())
        .then((data) => {
            loginBtn.disabled = false
            console.log("data==>", data)
        })
        
        .catch((err)=>{
            console.log(err)
            loginBtn.disabled = false
        });
}


loginBtn.addEventListener("click", loginUser)