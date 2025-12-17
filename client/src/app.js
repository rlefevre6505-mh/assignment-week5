console.log("Hello World");

const searchForm = document.getElementById("form");
console.log(form);

//create the function for the dietary requirements dropdown list

async function DietReq() {
  const res = await fetch(
    "http://localhost:8080/dietary_requirements_submit" //change to render link once setup
  );
  const list = await res.json();
  console.log("Dietary Requirements:", list);

  const dietList = document.getElementById("choices");
  list.forEach((choices) => {
    const label = document.createElement("label");
    label.style.display = "block"; //underneath each other - can be changed later if there are issues with CSS
    label.textContent = choices.dietary_requirements;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = choices.dietary_requirements;
    checkbox.name = "dietary_requirements";

    //to have checkbox before text
    label.prepend(checkbox);

    dietList.appendChild(label);
  });
}

DietReq();

//Function to send data submitted in form to database

function handleEaterySubmit(event) {
  event.preventDEfault();
  const formDataTemplate = new FormData(form);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues);

  fetch("http://localhost:8080/new-eateries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  form.reset();
}
// const map = L.map("map").setView([52.62963764444887, 1.30158956384622], 13);

//commented out due to duplication
// async function getRestaurantData() {
//   const response = await fetch("http://localhost:8080/eateries");
//   const restaurantData = await response.json();
//   return restaurantData;
// }

// commented out due to duplication
// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

const map = L.map("map").setView([52.62963764444887, 1.30158956384622], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function getRestaurantData() {
  const response = await fetch("http://localhost:8080/eateries");
  const restaurantData = await response.json();
  return restaurantData;
}

const restaurantData = await getRestaurantData();
console.log(restaurantData);

async function renderMarkers() {
  const resData = await getRestaurantData();
  createMapMarkers(resData);
}

renderMarkers();

function createMapMarkers(data) {
  for (let i = 0; i < data.length; i++) {
    let mapMarkers = L.marker([
      data[i].location_lat,
      data[i].location_long,
    ]).addTo(map);
    mapMarkers.bindPopup(
      `${data[i].name} <br>${data[i].address}<br><a href=${data[i].weblink} target="_blank">${data[i].weblink}</a>`
    );
  }
}

// removed due to duplication
// function createMapMarkers(data) {
//   for (let i = 0; i < data.length; i++) {
//     let markerCoords = [data[i].location_lat, data[i].location_long];
//     let mapMarkers = L.marker(markerCoords).addTo(map);
//   }
// }

//Modal Button

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal");
  const closeButton = document.getElementById("closeModal");

  modal.showModal();

  closeButton.addEventListener("click", () => {
    modal.close();
  });
});

// functions for filter side bar
const dropdownDiv = document.getElementById("dropdown");
const dropdownButton = document.getElementById("dropdown-button");
const dropdownCloseButton = document.getElementById("dropdown-close-button");

dropdownButton.addEventListener("click", function () {
  document.getElementById("dropdown").style.width = "40vw";
});

dropdownCloseButton.addEventListener("click", function () {
  document.getElementById("dropdown").style.width = "0";
});

// functions for form side bar
const popInDiv = document.getElementById("popin");
const popInButton = document.getElementById("popin-button");
const popInCloseButton = document.getElementById("popin-close-button");

popInButton.addEventListener("click", function () {
  document.getElementById("popin").style.width = "60vw";
});

popInCloseButton.addEventListener("click", function () {
  document.getElementById("popin").style.width = "0";
});
