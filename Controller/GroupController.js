const groupModel = require("../Schemas/groupSchema");
const { message } = require("../SchemaValidation/roomSchemaValidation");

exports.saveGroupData = async (req, res) => {
  const requestBody = await req.body;
  console.log("Request Body is ", requestBody);
  try {
    const result = await groupModel.find({
      group_name: requestBody.group_name,
    });
    if (result.length > 0) {
      res.json({
        statusCode: 409,
        message: "Group Name is Matched",
        data: result,
      });
    } else {
      const response = await groupModel.create(requestBody);
      if (response) {
        res.json({
          statusCode: 200,
          message: "Data Submited successfully",
          data: response,
        });
      }
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};

exports.getGroupData = async (req, res) => {
  const username = await req.query.username;
  const result = await groupModel.find({ users: { $in: username } });
  if (result.length > 0) {
    res.json({
      statusCode: 200,
      message: "Data found Successfully",
      data: result,
    });
  } else {
    res.json({
      statusCode: 409,
      message: "User is not Exist in any Group",
      data: result,
    });
  }
};
