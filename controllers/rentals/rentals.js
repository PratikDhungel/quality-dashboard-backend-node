const ErrorResponse = require('../../utils/errorResponse');
const { addNewRentalToDB, getAllRentalsFromDB } = require('../../services/rentals/rentalServices');

exports.addNewRental = async (req, res, next) => {
  try {
    await addNewRentalToDB(req.body);
    return res.status(200).json({ success: true, message: 'New rental added' });
  } catch (err) {
    next(err);
  }
};

exports.getAllRentals = async (req, res, next) => {
  try {
    const listOfRentals = await getAllRentalsFromDB();
    return res.status(200).json({ success: true, data: listOfRentals });
  } catch (err) {
    next(err);
  }
};
