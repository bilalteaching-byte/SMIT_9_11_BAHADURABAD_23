let result = document.getElementById("result")
let car_name = document.getElementById("car_name")
let car_model = document.getElementById("car_model")
let add_car = document.getElementById("add_car")
let search_input = document.getElementById("search_input")
let model_dropdown = document.getElementById("model_dropdown")
let sortName = document.getElementById("sortName")
let sortModel = document.getElementById("sortModel")


let cars = [
    { name: "Corolla", model: "2010" },
    { name: "Swift", model: "2023" },
    { name: "Yaris", model: "2020" },
    { name: "Civic", model: "2018" },
    { name: "City", model: "2019" },
    { name: "Alto", model: "2022" },
    { name: "Mehran", model: "2015" },
    { name: "Cultus", model: "2021" },
    { name: "Wagon R", model: "2020" },
    { name: "Prius", model: "2017" },
    { name: "Fortuner", model: "2024" },
    { name: "Hilux", model: "2023" },
    { name: "Sportage", model: "2022" },
    { name: "Tucson", model: "2021" },
    { name: "Sonata", model: "2023" },
    { name: "Elantra", model: "2020" },
    { name: "Accord", model: "2019" },
    { name: "Passo", model: "2016" },
    { name: "Aqua", model: "2018" },
    { name: "Vitz", model: "2017" }
];


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

let listCars = (arr = cars) => {
    result.innerHTML = ""
    arr.forEach((element, index) => {
        let p = `<p>${index + 1}) ${element.name} , ${element.model} </p>`
        result.innerHTML += p
    })
}

let searchCars = (event) => {
    // console.log(event.target.value)
    let filtered = cars.filter((ele, ind) => ele.name.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log(filtered)
    listCars(filtered)
}

let searchCarsModel = (event) => {
    let filtered = cars.filter((ele, ind) => ele.model.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log(filtered)
    listCars(filtered)
}



listCars()


add_car.addEventListener("click", addCar)

search_input.addEventListener('input', searchCars);
model_dropdown.addEventListener('change', searchCarsModel);

sortName.addEventListener('change', (event) => {
    let val = event.target.value
    console.log(val)
    if (val == "za") {
        cars.sort((a, b) => b.name.localeCompare(a.name))
        listCars()
    } else {
        cars.sort((a, b) => a.name.localeCompare(b.name))
        listCars()
    }
});
sortModel.addEventListener('change', (event) => {
    let val = event.target.value
    console.log(val)
    if (val == "low-high") {
        cars.sort((a, b) =>  +b.model - +a.model)
        listCars()
    } else {
        cars.sort((a, b) =>  +a.model - +b.model)
        listCars()
    }

});



//FILTER
//1.filter always returns arr
//2.filter run on each element and return  element that match the condition
//3.it does not effect original array


// console.log(cars)

// let filtered = cars.filter((element, index) => element.model == '2020')
// console.log("filtered=>",   filtered)



let sum = (a = 1, b = 1) => a + b

console.log(sum())