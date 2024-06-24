const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");

//GET USERS
router.get("/", userController.getAllUsers);
//GET USER BY ID
router.get("/:id", userController.getUserById);

//CREATE USER
router.post("/", userController.addUser);

//UPDATE USER BY ID
router.put("/:id", userController.updateUserById);

//DELETE USER BY ID
router.delete("/:id", userController.deleteUserById);

module.exports = router;
