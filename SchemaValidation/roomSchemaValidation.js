const roomModel = require("../Schemas/room");
const joi = require("joi");
const joiRoomValidataion = joi.object({
  username: joi.string().required().messages({
    "any.required": "User Name is Required ",
    "string.base": "User Name should be type of text",
    "string.empty": "User Name can not be an Empty Field",
  }),
  room_name: joi
    .string()
    .required()
    .valid(
      "Web Technology",
      "Aritificial Intelligence",
      "Cloud Computing",
      "Robotics"
    )
    .messages({
      "any.required": "Room name is Required",
      "string.base": "Room Name should be type of text",
      "string.empty": "Room name can not be an empty field",
    }),
  microtime: joi.number().required().messages({
    "any.required": "Microtime is Required",
  }),
  time: joi.string().required().messages({
    "any.required": "Time is Required",
    "string.base": "Time should be type of text",
    "string.empty": "Time can not be an empty field",
  }),
  date: joi.string().required().messages({
    "any.required": "Date is Required",
    "string.base": "Date should be a type of text",
    "string.empty": "Date Should not be an empty field",
  }),
});

module.exports = joiRoomValidataion;
