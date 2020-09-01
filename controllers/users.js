const ErrorResponse = require('../utils/errorResponse');
const {
  checkExistingUserByEmail,
  addNewUserToDB,
  getAllUsersInDB,
} = require('../domains/users');
const {
  validateUserEmail,
  validateUserPassword,
} = require('../utils/validator');

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/login
// @Access:     Public
exports.login = (req, res, next) => {
  // res.status(200).json({status: true, message: 'Login as a User'});
};

// @Desc:       Add a new User
// @Route:      POST /api/v1/user/addUser
// @Access:     Private
exports.addUser = async (req, res, next) => {
  //   console.log(validateUserEmail(req.body.email));

  //   console.log(isUserEmailValid);
  //   if (!isUserEmailValid) {
  // next(new ErrorResponse(`Invalid Email`, 400));
  //   }

  try {
    const isUserEmailValid = await validateUserEmail(req.body.email);
    const isUserPasswordValid = await validateUserPassword(req.body.password);

    // Check if the Email is already registered and send 400 response if true
    const queryResults = await checkExistingUserByEmail(req.body.email);
    if (isUserEmailValid && isUserPasswordValid && queryResults.length !== 0) {
      next(
        new ErrorResponse(
          `User with the email ${req.body.email} is already registered`,
          400
        )
      );
    } else {
      try {
        // Add new User to DB
        await addNewUserToDB(req);
        res.status(200).json({ status: 'New user created' });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

// @Desc:       Get list of all Users
// @Route:      POST /api/v1/user/getUsers
// @Access:     Public
exports.getAllUsers = async (req, res, next) => {
  try {
    // Get the details of all users
    let queryResults = await getAllUsersInDB();
    queryResults.forEach((element) => {
      element.employmentStatus = 'gg';
    });
    res.status(200).json(queryResults);
  } catch (err) {
    next(err);
  }
};

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/getUsers/:id
// @Access:     Public
exports.getSingleUser = (req, res, next) => {
  res
    .status(200)
    .json({ status: true, message: `Display User ${req.params.id}` });
};
