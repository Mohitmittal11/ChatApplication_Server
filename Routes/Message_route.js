const express = require("express");
const router = express.Router();
const messagecontroller = require("../Controller/MessageController");
const validator = require("../ValidatorMiddleware/validatormiddleware");

router.post("/saveMessageData", messagecontroller.saveMessagedata);

router.get("/getUserData", messagecontroller.getMessage);

module.exports = router;
