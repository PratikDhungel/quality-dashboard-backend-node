const express = require('express');
const router = express.Router();

const {login, getAllUsers, getSingleUser } = require('../controllers/users');

router.route('/login').post(login);
router.route('/getUsers').get(getAllUsers);
router.route('/getUsers/:id').get(getSingleUser);

module.exports = router;