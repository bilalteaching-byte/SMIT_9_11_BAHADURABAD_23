// variable ke 3 scope hote hen
// global , function , block

let products_container = document.getElementById("products_container");
let product_id = document.getElementById("id");
let title = document.getElementById("title");
let description = document.getElementById("description");
let img = document.getElementById("img");
let category = document.getElementById("category");
let price = document.getElementById("price");
let add_product_btn = document.getElementById("add_product_btn");

let products = [];

let getProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      products = data;
      listProducts();
    });
};

function getProductInfo(el) {
  console.log(el.id);
  fetch(`https://fakestoreapi.com/products/${el.id}`)
    .then((response) => response.json())
    .then((product) => console.log(product));
}

let listProducts = () => {
  products_container.innerHTML = "";
  products.forEach((data, index) => {
    // template literals
    let card = `<div class="product_card" id = ${data.id} onclick=getProductInfo(this)>
     <img src = ${data.image} class="product_img" />
     <h4>${data.title}</h4>
    </div>`;
    products_container.innerHTML += card;
  });
};

let addProduct = () => {
  let obj = {
    id: Number(product_id.value),
    title: title.value,
    description: description.value,
    price: Number(price.value),
    category: category.value,
    image: img.value,
  };

  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        alert("Apka product dalgya he")
        getProducts()
    });

  console.log(obj);
};

add_product_btn.addEventListener("click", addProduct);

getProducts();
