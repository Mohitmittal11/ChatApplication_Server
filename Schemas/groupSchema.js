const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  group_name: {
    type: String,
  },
  users: [
    {
      type: String,
    },
  ],
  time: {
    type: String,
  },
  microtime: {
    type: Number,
  },
  date: {
    type: String,
  },
  isDelete: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("Group", GroupSchema);
