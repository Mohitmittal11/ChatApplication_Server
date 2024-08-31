const mongoose = require("mongoose");
const { type } = require("../SchemaValidation/roomSchemaValidation");
const SingleChatSchema = new mongoose.Schema(
  {
    _date: {
      type: String,
    },
    messageinfo: [
      {
        from: {
          type: String,
        },
        to: {
          type: String,
        },
        message: {
          type: String,
        },
        session_id: {
          type: String,
        },
        _date: {
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

module.exports = mongoose.model("singlechatmessage", SingleChatSchema);
