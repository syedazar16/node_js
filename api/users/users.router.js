const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
} = require("../users/users.controller");
const router = require("express").Router();

router.get("/get-all-users", getAllUsers);
router.get("/get-users/:id", getUserById);
router.post("/create-users", createUser);
router.patch("/update-users", updateUser);

module.exports = router;
