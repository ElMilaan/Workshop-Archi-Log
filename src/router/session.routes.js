const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/session_controller");

router.get("/", sessionController.getAllSessions);
router.get("/:id", sessionController.getSessionById);
router.get("/exercise/:id", sessionController.getSessionExercises);
router.get("/exercise/:id/:ex_id", sessionController.getSessionExerciseById);

router.post("/", sessionController.addSession);
router.post("/exercise/:id", sessionController.addSessionExercise);

router.put("/:id", sessionController.updateSessionById);
router.put("/exercise/:id/:ex_id", sessionController.updateSessionExerciseById);

router.delete("/:id", sessionController.deleteSessionById);
router.delete(
  "/exercise/:id/:ex_id",
  sessionController.deleteSessionExerciseById
);

module.exports = router;
