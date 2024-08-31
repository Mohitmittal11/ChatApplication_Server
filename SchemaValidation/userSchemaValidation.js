const joi = require("joi");
const userModel = require("../Routes/UserRoute");
const Joi = require("joi");

const joiUserValidation = new Joi.object({
  username: joi.string().required().message({
    "any.required": "User Name is Required ",
    "string.base": "User Name should be of type String",
    "string.empty": "User Name can not be an empty field",
  }),
  date: joi.string().message({
    "any.required": "User Name is Required ",
    "string.base": "User Name should be of type String",
    "string.empty": "User Name can not be an empty field",
  }),
  microtime: joi.number().message({
    "any.required":"Micro time is Required field",
    
  })
});
