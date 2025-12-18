console.log("Hello World");

let markers = []; //"suitcase" for created markers, to be put in when not in use and pulled back when needed with the filter
let map; //used to be able to use the map later on for the filters/declared out of block scope/value assigned in createMap function

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
    checkbox.classList.add("tickbox");

    //to have checkbox before text
    label.prepend(checkbox);

    dietList.appendChild(label);
  });
}

DietReq();

//Function to send data submitted in form to database

searchForm.addEventListener("submit", function handleEaterySubmit(event) {
  event.preventDefault();
  //function to find coords from address
  async function findCoords() {
    let postcode = document.getElementById("postcode");
    let postcodeData = postcode.value;
    const url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
      postcodeData;
    const res = await fetch(url);
    const data = await res.json();
    const location_lat = data[0].lat;
    const location_lon = data[0].lon;
    const latString = location_lat.toString();
    const lonString = location_lon.toString();
    const latBox = document.getElementById("lat-box");
    const lonBox = document.getElementById("lon-box");
    latBox.textContent = latString;
    lonBox.textContent = lonString;
  }
  findCoords();

  async function completeSubmit() {
    await findCoords();
    const latBox = document.getElementById("lat-box");
    const lonBox = document.getElementById("lon-box");

    console.log(latBox.textContent);
    console.log(lonBox.textContent);

    const formDataTemplate = new FormData(form);
    const formValues = Object.fromEntries(formDataTemplate);
    console.log(formValues);
  }

  completeSubmit();

  fetch("https://diet-dine-server.onrender.com/new-eateries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });

  form.reset();
});

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

    const key = choices.dietary_requirements.toLowerCase().replaceAll(" ", "_"); //small change to value as it pulls them as upper case and without dashes from the supabase table. So set a const that changes them in the loop to match with server setup.
    option.value = key;
    option.textContent = choices.dietary_requirements;
    // option.name = "dietary_requirements";

    //to have checkbox before text
    // label.prepend(checkbox);

    dietList.appendChild(option);
  });
}

filterReq();

const getUserLocation = (position) => {
  const userLat = position.coords.latitude;
  const userLong = position.coords.longitude;
  const userCoordinates = [userLat, userLong];

  createMap(userCoordinates);
};

navigator.geolocation.getCurrentPosition(getUserLocation);

