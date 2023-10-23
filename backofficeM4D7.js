const productName = document.getElementById("productName")
const description = document.getElementById("description")
const brand = document.getElementById("brand")
const image = document.getElementById("image")
const price = document.getElementById("price")
const list = document.getElementById("itemsList")
const endPoint = "https://striveschool-api.herokuapp.com/api/product/"
const getOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM2YzE4MTg0ZjU2ZjAwMTgyMWQ0MzIiLCJpYXQiOjE2OTgwODcyOTcsImV4cCI6MTY5OTI5Njg5N30.6Ywz863k85DGFFwiuTOhq3eNEg1xxlijVCuCFYctdZg"
    }
    }

const postOptions = {
    method: "POST",
    redirect: "follow",
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM2YzE4MTg0ZjU2ZjAwMTgyMWQ0MzIiLCJpYXQiOjE2OTgwODcyOTcsImV4cCI6MTY5OTI5Njg5N30.6Ywz863k85DGFFwiuTOhq3eNEg1xxlijVCuCFYctdZg",
    },
    body: JSON.stringify ({
        name: productName.value,
        description: description.value,
        brand: brand.value,
        imageUrl:  image.value,
        price: price.value
    })
    }


async function getItems() {
    try {
    const response = await fetch( endPoint, getOptions);
    const data = await response.json();
    console.log(data);
    displayItems(data);
    return data
    } catch (error) {
    console.error("Errore: " + error.message);
}
}


async function addItem(item) {
    item.preventDefault()
        
    const response = await fetch( endPoint, {
        method: "POST",
        redirect: "follow",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM2YzE4MTg0ZjU2ZjAwMTgyMWQ0MzIiLCJpYXQiOjE2OTgwODcyOTcsImV4cCI6MTY5OTI5Njg5N30.6Ywz863k85DGFFwiuTOhq3eNEg1xxlijVCuCFYctdZg",
        },
        body: JSON.stringify ({
            name: productName.value,
            description: description.value,
            brand: brand.value,
            imageUrl:  image.value,
            price: price.value
        })
        });
        if (response.ok) {
            alert( "Item added successfully")
            const data = await getItems()
            displayItems(data)

            for (const field of [ productName , description, brand, image, price]) {
            field.value = ""
            }
        } else {
        alert ( "Cannot add Item, something went wrong!");
        }
}

async function editItem(id) {
    const item = await fetch(endPoint + id, getOptions)
    const itemJson = await item.json()
    const { name, description, brand, imageUrl, price } = itemJson


    itemRow = document.querySelector(`#_${id}`)
  

    itemRow.innerHTML = /*html*/`
    <form class="d-flex col-12 my-1" onsubmit="submitEditItem(event,'${id}')">
                    <div class="col-2 pe-4">
                        <input required id="productNameEdit" type="text" class="form-control" value="${name}">
                    </div>
                    <div class="col-3 ps-1 pe-4">
                        <input required id="descriptionEdit" type="text" class="form-control" value="${description}">
                    </div>
                    <div class="col-1 pe-4">
                        <div class="d-flex align-items-center">
                            <input required id="brandEdit" type="text" class="form-control" value="${brand}">
                        </div>
                    </div>
                    <div class="col-4 pe-4">
                        <div class="d-flex align-items-center">
                            <input required id="imageEdit" type="text" class="form-control" value="${imageUrl}">
                        </div>
                    </div>
                    <div class="col-1 pe-4">
                        <div class="d-flex align-items-center">
                            <input required id="priceEdit" step="0.01" type="number" class="form-control" value="${price}">
                        </div>
                    </div>
                    <div class="col-1">
                        <button class="ms-2 btn btn-success" type="submit"><i class="bi bi-check-lg"></i></i></button>
                        <button class="ms-2 btn btn-danger" type="button" onclick="abortEdit()"><i class="bi bi-x-octagon"></i></button>
                    </div>
                </div>
    </form>`
}

async function submitEditItem(item, id) {
    item.preventDefault()

    const name = document.getElementById('productNameEdit');
    const description = document.getElementById('descriptionEdit');
    const brand = document.getElementById('brandEdit');
    const image = document.getElementById('imageEdit');
    const price = document.getElementById('priceEdit');

    const editedItem = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: image.value,
        price: price.value,
    }

    try {
        const response = await fetch( endPoint + id, {
        method: 'PUT',
        redirect: 'follow',
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM2YzE4MTg0ZjU2ZjAwMTgyMWQ0MzIiLCJpYXQiOjE2OTgwODcyOTcsImV4cCI6MTY5OTI5Njg5N30.6Ywz863k85DGFFwiuTOhq3eNEg1xxlijVCuCFYctdZg",
        },
        body: JSON.stringify(editedItem)
        })
        if (response.ok) {
        alert("Item updated successfully")
        displayItems( await getItems())
        } else {
            alert("Something went wrong with updating. Please try again.")
        }
    } catch (error) {
    console.error("Errore: " + error.message);
    }
}

async function abortEdit() {
        displayItems (await getItems())
    }

function displayItems(data) {
itemsList.innerHTML = data.map(({ _id, name , description, brand, imageUrl, price }) => /*html*/`
        <div id="_${_id}" class="d-flex align-items-center my-3 px-0 text-secondary col-12">
            <div class="col-2  px-0">
                ${name}
            </div>
            <div class="col-3 px-1">
                ${description}
            </div>
            <div class="col-1 px-0">
                ${brand}
            </div>
            <div class="col-4 overflow-hidden pe-4">
                ${imageUrl}
            </div>
            <div class="col-1 px-0">
                ${price}
            </div>
            <div class="col-1 px-0">
                <button class="ms-2 btn btn-primary" onclick="editItem('${_id}')"><i class="bi bi-pencil-square"></i></button>
                <button class="ms-2 btn btn-danger" onclick="deleteItem('${_id}')" ><i class="bi bi-trash3"></i></button>
            </div>
        </div>
        <hr>`).join("")
}

async function deleteItem(id) {
    if (!confirm('This action will permanently delete this item. Proceed?')) {return}
    const response = await fetch ( endPoint + id, {
    method: 'DELETE',
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM2YzE4MTg0ZjU2ZjAwMTgyMWQ0MzIiLCJpYXQiOjE2OTgwODcyOTcsImV4cCI6MTY5OTI5Njg5N30.6Ywz863k85DGFFwiuTOhq3eNEg1xxlijVCuCFYctdZg",
        }
    })
    if (response.ok) {
        alert ('The selected item was successfully deleted')
        displayItems (await getItems())
    } else {
        alert ('An error occurred while deleting the selected item, try again later')
    }

}

window.onload = () => {
  getItems();
};