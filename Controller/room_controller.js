const roomModel = require("../Schemas/room");
const roomTypeModel = require("../Schemas/room_type");

exports.saveRoomdata = async (req, res) => {
  try {
    let receivedData = await req.body;

    const matchedRoomdata = await roomTypeModel.findOne({
      room_name_type: receivedData?.room_name,
    });
    if (matchedRoomdata) {
      receivedData = { ...receivedData, room_id: matchedRoomdata._id };
    }

    const isChecked = await roomModel.find({
      room_name: receivedData?.room_name,
      username: receivedData?.username,
    });

    if (isChecked.length > 0) {
      res.json({ statusCode: 409, message: "User is Registered already" });
    } else {
      const result = await roomModel.create(receivedData);
      if (result) {
        res.json({
          statusCode: 200,
          data: result,
          message: "Data stored Successfully",
        });
      }
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};

exports.getUserfromRoom = async (req, res) => {
  const roomName = await req.params.roomname;
  try {
    const result = await roomModel.find({ room_name: roomName });
    if (result.length > 0) {
      res.json({
        statusCode: 200,
        message: "Data Found successfully",
        data: result,
      });
    } else {
      res.json({ mesage: "No Data Found" });
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};
