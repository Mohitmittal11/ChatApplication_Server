const mongoose = require("mongoose");
const { type } = require("../SchemaValidation/roomSchemaValidation");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    date: {
      type: String,
    },
    microtime: {
      type: Number,
    },
    time: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", UserSchema);
