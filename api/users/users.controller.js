const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const AppError = require("../../utils/appError");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmailId,
} = require("../users/users.service");
const { sign } = require("jsonwebtoken");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const result = await getAllUsers();
      if (!result.length) {
        return res.status(200).json({
          success: 1,
          message: "Record Not Found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getUserById(id);
      if (!result.length) {
        throw new AppError("Record not found", 404);
      }
      return res.status(200).json({
        success: 1,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const body = req.body;
      // console.log(req.body);
      // console.log(body);
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const result = await createUser(body);
      if (!result.affectedRows) {
        throw new AppError("Failed to insert", 401);
      }
      return res.status(200).json({
        success: 1,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const body = req.body;
      // console.log(req.body);
      // console.log(body);
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const result = await updateUser(body);
      if (!result.affectedRows) {
        throw new AppError("Failed to insert", 401);
      }
      return res.status(200).json({
        success: 1,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await deleteUser(id);
      if (!result.affectedRows) {
        throw new AppError("Record not found", 404);
      }
      return res.status(200).json({
        success: 1,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  },
  Login: async (req, res, next) => {
    try {
      const body = req.body;
      const data = await getUserByEmailId(body.email);
      // console.log(data);
      // console.log(data.length);
      // console.log(!data.length);
      if (data.length) {
        const result = compareSync(body.password, data[0].password);
        if (result) {
          data.password = undefined;
          const token = sign({ result: data }, "matrix123", {
            expiresIn: "1h",
          });
          return res.status(200).json({
            success: 1,
            message: "Logged In Successfully",
            token: token,
          });
        } else {
          return res.status(400).json({
            success: 0,
            message: "Invalid email or password",
          });
        }
      } else {
        return res.status(400).json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
