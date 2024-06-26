const { verify, decode } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    var token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "matrix123", (err, decode) => {
        if (err) {
          return res.status(400).json({
            success: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: "Access Denied",
      });
    }
  },
};
