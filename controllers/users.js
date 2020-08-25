const sqlConnection = require('../config/db');
// @Desc:       Login as a User
// @Route:      POST /api/v1/user/login
// @Access:     Public
exports.login = (req, res, next) => {
    // res.status(200).json({status: true, message: 'Login as a User'});
    sqlConnection.query('SELECT * FROM users', (err, results, fields) =>{
        if(!err){
            res.status(200).json(results)
        }
    });
}

// @Desc:       Get list of all Users
// @Route:      POST /api/v1/user/getUsers
// @Access:     Public
exports.getAllUsers = (req, res, next) =>{
    res.status(200).json({status: true, message: 'Get all Users'});
}

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/getUsers/:id
// @Access:     Public
exports.getSingleUser = (req, res, next) => {
    res.status(200).json({status: true, message: `Display User ${req.params.id}`});
}