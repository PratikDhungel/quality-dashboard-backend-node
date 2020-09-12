const express = require('express');
const router = express.Router();

const {
  login,
  addUser,
  getAllUsers,
  getSingleUser,
} = require('../controllers/users');

const { protect, authorize } = require('../middleware/auth');

router.route('/login').post(login);
router.route('/addUser').post(protect, authorize('admin'), addUser);
router.route('/getUsers').get(protect, authorize('admin'), getAllUsers);
router.route('/getUsers/:id').get(protect, getSingleUser);

module.exports = router;
