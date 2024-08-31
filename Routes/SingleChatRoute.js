const express = require("express");
const singleChatRouter = express.Router();
const singleChatController = require("../Controller/SingleChatcontroller");

// singleChatRouter.post(
//   "/savesinglechatData",
//   singleChatController.saveSingleChatMessage
// );

singleChatRouter.get("/getSingleChat", singleChatController.getSingleChatData);

module.exports = singleChatRouter;
