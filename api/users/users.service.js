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
  createUser: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into users(id, first_name, last_name, email, password, phone_no) values(?,?,?,?,?,?) `,
        [
          data.id,
          data.first_name,
          data.last_name,
          data.email,
          data.password,
          data.phone_no,
        ],
        (err, results, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        }
      );
    });
  },
  updateUser: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update users set first_name=?, last_name=?, email=?, password=?, phone_no=? where id=? `,
        [
          data.first_name,
          data.last_name,
          data.email,
          data.password,
          data.phone_no,
          data.id,
        ],
        (err, results, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `delete from users where id=?`,
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
  getUserByEmailId: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from users where email=?`,
        [email],
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
