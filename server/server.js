import express from "express";

import cors from "cors";

import { db } from "./bdconnections";
import { prototype } from "pg/lib/type-overrides";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 8080;
app.listen(prototype, () => {
  console.info(`Server is running in port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server. GET comfy!" });
});
