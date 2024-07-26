const mongoose = require("mongoose");
const { type } = require("../SchemaValidation/roomSchemaValidation");
const messageSchema = new mongoose.Schema(
  {
    _date: {
      type: String,
    },
    messageinfo: [
      {
        username: {
          type: String,
        },
        message: {
          type: String,
        },
        room_id: {
          type: String,
        },
        date: {
          type: String,
        },
        time: {
          type: String,
        },
        microTime: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
