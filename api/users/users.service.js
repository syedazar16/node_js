const AppError = require("../../utils/appError");
const { getAllUsers, getUserById } = require("../users/users.controller");

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
};
