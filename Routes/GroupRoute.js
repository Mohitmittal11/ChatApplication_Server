const express = require("express");
const groupRouter = express.Router();
const groupController = require("../Controller/GroupController");
const validator = require("../ValidatorMiddleware/validatormiddleware");

groupRouter.post(
  "/savegroupdata",
  validator("joiGroupValidation"),
  groupController.saveGroupData
);
groupRouter.get("/getGroupName", groupController.getGroupData);
module.exports = groupRouter;
