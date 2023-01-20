const express = require("express");
const { authenticate, authorize } = require("../middlewares/authentication");
const {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  deleteAllTasks,
} = require("../controllers/task.controller");
const router = express.Router();

router
  .route("/")
  .get([authenticate], getUserTasks)
  .post([authenticate], createTask);
router
  .route("/:id")
  .patch([authenticate], updateTask)
  .delete([authenticate], deleteTask);
router
  .route("/admin")
  .get([authenticate, authorize("admin")], getAllTasks)
  .delete([authenticate, authorize("admin")], deleteAllTasks);

module.exports = router;
