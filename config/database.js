const { createPool } = require("mysql2");

const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "matrix",
  connectionLimit: 10,
});
module.exports = pool;
