const sqlConnection = require('../../config/db');
const ErrorResponse = require('../../utils/errorResponse');
const { getFormattedUTCTime } = require('../../utils/dateTime');

exports.addNewRentalToDB = async (requestBody) => {
  const { manufacturer, modelName, year, distance, vehicleImage1, vehicleImage2 } = requestBody;
  return new Promise((resolve, reject) => {
    let currentTimeStamp = getFormattedUTCTime();
    const newRentalStatus = 'not-rented';
    let query = `INSERT INTO rentals ( manufacturer, model_name, year, distance, vehicle_image_1, vehicle_image_2, status, updated_on, is_deleted)
        VALUES ('${manufacturer}', '${modelName}', '${year}', '${distance}', '${vehicleImage1}', '${vehicleImage2}', '${newRentalStatus}', '${currentTimeStamp}', false);`;
    sqlConnection.query(query, (err, results, fields) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

exports.getAllRentalsFromDB = async () => {
  return new Promise((resolve, reject) => {
    let dbQuery = `SELECT id, manufacturer, model_name AS modelName, year, distance, vehicle_image_1 AS vehicleImage1, vehicle_image_2 AS vehicleImage2, status, updated_on as updatedOn FROM rentals WHERE status='not-rented' AND is_deleted=false ORDER BY updated_on desc`;
    sqlConnection.query(dbQuery, (err, results, fields) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
