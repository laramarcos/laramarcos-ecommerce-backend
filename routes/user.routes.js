const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middlewares")
const isAdmin = require("../middlewares/admin.middleware");


router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", [ auth, isAdmin ], userController.deleteUserById);
router.put("/users/:id", [ auth ], userController.updateUserById);
router.post("/login", userController.loginUser);


module.exports = router;
