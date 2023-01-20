class CustomeError extends Error {
  constructor(message) {
    super(message);
  }
}

class UnauthenticatedError extends CustomeError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class UnauthorizedError extends CustomeError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class BadRequestError extends CustomeError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFoundError extends CustomeError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  CustomeError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
};
