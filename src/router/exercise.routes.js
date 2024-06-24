const express = require("express");
const router = express.Router();

const exerciseController = require("../controllers/exercise_controller");

//GET EXERCISES
router.get("/", exerciseController.getAllExercises);
//GET EXERCICE BY ID
router.get("/:id", exerciseController.getExerciseById);

//CREATE EXERCISE
router.post("/", exerciseController.addExercise);

//UPDATE EXERCISE BY ID
router.put("/:id", exerciseController.updateExerciseById);

//UPDATE EXERCISE BY ID
router.delete("/:id", exerciseController.deleteExerciseById);

module.exports = router;
