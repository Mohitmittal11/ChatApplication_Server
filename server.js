require("dotenv").config();
require("./Mongodb_configuration/config");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
var session = require("express-session");
const allRoute = require("./Routes/AllRoute");
const { Server } = require("socket.io");
const moment = require("moment");
const singlechatModel = require("./Schemas/singleChatSchema");
const messageModel = require("./Schemas/messageSchema");

const io = new Server(server, {
  cors: {
    origin: `*`,
  },
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SessionSecurity,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(allRoute.messageRoute);
app.use(allRoute.sigininRoute);
app.use(allRoute.SingleChatRoute);
app.use(allRoute.userRoute);
app.use(allRoute.groupRoute);
app.get("/", async (req, res) => {
  res.send("Hello I am Going to create a chat Application using Socket");
});

io.on("connection", (socket) => {
  // socket?.on("newUser", (newUserData) => {
  //   console.log("User name is ", newUserData);
  //   socket.broadcast.emit("newuserjoined", newUserData);
  // });

  socket.on("join", (sessionId) => {
    socket.join(sessionId);
    console.log(
      "Size of user conected to ",
      io.sockets.adapter.rooms.get(sessionId).size
    );
    io.to(sessionId).emit("join", sessionId);
  });

  socket.on("message", (broadcastData) => {
    io.to(broadcastData.messageinfo[0].session_id).emit(
      "receivedMessage",
      broadcastData
    );

    async function saveData() {
      try {
        const lastDate = await singlechatModel.find({
          _date: broadcastData?._date,
        });

        if (lastDate.length > 0) {
          await singlechatModel.updateOne(
            { _date: broadcastData?._date },
            { $push: { messageinfo: broadcastData.messageinfo } }
          );
        } else {
          await singlechatModel.create(broadcastData);
        }
      } catch (err) {
        console.log("Error is ", err);
      }
    }
    saveData();
  });

  socket.on("groupmessage", (groupdata) => {
    io.to(groupdata.messageinfo[0].group_id).emit(
      "receivedGroupMessage",
      groupdata
    );

    async function saveGroupMessageData() {
      try {
        const lastDate = await messageModel.find({ _date: groupdata?._date });

        if (lastDate.length > 0) {
          await messageModel.updateOne(
            { _date: groupdata?._date },
            { $push: { messageinfo: groupdata.messageinfo } }
          );
        } else {
          await messageModel.create(groupdata);
        }
      } catch (err) {
        console.log("Error is ", err);
      }
    }

    saveGroupMessageData();
  });

  socket.on("disconnect", () => {
    console.log("Some one is Disconnected");
    return () => socket.removeAllListeners();
  });
});

server.listen(8001, () => {
  console.log("Server is Started at port 8001");
});
