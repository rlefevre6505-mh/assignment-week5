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

  fetch("http://localhost:8080/new-eateries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  form.reset();
}
