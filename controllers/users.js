const sqlConnection = require('../config/db');
const { bold } = require('colors');
// @Desc:       Login as a User
// @Route:      POST /api/v1/user/login
// @Access:     Public
exports.login = (req, res, next) => {
  // res.status(200).json({status: true, message: 'Login as a User'});
};

// @Desc:       Add a new User
// @Route:      POST /api/v1/user/addUser
// @Access:     Private
exports.addUser = (req, res, next) => {
  function checkExistingUser() {
    return new Promise((resolve, reject) => {
      let query = `SELECT email from USERS WHERE email = '${req.body.email}';`;
      sqlConnection.query(query, (err, results, fields) => {
        if (!err) {
          resolve(results);
        } else {
          reject(new Error(err));
        }
      });
    });
  }

  function addUserToDB() {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO users (email, first_name, last_name, phone_number, street_name, city, district, province, is_admin, is_verified, verified_on, account_status, last_activity, is_deleted)
        VALUES ('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.phone_number}', '${req.body.street_name}', '${req.body.city}', '${req.body.district}', '${req.body.province}', ${req.body.is_admin}, ${req.body.is_verified}, '${req.body.verified_on}', '${req.body.account_status}', '${req.body.last_activity}', ${req.body.is_deleted});`;
      sqlConnection.query(query, (err, results, fields) => {
        console.log(`After insert query`.green.bold);
        if (!err) {
          resolve(results);
        } else {
          reject(new Error(err));
        }
      });
    });
  }

  async function returnExistingUserCheck() {
    try {
      const queryResults = await checkExistingUser();
      if (queryResults.length !== 0) {
        res
          .status(400)
          .json({ message: `User with this email is already registered.` });
      } else {
        try {
          const queryResults = await addUserToDB();
          res
            .status(200)
            .json({ status: 'New user created', message: queryResults });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  returnExistingUserCheck();
};

// @Desc:       Get list of all Users
// @Route:      POST /api/v1/user/getUsers
// @Access:     Public
exports.getAllUsers = (req, res, next) => {
  function getResults() {
    return new Promise((resolve, reject) => {
      let query =
        'SELECT id, email, first_name, last_name, phone_number, street_name, city, district, province, is_admin, is_verified, verified_on, account_status, last_activity, is_deleted FROM users';
      sqlConnection.query(query, (err, results, fields) => {
        if (!err) {
          resolve(results);
        } else {
          reject(new Error(err));
        }
      });
    });
  }

  async function returnListOfUser() {
    try {
      const queryResults = await getResults();
      res.status(200).json(queryResults);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  returnListOfUser();
};

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/getUsers/:id
// @Access:     Public
exports.getSingleUser = (req, res, next) => {
  res
    .status(200)
    .json({ status: true, message: `Display User ${req.params.id}` });
};
