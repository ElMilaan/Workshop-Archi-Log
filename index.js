const express = require("express");
require("dotenv").config({ path: "./config/.env" });

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Le serveur est lancé sur le port : " + port);
});
