const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    default: 1,
  },
  is_finished: {
    type: Boolean,
    default: false,
  },
  is_cancelled: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("TodoTask", todoTaskSchema);
