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
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3OWJhYmU3NDZhMDAwMTQ4MTQzMWQiLCJpYXQiOjE2OTgxNDMxNDcsImV4cCI6MTY5OTM1Mjc0N30.ZELUkJGxdLTD41Lt1ODTgroMxWgDSf-5O-6vvni1Eas"
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
