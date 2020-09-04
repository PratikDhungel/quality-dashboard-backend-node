const sqlConnection = require('../config/db');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');
const salt = bcrypt.genSaltSync(10);

exports.validatePasswordForGivenEmail = (userEmail, userPassword) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT id, password FROM users WHERE email = '${userEmail}';`;
    sqlConnection.query(query, (err, results, fields) => {
      let passwordFromQuery = results[0].password;
      let userID = results[0].id;
      if (bcrypt.compareSync(userPassword, passwordFromQuery)) {
        resolve({ status: true, userID: userID });
      } else {
        reject(new ErrorResponse('Incorrect Password', 401));
      }
    });
  });
};

exports.loginUser = (userEmail, userPassword) => {
  return new Promise((resolve, reject) => {});
};

exports.returnUsersWithGivenEmail = (userEmail) => {
  console.log(`Inside returnUsersWithGivenEmail`.blue);
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

exports.addNewUser = (req) => {
  // Encrypt user password
  let userPassword = req.body.password;
  var hashPassword = bcrypt.hashSync(userPassword, salt);

  return new Promise((resolve, reject) => {
    let query = `INSERT INTO users (email, first_name, last_name, phone_number, street_name, city, district, province, is_admin, is_verified, verified_on, account_status, last_activity, is_deleted, password)
        VALUES ('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.phone_number}', '${req.body.street_name}', '${req.body.city}', '${req.body.district}', '${req.body.province}', ${req.body.is_admin}, ${req.body.is_verified}, '${req.body.verified_on}', '${req.body.account_status}', '${req.body.last_activity}', ${req.body.is_deleted}, '${hashPassword}');`;
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

exports.getListOfAllUsers = () => {
  return new Promise((resolve, reject) => {
    let query =
      'SELECT id, email, first_name, last_name, phone_number, street_name, city, district, province, is_admin, is_verified, verified_on, account_status, last_activity, is_deleted FROM users WHERE is_deleted = 0';
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results);
        // return results;
      } else {
        reject(err);
        // return err;
      }
    });
  });
};

exports.returnSingleUserInfo = (userID) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT id, email, first_name, last_name FROM users WHERE id = ${userID}`;
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results[0]);
      }
      reject(err);
    });
  });
};
