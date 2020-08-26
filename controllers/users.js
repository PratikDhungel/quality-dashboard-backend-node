const sqlConnection = require('../config/db');
// @Desc:       Login as a User
// @Route:      POST /api/v1/user/login
// @Access:     Public
exports.login = (req, res, next) => {
    // res.status(200).json({status: true, message: 'Login as a User'});
}

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/addUser
// @Access:     Private
exports.addUser = (req, res, next) => {

    let requestBody = req.body;
    console.log(requestBody);
    res.status(200).json({message: 'Received JSON body'})
    // sqlConnection
}

// @Desc:       Get list of all Users
// @Route:      POST /api/v1/user/getUsers
// @Access:     Public
exports.getAllUsers = (req, res, next) =>{
    let query = 'SELECT id, email, first_name, last_name, phone_number, street_name, city, district, province, is_admin, is_verified, verified_on, account_status, last_activity, is_deleted FROM users'
    sqlConnection.query(query, async (err, results, fields) =>{
        if(!err){
            await res.status(200).json(results);
        }
    });

    // console.log(sqlConnection.query(query, (err, results, fields) => {

    // }))
}

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/getUsers/:id
// @Access:     Public
exports.getSingleUser = (req, res, next) => {
    res.status(200).json({status: true, message: `Display User ${req.params.id}`});
}