const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./src/router/users.routes");
const exerciseRoutes = require("./src/router/exercise.routes");
const sessionRoutes = require("./src/router/session.routes");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api/user", userRoutes); //gère les redirections utilisateurs (les routes)
app.use("/api/exercise", exerciseRoutes);
app.use("/api/session", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Le serveur est lancé sur le port : " + port);
});
