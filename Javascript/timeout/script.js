
let num = 1


let interval = setInterval(() => {
    console.log("test")
    num += 1
    document.querySelector("h1").innerHTML = num
}, 1000)

let stopInterval = () => {
    clearInterval(interval)
}