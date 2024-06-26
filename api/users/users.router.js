const { checkToken } = require("../../validation/token_validation");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  Login,
} = require("../users/users.controller");
const router = require("express").Router();

router.get("/get-all-users", checkToken, getAllUsers);
router.get("/get-users/:id", checkToken, getUserById);
router.post("/create-users", checkToken, createUser);
router.patch("/update-users", checkToken, updateUser);
router.delete("/delete-users/:id", checkToken, deleteUserById);
router.post("/login", Login);

module.exports = router;
