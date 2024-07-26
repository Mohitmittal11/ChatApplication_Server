const mongoose = require("mongoose");

const RoomtypeSchema = new mongoose.Schema(
  {
    room_name_type: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("RoomType", RoomtypeSchema);