function createMap(getUserLocation) {
  map = L.map("map").setView(getUserLocation, 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  renderMarkers(map);
}

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

async function getRestaurantData() {
  const response = await fetch(
    "https://diet-dine-server.onrender.com/eateries"
  );
  const restaurantData = await response.json();
  return restaurantData;
}

const restaurantData = await getRestaurantData();
console.log(restaurantData);

async function renderMarkers(map) {
  const resData = await getRestaurantData();
  createMapMarkers(resData, map);
}

renderMarkers();

// commented out as unable to implement icon images to popups
// const icons = [
//   {
//     iconName: "Gluten free",
//     iconSrc: "/icons/glutenfree.png",
//     alt: "This eatery has gluten-free options",
//   },
//   {
//     iconName: "Dairy free",
//     iconSrc: "/icons/dairyfree.png",
//     alt: "This eatery has dairy-free options",
//   },
//   {
//     iconName: "Vegetarian",
//     iconSrc: "/icons/vegetarian.png",
//     alt: "This eatery has vegetarian options",
//   },
//   {
//     iconName: "Vegan",
//     iconSrc: "/icons/vegan.png",
//     alt: "This eatery has vegan options",
//   },
//   {
//     iconName: "Pescatarian",
//     iconSrc: "/icons/fish.png",
//     alt: "This eatery has pescatarian options",
//   },
//   {
//     iconName: "Allergy friendly",
//     iconSrc: "/icons/allergens.png",
//     alt: "This eatery has detailed allergen information",
//   },
//   {
//     iconName: "Wheelchair accessible",
//     iconSrc: "/icons/wheelchair.png",
//     alt: "This eatery is wheelchair accessible",
//   },
// ];

function createMapMarkers(data, map) {
  for (let i = 0; i < data.length; i++) {
    let mapMarkers = L.marker([
      data[i].location_lat,
      data[i].location_long,
    ]).addTo(map);
    // commented out as unable to implement adding icon images based on what dietary requirements each eatery caters for
    // mapMarkers.bindPopup(createPopupElements(restaurantData));
    // function createPopupElements(data) {
    //   `${data[i].name} <br>${data[i].address}<br><a href=${data[i].weblink} target="_blank">${data[i].weblink}</a>`;
    //   for (let i = 0; i < icons.length; i++) {
    //     if (data[i].gluten_free === true) {
    //       let glutenFreeIcon = document.createElement("img");
    //       glutenFreeIcon.className = "diet-icon";
    //       glutenFreeIcon.src = icons[0].iconSrc;
    //       glutenFreeIcon.alt = icons[0].alt;
    //     }
    //     if (data[i].dairy_free === true) {
    //       let dairyFreeIcon = document.createElement("img");
    //       dairyFreeIcon.className = "diet-icon";
    //       dairyFreeIcon.src = icons[1].iconSrc;
    //       dairyFreeIcon.alt = icons[1].alt;
    //     }
    //     if (data[i].vegetarian === true) {
    //       let vegetarianIcon = document.createElement("img");
    //       vegetarianIcon.className = "diet-icon";
    //       vegetarianIcon.src = icons[2].iconSrc;
    //       vegetarianIcon.alt = icons[2].alt;
    //     }
    //     if (data[i].vegan === true) {
    //       let veganIcon = document.createElement("img");
    //       veganIcon.className = "diet-icon";
    //       veganIcon.src = icons[3].iconSrc;
    //       veganIcon.alt = icons[3].alt;
    //       if (data[i].pescatarian === true) {
    //         let pescatarianIcon = document.createElement("img");
    //         pescatarianIcon.className = "diet-icon";
    //         pescatarianIcon.src = icons[4].iconSrc;
    //         pescatarianIcon.alt = icons[4].alt;
    //       }
    //       if (data[i].allergy_friendly === true) {
    //         let allergyIcon = document.createElement("img");
    //         allergyIcon.className = "diet-icon";
    //         allergyIcon.src = icons[5].iconSrc;
    //         allergyIcon.alt = icons[5].alt;
    //       }
    //       if (data[i].wheelchair_accessible === true) {
    //         let wheelchairIcon = document.createElement("img");
    //         wheelchairIcon.className = "diet-icon";
    //         wheelchairIcon.src = icons[6].iconSrc;
    //         wheelchairIcon.alt = icons[6].alt;
    //       }
    //     }
    //   }
    // }
    mapMarkers.bindPopup(
      `${data[i].name} <br>${data[i].address}<br><a href=${data[i].weblink} target="_blank">${data[i].weblink}</a><br><ul><li>Gluten free: ${data[i].gluten_free}</li><li>Dairy free: ${data[i].dairy_free}</li><li>Vegetarian: ${data[i].vegetarian}</li><li>Vegan: ${data[i].vegan}</li><li>Pescatarian: ${data[i].pescatarian}</li><li>Allergy friendly: ${data[i].allergy_friendly}</li><li>Wheelchair accessible: ${data[i].wheelchair_accessible}</li></ul>`
    );
    markers.push(mapMarkers);
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
  if (document.getElementById("popin").style.width != "0") {
    document.getElementById("popin").style.width = "0";
  }

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
  if (document.getElementById("dropdown").style.width != "0") {
    document.getElementById("dropdown").style.width = "0";
  }

  document.getElementById("popin").style.width = "90vw";
});

popInCloseButton.addEventListener("click", function () {
  document.getElementById("popin").style.width = "0";
});

//code for date fomr validation - cannot add future dates
const today = new Date();
let day = today.getDate();
let nextDay = today.getDate() + 1;
let month = today.getMonth() + 1;
let year = today.getFullYear();
let currentDate = `${year}-${month}-${day}`;
const dateSetter = document.getElementById("date-setter");
dateSetter.setAttribute("max", currentDate);

//TO DO: add the filter function to the search form

const filterForm = document.getElementById("filter");

filterForm.addEventListener("change", async (event) => {
  const selection = event.target.value; //target property, in this case which dietary requirement

  let url = "https://diet-dine-server.onrender.com/dieteateries";
  if (selection) {
    url += `?${selection}=true`;
  }

  const result = await fetch(url); //requests the URL from above and waits for the server to reply
  const list = await result.json(); //reads the response from the server and parses it to JSON, list holds the data it gets from the server

  console.log("Filtered Eateries:", list); //displays results in console.log
  removeMarkers();
  createMapMarkers(list, map);
});

function removeMarkers() {
  for (let i = 0; i < markers.length; i++) {
    map.removeLayer(markers[i]);
  }
  markers = [];
}
