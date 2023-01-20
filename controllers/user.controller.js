const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExist = await User.findOne({ email });

  if (alreadyExist) {
    throw new BadRequestError("email already exist");
  }

  const user = await User.create({ name, email, password });

  res.status(201).json(true);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Plz provide email & password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const passwordCorrect = await user.comparePassword(password);

  if (!passwordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const { name, _id } = user;

  const accessToken = jwt.sign({ name, _id }, process.env.JWT_SECRET);

  res.status(200).json({ accessToken });
};

module.exports = { register, login };
