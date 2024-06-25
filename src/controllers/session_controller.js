const db = require("../../config/db");

module.exports.getAllSessions = (req, res) => {
  const query = "SELECT * FROM Session";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

module.exports.getSessionById = (req, res) => {
  const sessionId = req.params.id;
  console.log(sessionId);
  const query = `SELECT * FROM Session WHERE session_id = ?`;
  db.query(query, [sessionId], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(results[0]);
  });
};

module.exports.getSessionExercises = (req, res) => {
  const sessionId = req.params.id;
  const query = `SELECT * FROM Exercice e INNER JOIN ExerciceSession es ON e.exercice_id = es.exercice_id WHERE es.session_id = ?`;
  db.query(query, [sessionId], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Session or exercises not found" });
    }
    res.json(results);
  });
};

module.exports.getSessionExerciseById = (req, res) => {
  const sessionId = req.params.id;
  const exerciseId = req.params.ex_id;
  const query = `SELECT * FROM Exercice e INNER JOIN ExerciceSession es ON e.exercice_id = es.exercice_id WHERE es.exercice_id = ? AND es.session_id = ?`;
  db.query(query, [sessionId, exerciseId], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Session or exercise not found" });
    }
    res.json(results[0]);
  });
};

module.exports.addSession = (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send("user_id is required");
  }

  const sql = "INSERT INTO Session (user_id) VALUES (?)";

  db.query(sql, [user_id], (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de l'insertion de la session : " + error.stack
      );
      return res.status(500).send("Erreur du serveur");
    }

    res.status(201).send(`Session added successfully`);
  });
};

module.exports.addSessionExercise = (req, res) => {
  const session_id = req.params.id;
  const { exercise_id, tempo } = req.body;

  if (!exercise_id || !tempo) {
    return res.status(400).send("exercise_id and tempo are required");
  }

  const sql =
    "INSERT INTO ExerciceSession (session_id, exercice_id, tempo) VALUES (?, ?, ?)";

  db.query(sql, [session_id, exercise_id, tempo], (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de l'insertion de l'exercice : " + error.stack
      );
      return res.status(500).send("Erreur du serveur");
    }
    res.status(201).send(`Exercise added successfully`);
  });
};

module.exports.updateSessionById = (req, res) => {
  const session_id = req.params.id;
  const { user_id } = req.body;

  const sql = `UPDATE Session SET user_id = ? WHERE session_id = ?`;

  db.query(sql, [user_id, session_id], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'update de la session : " + error.stack);
      return res.status(500).send("Erreur du serveur");
    }

    res.status(200).json({ message: "Session updated successfully" });
  });
};

module.exports.updateSessionExerciseById = (req, res) => {
  const session_id = req.params.id;
  const exercise_id = req.params.ex_id;
  const { tempo } = req.body;

  const sql = `UPDATE ExerciceSession SET tempo = ? WHERE session_id = ? AND exercice_id = ?`;

  db.query(sql, [tempo, session_id, exercise_id], (error, results) => {
    if (error) {
      console.error("Erreur lors de l'update de l'exercice : " + error.stack);
      return res.status(500).send("Erreur du serveur");
    }

    res.status(200).json({ message: "Exercise updated successfully" });
  });
};

module.exports.deleteSessionById = (req, res) => {
  const session_id = req.params.id;

  const sql = "DELETE FROM Session Where session_id = ?";
  db.query(sql, [session_id], (error, results) => {
    if (error) {
      console.error("Erreur lors du delete de la session : " + error.stack);
      return res.status(500).send("Erreur du serveur");
    }
    res.status(200).json({ message: "Session deleted successfully" });
  });
};

module.exports.deleteSessionExerciseById = (req, res) => {
  const session_id = req.params.id;
  const exercise_id = req.params.ex_id;

  const sql =
    "DELETE FROM ExerciceSession WHERE exercice_id = ? AND session_id = ?";
  db.query(sql, [exercise_id, session_id], (error, results) => {
    if (error) {
      console.error("Erreur lors du delete de l'exercice : " + error.stack);
      return res.status(500).send("Erreur du serveur");
    }
    res.status(200).json({ message: "Exercise deleted successfully" });
  });
};
