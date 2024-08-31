const singlechatModel = require("../Schemas/singleChatSchema");
const userModel = require("../Schemas/Users");
const moment = require("moment");

// exports.saveSingleChatMessage = async (req, res) => {
//   const requestBody = await req.body;
//   console.log("Request body", requestBody);
//   try {
//     const lastDate = await singlechatModel.find({ _date: requestBody?._date });

//     if (lastDate.length > 0) {
//       const response = await singlechatModel.updateOne(
//         { _date: requestBody?._date },
//         { $push: { messageinfo: requestBody.messageinfo } }
//       );

//       if (response) {
//         res.json({
//           statusCode: 200,
//           message: "Data Updated Successfully",
//           data: response,
//         });
//       }
//     } else {
//       const result = await singlechatModel.create(requestBody);

//       if (result && result !== undefined && result !== null) {
//         res.json({
//           statusCode: 200,
//           message: "Data Submited successfully",
//           data: result,
//         });
//       }
//     }
//   } catch (err) {
//     res.json({ errorMessage: err });
//   }
// };

exports.getSingleChatData = async (req, res) => {
  const user_name = await req?.query?.username;
  const sessionId = await req?.query?.sessionId;

  try {
    const timeStamp = (
      await userModel.find({
        username: user_name,
      })
    ).map((value) => value.microtime);
    const time1 = timeStamp[0];

    const response = await singlechatModel
      .aggregate([
        // Unwind the messageinfo array
        { $unwind: "$messageinfo" },
        // Match documents with the desired room_id
        {
          $match: {
            "messageinfo.session_id": sessionId,
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
      res.json({ message: "No Data Found", data: response });
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};
