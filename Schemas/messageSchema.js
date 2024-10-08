const mongoose = require("mongoose");
const { type } = require("../SchemaValidation/roomSchemaValidation");
const messageSchema = new mongoose.Schema(
  {
    _date: {
      type: String,
    },
    messageinfo: [
      {
        from: {
          type: String,
        },
        message: {
          type: String,
        },
        group_name: {
          type: String,
        },
        group_id: {
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

module.exports = mongoose.model("message", messageSchema);
