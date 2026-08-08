

// let houseInfo = {
//     sqYrds: 120,
//     ownerName: "Test",
//     isFirstOwner: true,
//     onRent: false,
//     ownerInfo: {
//         name: "House Owner",
//         cnic: "42141414141",
//         address: "Chowk Pe",
//     },
//     bio: function () {
//         return `This house is owned by ${this.ownerName}.It is located at ${this.ownerInfo.address}.It has ${this.rooms} rooms.`
//     }
// }

// houseInfo.rooms = 3
// houseInfo.ownerName = "House Owner"

// delete houseInfo.isFirstOwner

// console.log("houseInfo=>", houseInfo)
// console.log("houseInfo=>", houseInfo.bio())



// primitive non primitive

let a = 10

let b = a

a = 20


let c = { name: "Bilal" }
let d = c

c.name = "Bilal Raza"

console.log("c=>", c.name)
console.log("d=>", d.name)