const { getAllUsers, getUserById } = require("../users/users.service");
const router = require("express").Router();

router.get("/get-all-users", getAllUsers);
router.get("/get-users/:id", getUserById);

module.exports = router;
