const mongoose = require("mongoose");
const { type } = require("../SchemaValidation/roomSchemaValidation");

const RoomSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  room_name: {
    type: String,
  },
  room_id: {
    type: String,
  },
  room_type: {
    type: String,
    default: "chat",
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
});
module.exports = mongoose.model("room", RoomSchema);


