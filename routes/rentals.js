const express = require('express');
const router = express.Router();

const { addNewRental, getAllRentals } = require('../controllers/rentals/rentals');

router.route('/addNewRental').post(addNewRental);
router.route('/getAllRentals').get(getAllRentals);

module.exports = router;
