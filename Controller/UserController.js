const userModel = require("../Schemas/Users");

exports.saveUserData = async (req, res) => {
  try {
    let receivedData = await req.body;

    console.log("Received Data is ", receivedData);

    const isChecked = await userModel.find({
      room_name: receivedData?.room_name,
      username: receivedData?.username,
    });

    if (isChecked.length > 0) {
      res.json({ statusCode: 409, message: "User is Registered already" });
    } else {
      const result = await userModel.create(receivedData);
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

exports.getUserData = async (req, res) => {
  try {
    const result = await userModel.find();
    if (result.length > 0) {
      res.json({
        statusCode: 200,
        message: "Data found seccessfully",
        data: result,
      });
    } else {
      res.json({ statusCode: 409, message: "No Data Found", data: result });
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};
