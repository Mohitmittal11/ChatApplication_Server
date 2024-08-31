const MessageModel = require("../Schemas/messageSchema");
const joi = require("joi");

const joiMessageValidation = joi.object({
  Date: joi.string().required().messages({
    "any.required": "Date is Required",
    "string.base": "Date should be type of text",
    "string.empty": "Date should not be an empty field",
  }),
  messageinfo: joi.object().keys({
    from: joi.string().required().messages({
      "any.required": "User Name is Required",
      "string.base": "User Name should be type of text",
      "string.empty": "User Name should not be an empty field",
    }),
    message: joi.string().required().messages({
      "any.required": "Message is Required",
      "string.base": "Message should be type of text",
      "string.empty": "Message should not be an empty field",
    }),
    room_id: joi.string().required().messages({
      "any.required": "Room_Id is Required",
      "string.base": "Room_Id should be type of text",
      "string.empty": "Room_Id should not be an empty field",
    }),
    microTime: joi.number().required().messages({
      "any.required": "Microtime is Required",
    }),
    time: joi.string().required().messages({
      "any.required": "Time is Required",
      "string.base": "Time should be type of text",
      "string.empty": "Time should not be an empty field",
    }),
    date: joi.string().required().messages({
      "any.required": "Date is Required",
      "string.base": "Date should be a type of text",
      "string.empty": "Date Should not be an empty field",
    }),
  }),
});
module.exports = joiMessageValidation;
