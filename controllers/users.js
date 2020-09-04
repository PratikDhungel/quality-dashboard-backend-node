const ErrorResponse = require('../utils/errorResponse');
const {
  validatePasswordForGivenEmail,
  loginUser,
  returnUsersWithGivenEmail,
  addNewUser,
  getListOfAllUsers,
  returnSingleUserInfo,
} = require('../services/userServices');
const {
  validateEmailFormat,
  validatePasswordLength,
} = require('../utils/validator');
const {
  generateJsonWebToken,
  generateCookieOptions,
} = require('../utils/auth');

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/login
// @Access:     Public
exports.login = async (req, res, next) => {
  // Check if Email and Password are provided in the request body
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Email and Password are required' });
  }

  // Return error if email is not valid
  if (!validateEmailFormat(req.body.email)) {
    return next(new ErrorResponse('Invalid User Email', 400));
  }

  try {
    // Check if user with the email exists
    const listOfUsersWithEmail = await returnUsersWithGivenEmail(
      req.body.email
    );
    let isEmailExisting = listOfUsersWithEmail.length > 0 ? true : false;

    if (!isEmailExisting) {
      return next(
        new ErrorResponse(
          `User with the email ${req.body.email} does not exist`,
          401
        )
      );
    }

    const passwordMatchResult = await validatePasswordForGivenEmail(
      req.body.email,
      req.body.password
    );

    if (passwordMatchResult.status === true) {
      console.log(`Logging in the user`.blue);
      let singleUserInfo = await returnSingleUserInfo(
        passwordMatchResult.userID
      );
      let jwtToken = generateJsonWebToken(passwordMatchResult.userID);
      let cookieOptions = generateCookieOptions();

      singleUserInfo.token = jwtToken;
      return res
        .status(200)
        .cookie('token', jwtToken, cookieOptions)
        .json(singleUserInfo);
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
    const isUserEmailValid = validateEmailFormat(req.body.email);
    const isUserPasswordValid = validatePasswordLength(req.body.password);

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
      return res
        .status(200)
        .json({ success: true, message: 'New user created' });
    }
  } catch (err) {
    next(err);
  }
};

// @Desc:       Get list of all Users
// @Route:      POST /api/v1/user/getUsers
// @Access:     Public
exports.getAllUsers = async (req, res, next) => {
  // exports.getAllUsers = (req, res, next) => {
  try {
    // Get the details of all users
    let listOfUsers = await getListOfAllUsers();
    listOfUsers.forEach((element) => {
      element.employmentStatus = 'On a break';
    });
    return res.status(200).json(listOfUsers);
  } catch (err) {
    next(err);
  }
};

// @Desc:       Login as a User
// @Route:      POST /api/v1/user/getUsers/:id
// @Access:     Public
exports.getSingleUser = (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, message: `Display User ${req.params.id}` });
};
