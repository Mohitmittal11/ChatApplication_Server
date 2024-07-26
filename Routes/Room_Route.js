const express = require("express");
const roomrouter = express.Router();
const roomcontroller = require("../Controller/room_controller");
const validator = require("../ValidatorMiddleware/validatormiddleware");

roomrouter.post(
  "/saveroomdata",
  validator("roomJoiValidation"),
  roomcontroller.saveRoomdata
);

roomrouter.get(
  `/getUserAccordingtoRoom/:roomname`,
  roomcontroller.getUserfromRoom
);
module.exports = roomrouter;
