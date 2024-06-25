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
  const query = `SELECT * FROM User WHERE user_id = ?`;
  db.query(query, [userId], (error, results) => {
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

module.exports.addUser = (req, res) => {
  const { mail, password, name, firstname, age } = req.body;

  if (!mail || !password || !name || !firstname || !age) {
    return res
      .status(400)
      .send("mail, password, name, firstname and age are required");
  }

  const sql =
    "INSERT INTO User (mail, password, name, firstname, age) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [mail, password, name, firstname, age], (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de l'insertion de l'utilisateur : " + error.stack
      );
      return res.status(500).send("Erreur du serveur");
    }

    res.status(201).send(`Utilisateur ajouté avec l'ID : ${results.insertId}`);
  });
};

module.exports.updateUserById = (req, res) => {
  const user_id = req.params.id;
  const { mail, password, name, firstname, age } = req.body;

  const sql = `UPDATE user SET mail = ?, password = ?, name = ?, firstname = ?, age = ? WHERE user_id = ?`;

  db.query(
    sql,
    [mail, password, name, firstname, age, user_id],
    (error, results) => {
      if (error) {
        console.error(
          "Erreur lors de l'update de l'utilisateur : " + error.stack
        );
        return res.status(500).send("Erreur du serveur");
      }

      res.status(200).json({ message: "User updated successfully" });
    }
  );
};

module.exports.deleteUserById = (req, res) => {
  const user_id = req.params.id;

  const sql = "DELETE FROM User Where user_id = ?";
  db.query(sql, [user_id], (error, results) => {
    if (error) {
      console.error("Erreur lors du delete de l'utilisateur : " + error.stack);
      return res.status(500).send("Erreur du serveur");
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};
