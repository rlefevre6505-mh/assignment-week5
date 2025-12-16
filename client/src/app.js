console.log("Hello World");

const searchForm = document.getElementById("form");
console.log(form);

//create the function for the dietary requirements dropdown list

async function DietReq() {
  const res = await fetch(
    "https://diet-dine-server.onrender.com/dietary_requirements_submit" //change to render link once setup
  );
  const list = await res.json();
  console.log("Dietary Requirements:", list);

  const dietList = document.getElementById("choices");
  list.forEach((choices) => {
    const dietChoice = document.createElement("option");
    dietChoice.value = choices.dietary_requirements;
    dietChoice.textContent = choices.dietary_requirements;
    dietList.appendChild(dietChoice);
  });
}

DietReq();

//Function to send data submitted in form to database

function handleEaterySubmit(event) {
  event.preventDEfault();
  const formDataTemplate = new FormData(form);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues);

  fetch("https://diet-dine-server.onrender.com//new-eateries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  form.reset();
}
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
    let markerCoords = [data[i].location_lat, data[i].location_long];
    let mapMarkers = L.marker(markerCoords).addTo(map);
  }
}
