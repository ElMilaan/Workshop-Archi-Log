const db = require("../../config/db");

module.exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM User";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

module.exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM User WHERE user_id = ${userId}`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  });
};

module.exports.addUser = async (res, req) => {};

module.exports.updateUserById = async (res, req) => {};

module.exports.deleteUserById = async (res, req) => {};
