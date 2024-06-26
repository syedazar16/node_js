const pool = require("../../config/database");

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query(`select * from users`, [], (err, results, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from users where id=?`,
        [id],
        (err, results, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        }
      );
    });
  },
};
