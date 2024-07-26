const roomModel = require("../Schemas/room");
const roomTypeModel = require("../Schemas/room_type");

exports.getSiginin = async (req, res) => {
  const bodyData = await req.body;

  try {
    const response = await roomModel.find({
      username: bodyData.user_name,
      room_name: bodyData?.room_name,
    });

    if (response.length > 0) {
      res.json({
        statusCode: 200,
        message: "Data Found Successfully",
        data: response,
      });
    } else {
      res.json({ statusCode: 409, message: "No Data Found", data: response });
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};
