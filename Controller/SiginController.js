const userModel = require("../Schemas/Users");

exports.getSiginin = async (req, res) => {
  const username = await req.body.user_name;

  try {
    const response = await userModel.find({
      username: username,
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
