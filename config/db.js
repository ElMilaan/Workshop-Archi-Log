require("dotenv").config({ path: "./config/.env" });
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données: " + err.stack);
    return;
  }
  console.log("Connecté à la base de données avec l'ID " + connection.threadId);
});

module.exports = connection;
