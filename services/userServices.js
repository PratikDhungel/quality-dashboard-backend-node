const sqlConnection = require('../config/db');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');
const salt = bcrypt.genSaltSync(10);
const { getFormattedUTCTime } = require('../utils/dateTime');

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
    let currentTimeStamp = getFormattedUTCTime();
    let query = `INSERT INTO users (email, first_name, last_name, password, primary_phone_number, secondary_phone_number, street_address, city, state, zip_code, date_of_birth, gender, user_role, status, registered_on, last_activity, is_deleted)
        VALUES ('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${hashPassword}', '${req.body.primary_phone_number}', '${req.body.secondary_phone_number}', '${req.body.street_address}', '${req.body.city}', '${req.body.state}', ${req.body.zip_code}, '${req.body.date_of_birth}', '${req.body.gender}', '${req.body.user_role}', 'registered', '${currentTimeStamp}', '${currentTimeStamp}', false);`;
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
      'SELECT id, email, first_name, last_name, primary_phone_number, secondary_phone_number, street_address, city, state, zip_code, date_of_birth, gender, user_role, status FROM users WHERE is_deleted = 0';
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
    let query = `SELECT id, email, first_name, last_name, user_role FROM users WHERE id = ${userID}`;
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results[0]);
      }
      reject(err);
    });
  });
};
