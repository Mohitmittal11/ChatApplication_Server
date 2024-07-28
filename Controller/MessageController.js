const messageModel = require("../Schemas/messageSchema");
const roomModel = require("../Schemas/room");
const moment = require("moment");

exports.saveMessagedata = async (req, res) => {
  const requestBody = await req.body;
  console.log("Request body", requestBody);
  try {
    const lastDate = await messageModel.find({ _date: requestBody?._date });
    console.log("Last Date is ", lastDate);

    if (lastDate.length > 0) {
      const response = await messageModel.updateOne(
        { _date: requestBody?._date },
        { $push: { messageinfo: requestBody.messageinfo } }
      );

      if (response) {
        res.json({ statusCode: 200, data: response });
      }
    } else {
      const result = await messageModel.create(requestBody);

      console.log("Result is ", result);
      if (result && result !== undefined && result !== null) {
        res.json({
          statusCode: 200,
          message: "Data Submited successfully",
          data: result,
        });
      }
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};

exports.getMessage = async (req, res) => {
  const user_name = await req?.query?.username;
  const roomid = await req?.query?.roomid;

  console.log(`user name is ${user_name} and room id is ${roomid}`);
  try {
    const timeStamp = (await roomModel.find({ username: user_name })).map(
      (value) => value.microtime
    );
    const time1 = timeStamp[0];

    console.log("gjhbnm.,", time1);

    const response = await messageModel
      .aggregate([
        // Unwind the messageinfo array
        { $unwind: "$messageinfo" },
        // Match documents with the desired room_id
        {
          $match: {
            "messageinfo.room_id": roomid,
            "messageinfo.microTime": { $gte: time1 },
          },
        },
        // Group by the root document id and rebuild the messageinfo array
        {
          $group: {
            _id: "$_id",
            _date: { $first: "$_date" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            messageinfo: { $push: "$messageinfo" },
          },
        },
      ])
      .sort({ createdAt: 1 });
    if (response.length > 0) {
      res.json({
        statusCode: 200,
        message: "Data Found successfully",
        data: response,
      });
    } else {
      res.json({ message: "No Data Found" });
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};
