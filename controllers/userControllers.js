import User from "../models/userModel.js";
import catchErrorAsync from "../utils/catchErrorAsync.js";
import {
  authTokenCreation,
  authTokenVerification,
} from "../utils/jwtTokenProcess.js";
import ApiErrorModel from "../utils/apiErrorModel.js";

const signUp = catchErrorAsync(async (req, res, next) => {
  const {
    firstName,
    surName,
    age,
    email,
    password,
    passwordConfirmation,
    active,
  } = req.body;

  const data = await User.create({
    firstName,
    surName,
    age,
    email,
    password,
    passwordConfirmation,
    active,
  });

  const token = authTokenCreation(data._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_EXPIRY) * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    // httpOnly: true
  });

  res.status(201).json({
    status: "Success",
    data,
    token,
  });
});

const signIn = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiErrorModel("Please provide email and password", 400));
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new ApiErrorModel("Incorrect credentials", 401));
  }

  const token = authTokenCreation(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_EXPIRY) * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    // httpOnly: true
  });

  res.status(200).json({
    status: "Success",
    token,
  });
});

const protect = catchErrorAsync(async (req, res, next) => {
  let token = "";

  if (req.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiErrorModel("Not authorized", 401));
  }

  const payload = await authTokenVerification(token);

  const userInfo = await User.findById(payload.id);
  if (!userInfo) {
    return next(new ApiErrorModel("The user does not exist", 401));
  }

  if (userInfo.invalidateTokens(payload.iat)) {
    return next(new ApiErrorModel("Login again", 401));
  }

  req.user = userInfo;

  next();
});

const restrictRoles = (...rolesList) =>
  catchErrorAsync(async (req, res, next) => {
    if (!rolesList.includes(req.user.role)) {
      return next(new ApiErrorModel("No access", 403));
    }

    next();
  });

// reset password --> email triggered (link (encrypted code))
// code --> allow an update for the password

const forgotPassword = catchErrorAsync(async (req, res, next) => {
  // req email id
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ApiErrorModel("User not present", 404));
  }

  // set a reset token // save
});

export { signUp, signIn, protect, restrictRoles };
