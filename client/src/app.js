console.log("Hello World");

//Modal Button

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal");
  const closeButton = document.getElementById("closeModal");

  modal.showModal();

  closeButton.addEventListener("click", () => {
    modal.close();
  });
});

const searchForm = document.getElementById("form");
console.log(form);

//create the function for the dietary requirements form

async function DietReq() {
  const res = await fetch(
    "https://diet-dine-server.onrender.com/dietary_requirements_submit" //change to render link once setup
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

//function to populate requirements into the  dropdown filter

async function filterReq() {
  const res = await fetch(
    "https://diet-dine-server.onrender.com/dietary_requirements_submit" //change to render link once setup
  );
  const list = await res.json();
  // console.log("Dietary Requirements:", list);

  const dietList = document.getElementById("filter");
  list.forEach((choices) => {
    // const label = document.createElement("label");
    // label.style.display = "block"; //underneath each other - can be changed later if there are issues with CSS

    const option = document.createElement("option");
    option.type = "option";
    option.value = choices.dietary_requirements;
    option.textContent = choices.dietary_requirements;
    // option.name = "dietary_requirements";

    //to have checkbox before text
    // label.prepend(checkbox);

    dietList.appendChild(option);
  });
}

filterReq();

//Function to send data submitted in form to database

searchForm.addEventListener("submit", function handleEaterySubmit(event) {
  event.preventDefault();
  const formDataTemplate = new FormData(form);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues);

  fetch("https://diet-dine-server.onrender.com/new-eateries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  form.reset();
});

const getUserLocation = (position) => {
  // console.log(position.coords.latitude);
  const userLat = position.coords.latitude;
  // console.log(position.coords.longitude);
  const userLong = position.coords.longitude;
  const userCoordinates = [userLat, userLong];
  // console.log(userCoordinates);
  return userCoordinates;
};

// getUserLocation();

// console.log(userCoordinates);

navigator.geolocation.getCurrentPosition(getUserLocation);

const map = L.map("map").setView(userCoordinates, 13);

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

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function getRestaurantData() {
  const response = await fetch(
    "https://diet-dine-server.onrender.com/eateries"
  );
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

// functions for side bar dropdown
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
  document.getElementById("dropdown").style.width = "90vw";
});

dropdownCloseButton.addEventListener("click", function () {
  document.getElementById("dropdown").style.width = "0";
});

// functions for form side bar
const popInDiv = document.getElementById("popin");
const popInButton = document.getElementById("popin-button");
const popInCloseButton = document.getElementById("popin-close-button");

popInButton.addEventListener("click", function () {
  document.getElementById("popin").style.width = "90vw";
});

popInCloseButton.addEventListener("click", function () {
  document.getElementById("popin").style.width = "0";
});

//TO DO: add the filter function to the search form
