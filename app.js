const express = require("express");
const app = express();
const userRouter = require("../node_js/api/users/users.router");
const AppError = require("./utils/appError");

app.use(express.json());
app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(`The Requested URL ${req.path} is not found`, 404);
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: 0,
    message: err.message,
    stack: err.stack,
  });
});

app.get("/api", (req, res) => {
  return res.status(200).json({
    success: 1,
    message: "testing progress",
  });
});

app.listen(3000, () => {
  console.log("Port running on 3000");
});

// new set up
