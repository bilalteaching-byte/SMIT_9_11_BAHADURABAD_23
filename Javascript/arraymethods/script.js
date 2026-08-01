
let result = document.getElementById("result")
let car_name = document.getElementById("car_name")
let car_model = document.getElementById("car_model")
let add_car = document.getElementById("add_car")




let cars = [
    { name: 'Corolla', model: "2010" },
    { name: 'Swift', model: "2023" },
    { name: 'Yaris', model: "2020" },
    { name: 'Yaris', model: "2020" },
    { name: 'dsa', model: "2020" },
    { name: 'Yardsais', model: "2020" },

]

let addCar = () => {
    let obj = {
        name: car_name.value,
        model: car_model.value
    }
    cars.unshift(obj)
    listCars()
    car_name.value = ""
    car_model.value = ""
}

let listCars = () => {
    result.innerHTML = ""
    cars.forEach((element, index) => {
        console.log(element, index)
        let p = `<p>${index + 1})  Name : ${element.name} , Model : ${element.model} </p>`
        result.innerHTML += p
    })
}

listCars()


add_car.addEventListener("click", addCar)