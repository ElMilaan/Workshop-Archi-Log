const db = require("../../config/db");

module.exports.getAllExercises = (req, res) => {
  const query = "SELECT * FROM Exercice";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

module.exports.getExerciseById = (req, res) => {
  const exerciseId = req.params.id;
  const query = `SELECT * FROM Exercice WHERE exercice_id = ?`;
  db.query(query, [exerciseId], (error, results) => {
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

module.exports.addExercise = (req, res) => {
  const { title, instrument_id } = req.body;

  if (!title || !instrument_id) {
    return res.status(400).send("title and instrument_id are required");
  }

  const sql = "INSERT INTO Exercice (title, instrument_id) VALUES (?, ?)";

  db.query(sql, [title, instrument_id], (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de l'insertion de l'exercice : " + error.stack
      );
      return res.status(500).send("Erreur du serveur");
    }

    res.status(201).send(`Exercice ajouté avec l'ID : ${results.insertId}`);
  });
};

module.exports.updateExerciseById = (req, res) => {
  const exercise_id = req.params.id;
  const { title, instrument_id } = req.body;

  const sql = `UPDATE exercice SET title = ?, instrument_id = ? WHERE exercice_id = ?`;

  db.query(sql, [title, instrument_id, exercise_id], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'update de l'exercice : " + error.stack);
      return res.status(500).send("Erreur du serveur");
    }

    res.status(200).json({ message: "Exercise updated successfully" });
  });
};

module.exports.deleteExerciseById = (req, res) => {
  const exercise_id = req.params.id;

  const sql = "DELETE FROM Exercice Where exercice_id = ?";
  db.query(sql, [exercise_id], (error, results) => {
    if (error) {
      console.error("Erreur lors du delete de l'exercice : " + error.stack);
      return res.status(500).send("Erreur du serveur");
    }
    res.status(200).json({ message: "Exercise deleted successfully" });
  });
};
