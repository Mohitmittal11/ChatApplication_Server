const express = require("express");
const roomrouter = express.Router();
const roomcontroller = require("../Controller/room_controller");

roomrouter.post(
  "/saveroomdata",
  roomcontroller.saveRoomdata
);

roomrouter.get(
  `/getUserAccordingtoRoom/:roomname`,
  roomcontroller.getUserfromRoom
);
module.exports = roomrouter;
