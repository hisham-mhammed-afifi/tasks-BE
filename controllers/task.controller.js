const { NotFoundError } = require("../errors");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  req.body.user = req.user.userId;
  const task = await Task.create(req.body);

  res.status(201).json({ task });
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});

  res.status(200).json({ tasks });
};

const getUserTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.userId });

  res.status(200).json({ tasks });
};

const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw new NotFoundError("Not Found");
  }

  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    throw new NotFoundError("Not Found");
  }

  await task.remove();

  res.status(200).json(true);
};

const deleteAllTasks = async (req, res) => {
  await Task.deleteMany({});

  res.status(200).json(true);
};

module.exports = {
  createTask,
  getAllTasks,
  deleteAllTasks,
  getUserTasks,
  updateTask,
  deleteTask,
};
