const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title required"],
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    status: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
