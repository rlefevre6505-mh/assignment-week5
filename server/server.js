import express from "express";

import cors from "cors";

import { db } from "./bdconnections.js";
// import { prototype } from "pg/lib/type-overrides";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 8080;
app.listen(PORT, () => {
  console.info(`Server is running in port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server. GET comfy!" });
});

// app.get("/eateries", async (req, res) => {
//   const eateriesData = await db.query("SELECT * FROM eateries");
//   res.json({ eateriesData });
// });
//==============================================Getting Data from the client==========================================

//Post method to receive the data from the submit form

app.post("/new-eateries", async (req, res) => {
  const newEateries = req.body.formValues;
  console.log(newEateries);
  const query = await db.query(
    `INSERT INTO eateries (name, date_visited, location_lat, location_long, address, weblink, gluten_free, dairy_free, vegetarian, vegan, pescatarian, allergy_friendly, wheelchair_accessible) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
    [
      newEateries.name,
      newEateries.date_visited,
      newEateries.location_lat,
      newEateries.location_long,
      newEateries.address,
      newEateries.weblink,
      newEateries.gluten_free,
      newEateries.dairy_free,
      newEateries.vegetarian,
      newEateries.vegan,
      newEateries.pescatarian,
      newEateries.allergy_friendly,
      newEateries.wheelchair_accessible,
    ]
  );
  res.json({ status: "success", values: newEateries });
});

app.get("/eateries", async function (request, response) {
  const query = await db.query(
    `SELECT name, date_visited, location_lat, location_long, address, weblink, gluten_free, dairy_free, vegetarian, vegan, pescatarian, allergy_friendly, wheelchair_accessible FROM eateries; `
  );
  console.log(query);
  response.json(query.rows);
});

//GET method to populate dietary requirements dropdown  both on the submit and search page

app.get("/dietary_requirements_submit", async (req, res) => {
  const query = await db.query(
    `SELECT dietary_requirements FROM dietary_requirements_submit ORDER BY dietary_requirements;`
  );
  console.log(query.rows);
  res.json(query.rows);
});

//Functions to go for filter

// app.get("/dietaryeateries", async (req, res) => {
//   let query = "SELECT * FROM eateries";

//   if (req.query.vegan === "true") {
//     query += " WHERE vegan = true";
//   }

//   const result = await db.query(query);

//   console.log("req.query:", req.query);

//   res.json(result.rows);
// });

//TO DO: add option to have multiple filters

app.get("/dieteateries", async (req, res) => {
  let query = "SELECT * FROM eateries";
  const condition = []; //empty array to collect all the filters + push condition: https://www.w3schools.com/jsref/jsref_push.asp

  if (req.query.vegan === "true") condition.push("vegan = true");
  if (req.query.gluten_free === "true") condition.push("gluten_free = true");
  if (req.query.dairy_free === "true") condition.push("dairy_free = true");
  if (req.query.vegetarian === "true") condition.push("vegetarian = true");
  if (req.query.pescatarian === "true") condition.push("pescatarian = true");
  if (req.query.allergy_friendly === "true")
    condition.push("allergy_friendly = true");
  if (req.query.wheelchair_accessible === "true")
    condition.push("wheelchair_accessible = true"); //if any of these conditions are true this will fill the empty array
  if (condition.length > 0) {
    query += ` WHERE ` + condition.join(` AND `); //if more than one filter has been selected, this will join them, otherwise all eateries will be displayed
  }
  console.log("SQL:", query);
  const result = await db.query(query);
  console.log(result.rows);
  res.json(result.rows);
});

//to test use this example: http://localhost:8080/dieteateries?gluten_free=true&vegan=false
