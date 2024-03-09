var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategInput = document.getElementById("productCateg");
var productDescInput = document.getElementById("productDesc");
var searchInput = document.getElementById("searchInput");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var indexUpdate = 0;

var productContainar = []

if (localStorage.getItem("products") != null) {

    productContainar = JSON.parse(localStorage.getItem("products"))
    displayProduct()
}

function addProduct() {
    if (validationName() && validationPrice() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            categ: productCategInput.value,
            desc: productDescInput.value
        }
        productContainar.push(product)

        localStorage.setItem("products", JSON.stringify(productContainar))

        displayProduct()
        clearData()
    }


}

function clearData() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategInput.value = "";
    productDescInput.value = "";
}

function displayProduct() {
    var cartona = ''
    for (var i = 0; i < productContainar.length; i++) {

        cartona += `
        <tr>
        <th>${productContainar[i].name}</th>
        <th>${productContainar[i].price}</th>
        <th>${productContainar[i].categ}</th>
        <th>${productContainar[i].desc}</th>
        <th>
            <button class="btn btn-outline-warning" onclick="setData(${i})">Update</button>
            <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
        </th>
    </tr>`

    }
    document.getElementById("tableData").innerHTML = cartona
}

function deleteProduct(element) {

    productContainar.splice(element, 1);
    localStorage.setItem("products", JSON.stringify(productContainar))
    displayProduct();

}

function search() {

    var term = searchInput.value
    var cartona = ''
    for (var i = 0; i < productContainar.length; i++) {
        if (productContainar[i].name.toLowerCase().includes(term.toLowerCase())) {
            cartona += `
        <tr>
        <th>${productContainar[i].name}</th>
        <th>${productContainar[i].price}</th>
        <th>${productContainar[i].categ}</th>
        <th>${productContainar[i].desc}</th>
        <th>
            <button class="btn btn-outline-warning">Update</button>
            <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
        </th>
    </tr>`
        }
    }
    document.getElementById("tableData").innerHTML = cartona
}

function setData(index) {

    indexUpdate = index;

    var currentProduct = productContainar[index]

    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategInput.value = currentProduct.categ;
    productDescInput.value = currentProduct.desc;

    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");


}

function updateProduct() {

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        categ: productCategInput.value,
        desc: productDescInput.value
    };
    productContainar.splice(indexUpdate, 1, product)
    localStorage.setItem("products", JSON.stringify(productContainar))
    displayProduct();

    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    clearData()

}

function validationName() {
    var messageName = document.getElementById("messageName")
    var regexName = /^[A-Z][a-z]{2,8}$/
    var text = productNameInput.value
    if (regexName.test(text) == true) {
        productNameInput.classList.add('is-valid')
        productNameInput.classList.remove('is-invalid')
        messageName.classList.add('d-none')
        return true

    } else {
        productNameInput.classList.remove('is-valid')
        productNameInput.classList.add('is-invalid')
        messageName.classList.remove('d-none')
        return false



    }

}

function validationPrice() {
    var messagePrice = document.getElementById("messagePrice")
    var regexprice = /^[0-9]{1,9}$/
    var text = productPriceInput.value
    if (regexprice.test(text) == true) {
        productPriceInput.classList.add('is-valid')
        productPriceInput.classList.remove('is-invalid')
        messagePrice.classList.add('d-none')
        return true

    } else {
        productPriceInput.classList.remove('is-valid')
        productPriceInput.classList.add('is-invalid')
        messagePrice.classList.remove('d-none')
        return false



    }

}