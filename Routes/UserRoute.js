const express = require("express");

const userRouter = express.Router();
const userController = require("../Controller/UserController");

userRouter.post("/saveUserData", userController.saveUserData);
userRouter.get('/getAllUser', userController.getUserData);

module.exports = userRouter;
