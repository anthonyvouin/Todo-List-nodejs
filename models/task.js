const mongoose = require("mongoose");
const db = require("../config/mongoose");
const TaskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = db.model("Task", TaskSchema);
module.exports = Task;
