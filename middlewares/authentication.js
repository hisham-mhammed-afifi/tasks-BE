const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  let bearer = req.header("Authorization");

  try {
    bearer = bearer.split(" ");
    if (bearer[0] !== "Bearer") {
      throw Error();
    }
    const token = bearer[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    return next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
