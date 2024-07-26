const mongoose = require("mongoose");
const connectedDatabase = mongoose
  .connect(
    `mongodb+srv://mittalm904:${process.env.MongodbPass}@cluster0.fywsi2e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Database connection is Establishedd"))
  .catch((err) =>
    console.log("Error is occured during database establishment ", err)
  );

module.exports = connectedDatabase;
