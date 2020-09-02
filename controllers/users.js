const ErrorResponse = require('../utils/errorResponse');
const {
  validatePasswordForGivenEmail,
  loginUser,
  returnUsersWithGivenEmail,
  addNewUser,
  getListOfAllUsers,
  returnUserInfo,
} = require('../services/userServices');
const {
  validateEmailFormat,
  validatePasswordLength,
} = require('../utils/validator');
const generateJsonWebToken = require('../utils/auth');

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/login
// @Access:     Public
exports.login = async (req, res, next) => {
  try {
    const isUserEmailValid = await validateEmailFormat(req.body.email);
    const listOfUsersWithEmail = await returnUsersWithGivenEmail(
      req.body.email
    );

    let isEmailExisting = listOfUsersWithEmail.length > 0 ? true : false;

    if (isUserEmailValid && !isEmailExisting) {
      next(
        new ErrorResponse(
          `User with the email ${req.body.email} does not exist`,
          400
        )
      );
    } else {
      const passwordMatchResult = await validatePasswordForGivenEmail(
        req.body.email,
        req.body.password
      );
      if (passwordMatchResult.status) {
        let singleUserInfo = await returnUserInfo(passwordMatchResult.userID);
        let jwtToken = generateJsonWebToken(passwordMatchResult.userID);
        singleUserInfo.token = jwtToken;
        res.status(200).json(singleUserInfo);
      }
    }
  } catch (err) {
    next(err);
  }
};

// @Desc:       Add a new User
// @Route:      POST /api/v1/user/addUser
// @Access:     Private
exports.addUser = async (req, res, next) => {
  try {
    const isUserEmailValid = await validateEmailFormat(req.body.email);
    const isUserPasswordValid = await validatePasswordLength(req.body.password);

    // Check if the Email is already registered and send 400 response if true
    const listOfUsersWithEmail = await returnUsersWithGivenEmail(
      req.body.email
    );

    let isEmailExisting = listOfUsersWithEmail.length > 0 ? true : false;

    if (isUserEmailValid && isUserPasswordValid && isEmailExisting) {
      next(
        new ErrorResponse(
          `User with the email ${req.body.email} is already registered`,
          400
        )
      );
    } else {
      await addNewUser(req);
      res.status(200).json({ success: true, message: 'New user created' });
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
    let listOfUsers = await getListOfAllUsers();
    listOfUsers.forEach((element) => {
      element.employmentStatus = 'On a break';
    });
    res.status(200).json(listOfUsers);
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
    .json({ success: true, message: `Display User ${req.params.id}` });
};
