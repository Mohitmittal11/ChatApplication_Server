const express = require("express");
const roomTypeRouter = express.Router();
const room_type_controller = require("../Controller/room_type_controller");

roomTypeRouter.get("/getroomOption", room_type_controller.getRoomdata);

// app.post("/submitroomData", async (req, res) => {
//   const data = await req?.body;
//   console.log("data submitted is", data);
//   const result = await roomTypeModel.create(data);
//   if (result) {
//     res.json({
//       statusCode: 200,
//       message: "Data submitted succesfully",
//       data: result,
//     });
//   } else {
//     res.json({ message: "No Data Insert", data: result });
//   }
// });

module.exports = roomTypeRouter;
