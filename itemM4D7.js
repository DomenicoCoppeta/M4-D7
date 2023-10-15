const params = new URLSearchParams(window.location.search);
const id = params.get("id")

const endPoint = "https://striveschool-api.herokuapp.com/api/product/"+ id;
let item = {}

window.onload = getItem;

async function getItem() {
    try {
    const response = await fetch( endPoint, {
        method: "GET",
        redirect: "follow",
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZjJiZjM5MzI3YzAwMThkM2EyYzciLCJpYXQiOjE2OTYzMzA0MzEsImV4cCI6MTY5NzU0MDAzMX0.9subLPlYGhuc30WR5TKf22gdFOGim5LmFpqzZbb8FPg"
        }
        });
    const data = await response.json();
    item = data
    console.log(data);
    displayItem(data);
    } catch (error) {
    console.error("Errore: " + error.message);
    }
}


function displayItem(data) {
    document.getElementById("title").innerHTML = item.brand + ' ' + item.name;
    document.querySelector("img").src = item.imageUrl;
    document.getElementById("price").innerHTML = "Price :"+item.price+" $";
    document.getElementById("description").innerHTML = item.description;
}