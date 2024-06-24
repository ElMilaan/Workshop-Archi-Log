const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/session_controller");

//GET SESSIONS
router.get("/", sessionController.getSessions);
//GET SESSION BY SESSION_ID
router.get("/:id", sessionController.getSessionById);
//GET SESSION EXERCISES BY SESSION_ID
router.get("/:id/exercises", sessionController.getSessionExercises);
//GET SESSION EXERCISE BY SESSION_ID AND EXERCISE_ID
router.get("/:id/exercises/:ex_id", sessionController.getSessionExerciseById);

//CREATE SESSION
router.post("/", sessionController.addSession);
//CREATE SESSION EXERCISE
router.post("/:id/exercises", sessionController.addSessionExercise);

//UPDATE SESSION BY ID
router.put("/:id", sessionController.updateSessionById);
//UPDATE SESSION EXERCISE BY ID
router.put(
  "/:id/exercises/:ex_id",
  sessionController.updateSessionExerciseById
);

//DELETE SESSION BY ID
router.delete("/:id", sessionController.deleteSessionById);
//DELETE SESSION EXERCISE BY ID
router.delete(
  ":id/exercises/:ex_id",
  sessionController.deleteSessionExerciseById
);

module.exports = router;
