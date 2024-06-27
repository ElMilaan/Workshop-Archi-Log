const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
const authController = require("../controllers/auth_controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

module.exports = router;
