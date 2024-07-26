const roomTypeModel = require("../Schemas/room_type");

exports.getRoomdata = async (req, res) => {
  const result = await roomTypeModel.find({ isDelete: false });
  if (result.length > 0) {
    res.json({
      statusCode: 200,
      message: "Data found Successfully",
      data: result,
    });
  } else {
    res.json({ message: "No Data Found", data: result });
  }
};
