let result = document.getElementById("result");
let car_name = document.getElementById("car_name");
let car_model = document.getElementById("car_model");
let add_car = document.getElementById("add_car");

let cars = [
  { name: "Corolla", model: "2010" },
  { name: "Swift", model: "2023" },
  { name: "Yaris", model: "2020" },
  { name: "Yaris", model: "2020" },
  { name: "dsa", model: "2020" },
  { name: "Yardsais", model: "2020" },
];

let addCar = () => {
  let obj = {
    name: car_name.value,
    model: car_model.value,
  };
  cars.unshift(obj);
  listCars();
  car_name.value = "";
  car_model.value = "";
};

let listCars = () => {
  result.innerHTML = "";
  cars.forEach((element, index) => {
    let p = `<p>${index + 1})  Name : ${element.name} , Model : ${element.model} </p>`; // Template literals
    result.innerHTML += p;
  });
};

listCars();

add_car.addEventListener("click", addCar);

// filter
//1. array ko check krta he
//2. filter method new array return krta he
//3. jo condition true ho usko return krta he

console.log(cars);

let filtered = cars.filter((element, index) => element.model === "2020");
console.log(filtered);
