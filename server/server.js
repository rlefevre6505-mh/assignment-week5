import express from "express";

import cors from "cors";

import { db } from "./bdconnections.js";

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

app.get("/eateries", async (req, res) => {
  const eateriesData = await db.query("SELECT * FROM eateries");
  res.json({ eateriesData });
});
