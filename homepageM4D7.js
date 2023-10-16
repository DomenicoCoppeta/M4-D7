// Impostazioni per la richiesta
const endPoint = "https://striveschool-api.herokuapp.com/api/product/"
const getOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjJiZjM5MzI3YzAwMThkM2EyYzciLCJpYXQiOjE2OTYzMzA0MzEsImV4cCI6MTY5NzU0MDAzMX0.9subLPlYGhuc30WR5TKf22gdFOGim5LmFpqzZbb8FPg"
    }
}
// Array per conservare gli items
let items = [];

async function getItems() {
    try {
    const response = await fetch( endPoint, getOptions);
    items = await response.json();
    displayItems(items);
    } catch (error) {
    console.error("Errore: " + error.message);
}
}


function displayItems(data) {
    const itemsList = document.getElementById("itemsList")
    itemsList.innerHTML = data.map(({ _id, name , description, brand, imageUrl, price }) => 
/*html*/`
        <div id="_${_id}" class="col-lg-3 col-md-6 col-sm-6 d-flex">
            <div class="card w-100 my-3 shadow-2-strong mx-3 px-2">
                <img src="${imageUrl}" class="card-img-top" style="aspect-ratio: 1 / 1" />
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${brand} - ${name}</h5>
                    <p class="card-text" >${description}</p>
                    <p class="card-text mb-1">${price}€</p>
                    <hr class="my-2">
                    <div class="d-flex align-items-center justify-content-center py-0 px-0 pb-0 mt-1">
                        <a href="/itemM4D7.html?id=${_id}" class="btn btn-info shadow-0 me-1">Info</a>
                        <a href="#!" class="btn btn-light border px-2 pt-2 icon-hover me-1"><i class="bi bi-heart-fill mx-1"></i></a>
                        <a href="#!" onclick="addToCart()" class="btn btn-success shadow-0 me-1">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>`).join("")
}

window.onload = getItems;

// Elementi del filtro
const filter = document.getElementById("filterSelector");
const textInput = document.getElementById('searchInput');

// // Aggiungi gestori di eventi per il cambio nel dropdown e l'input di testo
filter.addEventListener("change", filteredItems);
textInput.addEventListener("input", filteredItems);


// Funzione per filtrare gli utenti in base al campo e al testo inserito
function filteredItems() {
    const field = filter.value;
    const textFilter = textInput.value.toLowerCase();
    const filteredItems = items.filter(item => {
        switch (field) {
            case "all":
                return (
                    item.name.toLowerCase().includes(textFilter) ||
                    item.description.toLowerCase().includes(textFilter) ||
                    item.brand.toLowerCase().includes(textFilter) ||
                    item.price.toString().toLowerCase().includes(textFilter)
                );
            case "name":
                return item.name.toLowerCase().includes(textFilter);
            case "description":
                return item.description.toLowerCase().includes(textFilter);
            case "brand":
                return item.brand.toLowerCase().includes(textFilter);
            case "price":
                return item.price.toString().toLowerCase().includes(textFilter);
            default:
                return false;
        }
    });
    displayItems(filteredItems);
}


function addToCart() {
}
