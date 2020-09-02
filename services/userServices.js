const sqlConnection = require('../config/db');

exports.checkExistingUserByEmail = (userEmail) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT email FROM users WHERE email = '${userEmail}';`;
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

exports.addNewUserToDB = (req) => {
  // Encrypt user password
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO users (email, first_name, last_name, phone_number, street_name, city, district, province, is_admin, is_verified, verified_on, account_status, last_activity, is_deleted)
        VALUES ('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.phone_number}', '${req.body.street_name}', '${req.body.city}', '${req.body.district}', '${req.body.province}', ${req.body.is_admin}, ${req.body.is_verified}, '${req.body.verified_on}', '${req.body.account_status}', '${req.body.last_activity}', ${req.body.is_deleted});`;
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

exports.getAllUsersInDB = () => {
  return new Promise((resolve, reject) => {
    let query =
      'SELECT id, email, first_name, last_name, phone_number, street_name, city, district, province, is_admin, is_verified, verified_on, account_status, last_activity, is_deleted FROM users';
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
