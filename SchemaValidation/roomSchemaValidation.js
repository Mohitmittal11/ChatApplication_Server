const groupModel = require("../Schemas/groupSchema");
const joi = require("joi");
const joiGroupValidation = joi.object().keys({
  group_name: joi.string().required().messages({
    "any.required": "Group name is Required",
    "string.base": "Group Name should be type of text",
    "string.empty": "Group name can not be an empty field",
  }),
  users: joi.array().items(joi.string()).required().messages({
    "any.required": "User Name is Required ",
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

module.exports = joiGroupValidation;
