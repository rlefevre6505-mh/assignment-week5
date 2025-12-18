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
  const userLat = position.coords.latitude;
  const userLong = position.coords.longitude;
  const userCoordinates = [userLat, userLong];

  createMap(userCoordinates);
};

navigator.geolocation.getCurrentPosition(getUserLocation);

function createMap(getUserLocation) {
  const map = L.map("map").setView(getUserLocation, 13);
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

const icons = [
  {
    iconName: "Gluten free",
    iconSrc: "/icons/glutenfree.png",
    alt: "This eatery has gluten-free options",
  },
  {
    iconName: "Dairy free",
    iconSrc: "/icons/dairyfree.png",
    alt: "This eatery has dairy-free options",
  },
  {
    iconName: "Vegetarian",
    iconSrc: "/icons/vegetarian.png",
    alt: "This eatery has vegetarian options",
  },
  {
    iconName: "Vegan",
    iconSrc: "/icons/vegan.png",
    alt: "This eatery has vegan options",
  },
  {
    iconName: "Pescatarian",
    iconSrc: "/icons/fish.png",
    alt: "This eatery has pescatarian options",
  },
  {
    iconName: "Allergy friendly",
    iconSrc: "/icons/allergens.png",
    alt: "This eatery has detailed allergen information",
  },
  {
    iconName: "Wheelchair accessible",
    iconSrc: "/icons/wheelchair.png",
    alt: "This eatery is wheelchair accessible",
  },
];

function createMapMarkers(data, map) {
  for (let i = 0; i < data.length; i++) {
    let mapMarkers = L.marker([
      data[i].location_lat,
      data[i].location_long,
    ]).addTo(map);
    mapMarkers.bindPopup(createPopupElements(restaurantData));
    function createPopupElements(data) {
      `${data[i].name} <br>${data[i].address}<br><a href=${data[i].weblink} target="_blank">${data[i].weblink}</a>`;
      for (let i = 0; i < icons.length; i++) {
        if (data[i].gluten_free === true) {
          let glutenFreeIcon = document.createElement("img");
          glutenFreeIcon.className = "diet-icon";
          glutenFreeIcon.src = icons[0].iconSrc;
          glutenFreeIcon.alt = icons[0].alt;
        }
        if (data[i].dairy_free === true) {
          let dairyFreeIcon = document.createElement("img");
          dairyFreeIcon.className = "diet-icon";
          dairyFreeIcon.src = icons[1].iconSrc;
          dairyFreeIcon.alt = icons[1].alt;
        }
        if (data[i].vegetarian === true) {
          let vegetarianIcon = document.createElement("img");
          vegetarianIcon.className = "diet-icon";
          vegetarianIcon.src = icons[2].iconSrc;
          vegetarianIcon.alt = icons[2].alt;
        }
        if (data[i].vegan === true) {
          let veganIcon = document.createElement("img");
          veganIcon.className = "diet-icon";
          veganIcon.src = icons[3].iconSrc;
          veganIcon.alt = icons[3].alt;
          if (data[i].pescatarian === true) {
            let pescatarianIcon = document.createElement("img");
            pescatarianIcon.className = "diet-icon";
            pescatarianIcon.src = icons[4].iconSrc;
            pescatarianIcon.alt = icons[4].alt;
          }
          if (data[i].allergy_friendly === true) {
            let allergyIcon = document.createElement("img");
            allergyIcon.className = "diet-icon";
            allergyIcon.src = icons[5].iconSrc;
            allergyIcon.alt = icons[5].alt;
          }
          if (data[i].wheelchair_accessible === true) {
            let wheelchairIcon = document.createElement("img");
            wheelchairIcon.className = "diet-icon";
            wheelchairIcon.src = icons[6].iconSrc;
            wheelchairIcon.alt = icons[6].alt;
          }
        }
      }
    }
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

const filterForm = document.getElementById("filter");

filterForm.addEventListener("change", async (event) => {
  const selection = event.target.value; //target property, in this case which dietary requirement

  const url = "https://diet-dine-server.onrender.com/dieteateries";
  if (selection) {
    url += `?${selection}=true`;
  }

  const result = await fetch(url); //requests the URL from above and waits for the server to reply
  const list = await result.json(); //reads the response from the server and parses it to JSON, list holds the data it gets from the server

  console.log("Filtered Eateries:", list); //displays results in console.log
});
